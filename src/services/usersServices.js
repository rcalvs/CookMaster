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

module.exports = {
  create,
  // getAll,
  // findByName,
  // getById,
  // editById,
  // deleteById,
};