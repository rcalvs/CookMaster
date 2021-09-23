const usersModel = require('../models/usersModel');

const validate = async (name, email, password) => {
  if (!name) {
    return {
      err: { message: 'Invalid entries. Try again.' } };
  }
  
  // console.log('Validado Quantidade');
  if (!email) {
    return {
      err: { message: 'Invalid entries. Try again.' } };
  }

  if (!password) {
    return {
      err: { message: 'Invalid entries. Try again.' } };
  }
};

const create = async (name, email, password, role) => {
  const result = await validate(name, email, password);
  if (result) {
    return result;
  }

  // console.log(result);

  // const exists = await usersModel.findByName(email);
  // if (exists) {
  //   return {
  //     err: {
  //       code: 'invalid_data',
  //       message: 'Product already exists',
  //     } };
  // }

  const user = await usersModel.create(name, email, password, role);
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