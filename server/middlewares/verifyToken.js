const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) return res.status(401).send({ success: false, message: 'Not Authorized' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).send({ success: false, message: 'Not Authorized' });
    }
    // console.log('values in the token => ', decoded);
    req.user = decoded;
    req.token = token;
    next();
  });
};

module.exports = { verifyToken };
