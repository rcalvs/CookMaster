const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');

const userController = require('../controllers/usersController');
const recipesController = require('../controllers/recipesController');
const authenticator = require('../services/authenticator');

const app = express();
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, '..', '/uploads')));

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

const storage = multer.diskStorage({
  destination: (req, file, callback) => { callback(null, 'src/uploads'); },
  filename: (req, file, callback) => { callback(null, `${req.params.id}.jpeg`); },
});

const upload = multer({ storage });

app.post('/users', userController.create);
app.post('/login', userController.login);
app.post('/recipes', authenticator, recipesController.create);
app.get('/recipes', recipesController.getAll);
app.get('/recipes/:id', recipesController.getById);
app.put('/recipes/:id', authenticator, recipesController.editById);
app.delete('/recipes/:id', authenticator, recipesController.deleteById);
app.put('/recipes/:id/image/', authenticator, upload.single('image'), recipesController.addImage);
app.get('/images/:id', recipesController.showImage);
app.post('/users/admin', authenticator, userController.createAdmin);

module.exports = app;
