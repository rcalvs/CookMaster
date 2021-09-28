const recipesService = require('../services/recipesServices');

const create = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.payload;
  const userId = _id;
  const { err, recipe } = await recipesService
    .create(name, ingredients, preparation, userId);
  if (err) return res.status(err.status).json({ message: err.message });
  return res.status(201).json({ recipe });
};

const getAll = async (req, res) => {
  const recipes = await recipesService.getAll();
  return res.status(200).json(recipes);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const recipe = await recipesService.getById(id);
  if (!recipe) {
    return res.status(404).json({ message: 'recipe not found' });
  }
  return res.status(200).json(recipe);
};

const editById = async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const editedRecipe = await recipesService.editById(id, name, ingredients, preparation);
  return res.status(200).json(editedRecipe);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  await recipesService.deleteById(id);
  return res.status(204).json({});
};

const addImage = async (req, res) => {
  const { id } = req.params;
  const { path } = req.file;
  const recipe = await recipesService.getById(id);
  res.status(200).json({ ...recipe, image: `localhost:3000/${path}` });
};

const showImage = async (req, res) => {
  res.status(200).render('file', { path: req.file.path });
};

module.exports = {
  create,
  getAll,
  getById,
  editById,
  deleteById,
  addImage,
  showImage,
}; 