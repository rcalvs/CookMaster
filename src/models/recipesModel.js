// const { ObjectId } = require('bson');
const getConnection = require('./connection');

const create = async (name, ingredients, preparation, userId) => {
  const db = await getConnection();
  const result = await db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });
  return { _id: result.insertedId, name, ingredients, preparation, userId };
};

module.exports = {
  create,
  // getAll,
  // findByName,
  // getById,
  // editById,
  // deleteById,
};