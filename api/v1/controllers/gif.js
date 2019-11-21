import moment from 'moment';
import gf from '../models/gif';
import comnt from '../models/comment';
import cld from '../config/cloudinaryConfig';

const {
  findOneGif, findAllGifs, saveGif, deleteGif,
} = gf;
const { findGifComments } = comnt;

const createGifController = (req, res, next) => {
  const {
    title,
  } = req.body;

  if (title === '' || !title) {
    res.status(400).json({
      status: 'error',
      Error: 'The title is required',
    });
  } else if (!req.file || req.file.url === '') {
    res.status(400).json({
      status: 'error',
      Error: 'A GIF image is required',
    });
  } else {
    const URL = req.file.url;
    const gifPublicId = req.file.public_id;
    const createdOn = moment().format('YYYY-MM-DD HH:mm:ss');
    const authorId = req.user.sub;
    findAllGifs()
      .then((rows) => {
        let gifId;
        if (rows.length === 0) {
          gifId = 1;
        } else {
          gifId = rows[rows.length - 1].id + 1;
        }
        const values = [gifId, title, URL, gifPublicId, createdOn, authorId];

        saveGif(values)
          .then(() => {
            const gifCreatedOn = createdOn;
            const gifTitle = title;
            const gifAuthorId = authorId;
            res.status(201).json({
              status: 'success',
              data: {
                message: 'Gif image successfully posted',
                id: gifId,
                createdOn: gifCreatedOn,
                title: gifTitle,
                imageURL: URL,
                PublicId: gifPublicId,
                authorId: gifAuthorId,
              },
            });
          })
          .catch(() => {
            res.status(500).json({
              status: 'error',
              error: 'Failed to save GIF image',
            });
          });
      })
      .catch(() => {
        res.status(500).json({
          status: 'error',
          error: 'Did not get GIF image rows',
        });
      });
  }
};

export {
  createGifController, getGifsController, getGifController, deleteGifController,
};