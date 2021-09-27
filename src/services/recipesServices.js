const recipesModel = require('../models/recipesModel');

const create = async (name, ingredients, preparation, userId) => {
  if (!name || !ingredients || !preparation) {
    return {
      err: { status: 400, message: 'Invalid entries. Try again.' } };
    }

  const recipe = await recipesModel.create(name, ingredients, preparation, userId);
  return recipe;
};

const getAll = async () => {
  const recipes = await recipesModel.getAll();
  return recipes;
};

const getById = async (id) => {
  const recipe = await recipesModel.getById(id);
  return recipe;
};

const editById = async (id, name, ingredients, preparation) => {
  const editedRecipe = await recipesModel.editById(id, name, ingredients, preparation);
  return editedRecipe;
};

const deleteById = async (id) => {
  const recipe = await recipesModel.deleteById(id);
  return recipe;
};

module.exports = { 
  create,
  getAll,
  getById,
  editById,
  deleteById,
}; 