import uuidv1 from 'uuid/v1';
import user from '../models/user';
import helper from './helper';

const { findOne, save } = user;
const {
  hashPassword, comparePassword, isValidEmail, generateToken,
} = helper;

const signUp = (req, res, next) => {
  const {
    firstName, lastName, email, password, gender, jobRole, department, address,
  } = req.body;

  const checkEmail = isValidEmail(email.trim());
  const checkFields = (firstName && lastName && email && password
      && gender && jobRole && department && address
  );

  if (!checkFields) {
    res.status(400).json({
      status: 'error',
      Error: 'All fields are required',
    });
  } else if (!checkEmail) {
    res.status(400).json({
      status: 'error',
      Error: 'Please provide a valid email',
    });
  } else {
    const ID = uuidv1();
    const storedEmail = email.trim().toLowerCase();
    const hashedPassword = hashPassword(password.trim());
    const values = [
      ID, firstName.trim(), lastName.trim(), storedEmail, hashedPassword,
      gender.trim(), jobRole.trim().toUpperCase(), department.trim(), address.trim(),
    ];

    save(values)
      .then(() => {
        res.status(201).json({
          status: 'success',
          data: {
            message: 'User account successfully created',
            UserID: ID,
          },
        });
      })
      .catch((err) => {
        res.status(500).json({
          status: 'error',
          error: 'Failed to save user',
        });
      });
  }
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === '' || password === '') {
    res.status(400).json({
      status: 'error',
      error: 'Email and password fields are required',
    });
  } else {
    const cleanedEmail = email.trim();
    findOne([cleanedEmail])
      .then((row) => {
        const {
          id, hashedpassword, jobrole,
        } = row;
        const verifyPwd = comparePassword(password.trim(), hashedpassword);
        if (!verifyPwd) {
          res.status(400).json({
            status: 'error',
            error: 'Incorrect password',
          });
        } else {
          const uJobrole = jobrole.toUpperCase();
          const userObj = {
            sub: id,
            role: uJobrole,
          };
          const tokenValue = generateToken(userObj);
          res.status(200).json({
            status: 'success',
            data: {
              token: tokenValue,
              UserId: id,
            },
          });
        }
      })
      .catch(() => {
        res.status(400).json({
          status: 'error',
          error: 'Failed to get user',
        });
      });
  }
};

export { signUp, login };
