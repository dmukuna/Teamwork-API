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



export { signUp };
