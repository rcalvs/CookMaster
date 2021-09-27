// const { ObjectId } = require('bson');
const getConnection = require('./connection');

const create = async (name, email, password) => {
  const role = 'user';
  const db = await getConnection();
  const result = await db.collection('users').insertOne({ name, email, password, role });
  return { user: { name, email, role, _id: result.insertedId } };
};

const findByEmail = async (email) => {
  const db = await getConnection();
  const result = await db.collection('users').findOne({ email });
  return result;
};

const createAdmin = async (name, email, password) => {
  const role = 'admin';
  const db = await getConnection();
  const result = await db.collection('users').insertOne({ name, email, password, role });
  return { user: { name, email, role, _id: result.insertedId } };
};

module.exports = {
  create,
  createAdmin,
  // getAll,
  findByEmail,
  // getById,
  // editById,
  // deleteById,
};