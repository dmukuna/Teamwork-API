import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import moment from 'moment';

dotenv.config();

const Helper = {
  /**
   * Hash Password Method
   * @param {string} password
   * @returns {string} returns hashed password
   */
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  },
  /**
   * comparePassword
   * @param {string} hashPassword
   * @param {string} password
   * @returns {Boolean} return True or False
   */
  comparePassword(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword);
  },
  /**
   * isValidEmail helper method
   * @param {string} email
   * @returns {Boolean} True or False
   */
  isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  },
  /**
   * Gnerate Token
   * @param {string} id
   * @returns {string} token
   */
  generateToken(userObj) {
    const token = jwt.sign(userObj, process.env.SECRET, { expiresIn: '7d' });
    return token;
  },

  compareDates(key, order = 'asc') {
    return (a, b) => {
      const hasKeyProperty = Object.prototype.hasOwnProperty;
      if (!hasKeyProperty.call(a, key) || !hasKeyProperty.call(b, key)) {
        return 0;
      }

      let comparison = 0;

      const varB = moment(b[key]).format('YYYY-MM-DD HH:mm:ss');

      if (moment(a[key]).isAfter(varB)) {
        comparison = 1;
      } else if (moment(a[key]).isBefore(varB)) {
        comparison = -1;
      }

      return (
        (order === 'desc')
          ? (comparison * -1) : comparison
      );
    };
  },
};

export default Helper;
