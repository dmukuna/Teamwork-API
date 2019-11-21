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

const getGifsController = (req, res, next) => {
  findAllGifs()
    .then((rows) => {
      if (rows.length === 0) {
        res.status(400).json({
          status: 'error',
          Error: 'There is no GIF post yet',
        });
      }
      const gifArr = [];
      rows.forEach((g) => {
        const {
          id, title, gifurl, gifpublicid, createdon, authorid,
        } = g;
        const gifCreatedOn = createdon;
        const gifTitle = title;
        const gifAuthorId = authorid;
        const values = {
          gifId: id,
          createdOn: gifCreatedOn,
          title: gifTitle,
          imageURL: gifurl,
          PublicId: gifpublicid,
          authorId: gifAuthorId,
        };
        gifArr.push(values);
      });
      res.status(200).json({
        status: 'success',
        data: gifArr,
      });
    })
    .catch(() => {
      res.status(500).json({
        status: 'error',
        error: 'Did not get GIF image rows',
      });
    });
};

const getGifController = (req, res, next) => {
  if (!req.params.gifId || req.params.gifId === '' || typeof (parseInt(req.params.gifId, 10)) !== 'number') {
    res.status(400).json({
      status: 'error',
      Error: 'Invalid request',
    });
  } else {
    const paramId = parseInt(req.params.gifId, 10);

    findOneGif([paramId])
      .then((row) => {
        const {
          id, title, gifurl, gifpublicid, createdon, authorid,
        } = row;
        const gifId = id;
        const gifCreatedOn = createdon;
        const gifTitle = title;
        const gifAuthorId = authorid;

        findGifComments([paramId])
          .then((rows) => {
            const commentArr = [];

            rows.forEach((commentRow) => {
              const { comment } = commentRow;
              const gifComment = comment;
              const gifCommentAuthorId = commentRow.authorid;
              const values = {
                commentId: commentRow.id,
                comment: gifComment,
                CommentAuthorId: gifCommentAuthorId,
              };
              commentArr.push(values);
            });
            res.status(200).json({
              status: 'success',
              data: {
                Id: gifId,
                createdOn: gifCreatedOn,
                title: gifTitle,
                imageURL: gifurl,
                PublicId: gifpublicid,
                authorId: gifAuthorId,
                comments: commentArr,
              },
            });
          })
          .catch(() => {
            res.status(500).json({
              status: 'error',
              error: 'Did not get GIF comment rows',
            });
          });
      })
      .catch(() => {
        res.status(500).json({
          status: 'error',
          Error: 'Did not get gif row',
        });
      });
  }
};

export {
  createGifController, getGifsController, getGifController, deleteGifController,
};