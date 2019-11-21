import queries from './index';

const { query } = queries;

const Gif = {
  findOneGif(value) {
    const queryText = 'SELECT * FROM gifs WHERE ID=$1';
    const row = query(queryText, value)
      .then((res) => res.rows[0])
      .catch((err) => {
        throw err;
      });
    return row;
  },

  findAllGifs() {
    const queryText = 'SELECT * FROM gifs';
    const rows = query(queryText, [])
      .then((res) => res.rows)
      .catch((err) => {
        throw err;
      });
    return rows;
  },

  saveGif(values) {
    const queryText = `INSERT INTO
      gifs (ID, title, gifURL, gifPublicId, createdOn, authorID)
      VALUES ($1, $2, $3, $4, $5, $6)`;
    return query(queryText, values);
  },

  deleteGif(value) {
    const queryText = 'DELETE FROM gifs WHERE ID=$1 RETURNING *';
    const row = query(queryText, value)
      .then((res) => res.rows[0])
      .catch((err) => {
        throw err;
      });
    return row;
  },
};


export default Gif;
