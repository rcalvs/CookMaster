// const { ObjectId } = require('bson');
const getConnection = require('./connection');

const create = async (name, ingredients, preparation, userId) => {
  const db = await getConnection();
  const result = await db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });
    return { recipe: { name, ingredients, preparation, userId, _id: result.insertedId } };
  };

  const getAll = async () => {
    const db = await getConnection();
    const recipes = await db.collection('recipes').find({}).toArray();
    return recipes;
  };

module.exports = {
  create,
  getAll,
  // findByName,
  // getById,
  // editById,
  // deleteById,
};