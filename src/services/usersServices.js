const jwt = require('jsonwebtoken');
require('dotenv').config();

const usersModel = require('../models/usersModel');

const validate = async (name, email, password) => {
  if (!name || !email || !password) {
    return {
      err: { status: 400, message: 'Invalid entries. Try again.' } };
    }
    
  const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  if (emailPattern.test(email) === false) {
    return {
      err: { status: 400, message: 'Invalid entries. Try again.' } };
  }
};
    
const secret = process.env.SECRET || 'secret';
const createToken = (user) => {
  const { password: _, ...payload } = user;
  const jwtConfig = {
    algorithm: 'HS256',
    expiresIn: '15d',
  };
  const token = jwt.sign(payload, secret, jwtConfig);
  return { token };
};

const create = async (name, email, password) => {
  const result = await validate(name, email, password);
  if (result) {
    return result;
  }

  const exists = await usersModel.findByEmail(email);
  if (exists) {
    return {
      err: { status: 409, message: 'Email already registered' } };
  }

  const user = await usersModel.create(name, email, password);
  return { user };
};

const login = async (email, password) => {
  if (!email || !password) {
    return {
      err: { status: 401, message: 'All fields must be filled' } };
  }

  const findByEmail = await usersModel.findByEmail(email);
  if (!findByEmail || password !== findByEmail.password) {
    return {
      err: { status: 401, message: 'Incorrect username or password' } };
  }

  const token = createToken(findByEmail);
  return token;
};

module.exports = {
  create,
  login,
  // getAll,
  // findByName,
  // getById,
  // editById,
  // deleteById,
};