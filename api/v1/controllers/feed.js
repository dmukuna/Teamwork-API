import gif from '../models/gif';
import artcl from '../models/article';
import hpr from './helper';

const { findAllGifs } = gif;
const { findAllArticles } = artcl;
const { compareDates } = hpr;

const getPosts = (req, res, next) => {
  const gifArr = [];
  const articleArr = [];
  findAllGifs()
    .then((gifRows) => {
      gifRows.forEach((row) => {
        const {
          id, title, gifurl, createdon, authorid,
        } = row;
        const gifId = id;
        const gifTitle = title;
        const gifCreatedOn = createdon;
        const gifAuthorId = authorid;

        const values = {
          Id: gifId,
          createdon: gifCreatedOn,
          title: gifTitle,
          URL: gifurl,
          authorId: gifAuthorId,
        };
        gifArr.push(values);
      });

      findAllArticles()
        .then((articleRows) => {
          articleRows.forEach((row) => {
            const {
              id, title, article, createdon, authorid,
            } = row;
            const articleId = id;
            const articleTitle = title;
            const articleCreatedOn = createdon;
            const articleAuthorId = authorid;
            const articleText = article;

            const values = {
              id: articleId,
              createdon: articleCreatedOn,
              title: articleTitle,
              article: articleText,
              authorId: articleAuthorId,
            };
            articleArr.push(values);
          });

          if (gifArr.length === 0 && articleArr.length === 0) {
            res.status(400).json({
              status: 'error',
              Error: 'There is no post yet',
            });
          } else {
            const feedArr = [...gifArr, ...articleArr];
            const sortedArr = feedArr.sort(compareDates('createdon', 'desc'));
            const posts = [...sortedArr];

            res.status(200).json({
              status: 'success',
              data: posts,
            });
          }
        })
        .catch(() => {
          res.status(500).json({
            status: 'error',
            Error: 'Failed to get Articles',
          });
        });
    })
    .catch(() => {
      res.status(500).json({
        status: 'error',
        Error: 'Failed to get GIF images',
      });
    });
};

export default getPosts;
