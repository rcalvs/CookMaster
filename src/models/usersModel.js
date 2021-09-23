// const { ObjectId } = require('bson');
const getConnection = require('./connection');

const create = async (name, email, password, role) => {
  const db = await getConnection();
  const result = await db.collection('users').insertOne({ name, email, password, role });
  return { _id: result.insertedId, name, email, password, role };
};

module.exports = {
  create,
  // getAll,
  // findByName,
  // getById,
  // editById,
  // deleteById,
};