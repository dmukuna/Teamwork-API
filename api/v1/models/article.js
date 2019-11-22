import db from './index';

const { query } = db;

const Article = {
  findOneArticle(value) {
    const queryText = 'SELECT * FROM articles WHERE ID=$1';
    const row = query(queryText, value)
      .then((res) => res.rows[0])
      .catch((err) => {
        throw err;
      });
    return row;
  },

  findAllArticles() {
    const queryText = 'SELECT * FROM articles';
    const rows = query(queryText, [])
      .then((res) => res.rows)
      .catch((err) => {
        throw err;
      });
    return rows;
  },

  updateArticle(values) {
    const queryText = 'UPDATE articles SET title=$1, article=$2 WHERE ID=$3 RETURNING *';
    const row = query(queryText, values)
      .then((res) => res.rows[0])
      .catch((err) => {
        throw err;
      });
    return row;
  },

  saveArticle(values) {
    const queryText = `INSERT INTO
      articles (ID, title, article, createdOn, authorId)
      VALUES ($1, $2, $3, $4, $5)`;
    const row = query(queryText, values)
      .then((res) => res.rows[0])
      .catch((err) => {
        throw err;
      });
    return row;
  },

  deleteArticle(value) {
    const queryText = 'DELETE FROM articles WHERE ID=$1 RETURNING *';
    const row = query(queryText, value)
      .then((res) => res.rows[0])
      .catch((err) => {
        throw err;
      });
    return row;
  },

  deleteAllArticles() {
    const queryText = 'DELETE FROM articles';
    const rows = query(queryText, [])
      .then((res) => res.rows)
      .catch((err) => {
        throw err;
      });
    return rows;
  },
};

export default Article;
