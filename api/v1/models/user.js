import queries from './index';

const { query } = queries;

const User = {
  findOne(value) {
    const queryText = 'SELECT * FROM users WHERE storeduserEmail = $1';
    const row = query(queryText, value)
      .then((res) => res.rows[0])
      .catch((err) => {
        throw err;
      });
    return row;
  },

  findAll() {
    const queryText = 'SELECT * FROM users';
    const rows = query(queryText, values)
      .then((res) => res.rows)
      .catch((err) => {
        throw err;
      });
    return rows;
  },

  save(values) {
    const queryText = `INSERT INTO
      users (id, firstName, lastName, storeduserEmail, hashedPassword, gender, jobRole, department, address)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
      const row = query(queryText, values)
        .then((res) => res.rows[0])
        .catch((err) => {
          throw err;
        });
      return row;
  },

  delete(value) {
    const queryText = 'DELETE FROM users WHERE ID=$1 RETURNING *';
    const row = query(queryText, value)
      .then((res) => res.rows[0])
      .catch((err) => {
        throw err;
      });
    return row;
  },

  deleteAllUsers() {
    const queryText = 'DELETE FROM users RETURNING *';
    const rows = query(queryText, [])
      .then((res) => res.rows)
      .catch((err) => {
        throw err;
      });
    return rows;
  }
};

export default User;
