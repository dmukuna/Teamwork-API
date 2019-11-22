import db from './index';

const { query } = db;

const Comment = {
  findOneComment(value) {
    const queryText = 'SELECT * FROM comments WHERE ID=$1';
    const row = query(queryText, value)
      .then((res) => res.rows[0])
      .catch((err) => {
        throw err;
      });
    return row;
  },

  findAllComments() {
    const queryText = 'SELECT * FROM comments';
    const rows = query(queryText, [])
      .then((res) => res.rows)
      .catch((err) => {
        throw err;
      });
    return rows;
  },

  findArticleComments(value) {
    const queryText = 'SELECT * FROM comments WHERE articleId=$1';
    const rows = query(queryText, value)
      .then((res) => res.rows)
      .catch((err) => {
        throw err;
      });
    return rows;
  },

  findGifComments(value) {
    const queryText = 'SELECT * FROM comments WHERE gifid=$1';
    const rows = query(queryText, value)
      .then((res) => res.rows)
      .catch((err) => {
        throw err;
      });
    return rows;
  },

  saveGifComment(values) {
    const queryText = `INSERT INTO
      comments (id, comment, createdon, authorid, gifid)
      VALUES ($1, $2, $3, $4, $5)`;
    const row = query(queryText, values)
      .then((res) => res)
      .catch((err) => {
        throw err;
      });
    return row;
  },

  saveArticleComment(values) {
    const queryText = `INSERT INTO
      comments (id, comment, createdon, authorid, articleid)
      VALUES ($1, $2, $3, $4, $5)`;
    const row = query(queryText, values)
      .then((res) => res.rows[0])
      .catch((err) => {
        throw err;
      });
    return row;
  },

  deleteComment(value) {
    const queryText = 'DELETE FROM comments WHERE ID=$1 RETURNING *';
    const row = query(queryText, value)
      .then((res) => res.rows[0])
      .catch((err) => {
        throw err;
      });
    return row;
  },

  deleteAllComments() {
    const queryText = 'DELETE FROM comments RETURNING *';
    const rows = query(queryText, [])
      .then((res) => res.rows)
      .catch((err) => {
        throw err;
      });
    return rows;
  },
};

export default Comment;
