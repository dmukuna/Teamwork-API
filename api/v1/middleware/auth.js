import expressJwt from 'express-jwt';

const authorize = (roles) => [
  expressJwt({ secret: process.env.SECRET }),

  (req, res, next) => {
    const case1 = roles.length && roles.includes(req.user.role);
    const case2 = !roles.length && !roles.includes(req.user.role);
    if (case1 || case2) {
      return next();
    }
    // user's role is not authorized
    return res.status(401).json({
      status: 'Error',
      message: 'Unauthorized',
    });
  },
];

export default authorize;
