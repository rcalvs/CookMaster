const recipesModel = require('../models/recipesModel');

const create = async (name, ingredients, preparation, userId) => {
  if (!name || !ingredients || !preparation) {
    return {
      err: { status: 400, message: 'Invalid entries. Try again.' } };
    }

  const recipe = await recipesModel.create(name, ingredients, preparation, userId);
  return recipe;
};

module.exports = { 
  create,
 }; 