const express = require('express');
const bodyParser = require('body-parser');

const userController = require('../controllers/usersController');
const recipesController = require('../controllers/recipesController');
const authenticator = require('../services/authenticator');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', userController.create);
app.post('/login', userController.login);
app.post('/recipes', authenticator, recipesController.create);
app.get('/recipes', recipesController.getAll);
app.get('/recipes/:id', recipesController.getById);
app.put('/recipes/:id', authenticator, recipesController.editById);
app.delete('/recipes/:id', authenticator, recipesController.deleteById);

module.exports = app;
