import pool from '../../../config/dbConfig';

pool.connect();

export default {
  /**
   * DB Query
   * @param {string} text
   * @param {object} params
   * @returns {object} object
   */
  query(text, params) {
    return new Promise((resolve, reject) => {
      pool.query(text, params)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
