const usersServices = require('../services/usersServices');

const HTTP_200 = 200;
const HTTP_201 = 201;
// const HTTP_400 = 400;
// const HTTP_422 = 422;

const create = async (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  const { err, user } = await usersServices.create(name, email, password);
  if (err) return res.status(err.status).json({ message: err.message });
  return res.status(HTTP_201).json(user);
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const { err, token } = await usersServices.login(email, password);
  if (err) return res.status(err.status).json({ message: err.message });
  return res.status(HTTP_200).json({ token });
};

module.exports = {
  create,
  login,
  // getAll,
  // getById,
  // editById,
  // deleteById,
};