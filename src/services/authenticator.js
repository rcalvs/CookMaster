const jwt = require('jsonwebtoken');

require('dotenv').config();

const secret = 'secret';

const verifyToken = (token) => {
  const payload = jwt.verify(token, secret);
  return payload;
}; 

const authenticator = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
 return res.status(401)
  .json({ message: 'missing auth token' }); 
}
  try {
    const payload = verifyToken(authorization);
    req.payload = payload;
    return next();
  } catch (error) {
    res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = { authenticator }; 