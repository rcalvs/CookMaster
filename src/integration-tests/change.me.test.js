const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const { expect } = chai;
const { MongoClient } = require('mongodb');
const { getConnection } = require('./connectionMock');
const server = require('../api/app');

const {user, recipe, anotherRecipe, admin, newAdmin} = require('./mockData')

describe('POST /users', () => {
  describe('an user is created successfully', () => {
    let connectionMock;

    before(async () => {
      const {name, email, password} = user;
      connectionMock = await getConnection();
		  sinon.stub(MongoClient, 'connect').resolves(connectionMock);
      db = connectionMock.db('Cookmaster');
      await db.collection('users').deleteMany({});
      response = await chai.request(server)
        .post('/users')
        .send({name, email, password});
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('returns status code 201', () => {
      expect(response).to.have.status(201);
    });

    it('response object has "user" property', () => {
      expect(response.body).to.have.property('user');
    });

    it('object on body is not empty', () => {
      expect(response.body).to.be.not.empty;
    });
  })
})

describe('POST /users', () => {
  describe('when an user already exists', () => {
    let connectionMock;

    before(async () => {
      const {name, email, password} = user;
      connectionMock = await getConnection();
		  sinon.stub(MongoClient, 'connect').resolves(connectionMock);
      db = connectionMock.db('Cookmaster');
      response = await chai.request(server)
        .post('/users')
        .send({name, email, password});
      response = await chai.request(server)
        .post('/users')
        .send({name, email, password});
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('returns status code 409', () => {
      expect(response).to.have.status(409);
    });

    it('response object has "message" property', () => {
      expect(response.body).to.have.property('message');
    });

    it('"message" property is "Email already registered"', () => {
      expect(response.body.message).to.be.equals('Email already registered');
    });
  })
})

describe('POST /users', () => {
  describe('when name is not provided', () => {
    let connectionMock;

    before(async () => {
      const {email, password} = user;
      connectionMock = await getConnection();
		  sinon.stub(MongoClient, 'connect').resolves(connectionMock);
      db = connectionMock.db('Cookmaster');
      await db.collection('users').deleteMany({});
      response = await chai.request(server)
        .post('/users')
        .send({email, password});
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('returns status code 400', () => {
      expect(response).to.have.status(400);
    });

    it('returns an object on body', () => {
      expect(response.body).to.be.an('object');
    });

    it('response object has "message" property', () => {
      expect(response.body).to.have.property('message');
    });

    it('"message" property is "Invalid entries. Try again."', () => {
      expect(response.body.message).to.be.equals('Invalid entries. Try again.');
    });
  })
})

describe('POST /login', () => {
  describe('when an user login successfully', () => {
    let connectionMock;

    before(async () => {
      const {name, email, password, role} = user;
      connectionMock = await getConnection();
		  sinon.stub(MongoClient, 'connect').resolves(connectionMock);
      db = connectionMock.db('Cookmaster');
      await db.collection('users').insertOne({name, email, password, role });
      response = await chai.request(server)
        .post('/login')
        .send({email, password});
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('returns status code 200', () => {
      expect(response).to.have.status(200);
    });

    it('returns an object on body', () => {
      expect(response.body).to.be.an('object');
    });

    it('response object has "token" property', () => {
      expect(response.body).to.have.property('token');
    });

    it('object on body is not empty', () => {
      expect(response.body).to.be.not.empty;
    });
  })
})

describe('POST /login', () => {
  describe('when an user try to login without email', () => {
    let connectionMock;

    before(async () => {
      const {name, email, password, role} = user;
      connectionMock = await getConnection();
		  sinon.stub(MongoClient, 'connect').resolves(connectionMock);
      db = connectionMock.db('Cookmaster');
      await db.collection('users').insertOne({name, email, password, role });
      response = await chai.request(server)
        .post('/login')
        .send({password});
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('returns status code 401', () => {
      expect(response).to.have.status(401);
    });

    it('returns an object on body', () => {
      expect(response.body).to.be.an('object');
    });

    it('response object has "message" property', () => {
      expect(response.body).to.have.property('message');
    });

    it('"message" property is "All fields must be filled"', () => {
      expect(response.body.message).to.be.equals('All fields must be filled');
    });
  })
})

describe('POST /login', () => {
  describe('when an user try to login with wrong password', () => {
    let connectionMock;

    before(async () => {
      const {name, email, password, role} = user;
      connectionMock = await getConnection();
		  sinon.stub(MongoClient, 'connect').resolves(connectionMock);
      db = connectionMock.db('Cookmaster');
      await db.collection('users').insertOne({name, email, password, role });
      response = await chai.request(server)
        .post('/login')
        .send({email, password: '1234'});
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('returns status code 401', () => {
      expect(response).to.have.status(401);
    });

    it('returns an object on body', () => {
      expect(response.body).to.be.an('object');
    });

    it('response object has "message" property', () => {
      expect(response.body).to.have.property('message');
    });

    it('"message" property is "Incorrect username or password"', () => {
      expect(response.body.message).to.be.equals('Incorrect username or password');
    });
  })
})

describe('POST /recipes', () => {
  describe('when an user post an recipe successfully', () => {
    let connectionMock;

    before(async () => {
      const {name, email, password, role} = user;
      connectionMock = await getConnection();
		  sinon.stub(MongoClient, 'connect').resolves(connectionMock);
      db = connectionMock.db('Cookmaster');
      await db.collection('users').deleteMany({});
      await db.collection('users').insertOne({name, email, password, role });
      const token = await chai.request(server)
        .post('/login')
        .send({email, password})
        .then((res) => res.body.token);
      ;

      response = await chai.request(server)
        .post('/recipes')
        .set('authorization', token)
        .send(recipe);
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('returns status code 201', () => {
      expect(response).to.have.status(201);
    });

    it('returns an object on body', () => {
      expect(response.body).to.be.an('object');
    });

    it('response object has "recipe" property', () => {
      expect(response.body).to.have.property('recipe');
    });

    it('object on body is not empty', () => {
      expect(response.body).to.be.not.empty;
    });
  })
})

describe('POST /recipes', () => {
  describe('when an user send an invalid token', () => {
    let connectionMock;

    before(async () => {
      const {name, email, password, role} = user;
      connectionMock = await getConnection();
		  sinon.stub(MongoClient, 'connect').resolves(connectionMock);
      db = connectionMock.db('Cookmaster');
      await db.collection('users').deleteMany({});
      await db.collection('users').insertOne({name, email, password, role });
      await chai.request(server)
        .post('/login')
        .send({email, password});

      response = await chai.request(server)
        .post('/recipes')
        .set('authorization', 'abc')
        .send(recipe);
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('returns status code 401', () => {
      expect(response).to.have.status(401);
    });

    it('returns an object on body', () => {
      expect(response.body).to.be.an('object');
    });

    it('response object has "message" property', () => {
      expect(response.body).to.have.property('message');
    });

    it('"message" property is "jwt malformed"', () => {
      expect(response.body.message).to.be.equals('jwt malformed');
    });
  })
})

describe('POST /recipes', () => {
  describe('when an user does not send a token', () => {
    let connectionMock;

    before(async () => {
      const {name, email, password, role} = user;
      connectionMock = await getConnection();
		  sinon.stub(MongoClient, 'connect').resolves(connectionMock);
      db = connectionMock.db('Cookmaster');
      await db.collection('users').deleteMany({});
      await db.collection('users').insertOne({name, email, password, role });
      await chai.request(server)
        .post('/login')
        .send({email, password});

      response = await chai.request(server)
        .post('/recipes')
        .set('authorization', '')
        .send(recipe);
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('returns status code 401', () => {
      expect(response).to.have.status(401);
    });

    it('returns an object on body', () => {
      expect(response.body).to.be.an('object');
    });

    it('response object has "message" property', () => {
      expect(response.body).to.have.property('message');
    });

    it('"message" property is "missing auth token"', () => {
      expect(response.body.message).to.be.equals('missing auth token');
    });
  })
})

describe('POST /recipes', () => {
  describe('when an user does not send all recipe data', () => {
    let connectionMock;

    before(async () => {
      const {name, email, password, role} = user;
      connectionMock = await getConnection();
		  sinon.stub(MongoClient, 'connect').resolves(connectionMock);
      db = connectionMock.db('Cookmaster');
      await db.collection('users').deleteMany({});
      await db.collection('users').insertOne({name, email, password, role });
      const token = await chai.request(server)
        .post('/login')
        .send({email, password})
        .then((res) => res.body.token);
      ;

      response = await chai.request(server)
        .post('/recipes')
        .set('authorization', token)
        .send(recipe.name, recipe.preparation);
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('returns status code 400', () => {
      expect(response).to.have.status(400);
    });

    it('returns an object on body', () => {
      expect(response.body).to.be.an('object');
    });

    it('response object has "message" property', () => {
      expect(response.body).to.have.property('message');
    });

    it('"message" property is "Invalid entries. Try again."', () => {
      expect(response.body.message).to.be.equals('Invalid entries. Try again.');
    });
  })
})

describe('GET /recipes', () => {
  describe('list all recipes successfully', () => {
    let connectionMock;

    before(async () => {
      const {name, email, password, role} = user;
      connectionMock = await getConnection();
		  sinon.stub(MongoClient, 'connect').resolves(connectionMock);
      db = connectionMock.db('Cookmaster');

      await db.collection('users').deleteMany({});
      await db.collection('users').insertOne({name, email, password, role });
      const token = await chai.request(server)
        .post('/login')
        .send({email, password})
        .then((res) => res.body.token);
      ;

      await chai.request(server)
        .post('/recipes')
        .set('authorization', token)
        .send(recipe);

      await chai.request(server)
        .post('/recipes')
        .set('authorization', token)
        .send(anotherRecipe);

      response = await chai.request(server)
        .get('/recipes')
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('returns status code 200', () => {
      expect(response).to.have.status(200);
    });

    it('returns an object on body', () => {
      expect(response.body).to.be.an('array');
    });

    it('object on body is not empty', () => {
      expect(response.body).to.be.not.empty;
    });
  })
})

describe('GET /recipes/:id', () => {
  describe('list one recipe successfully', () => {
    let connectionMock;

    before(async () => {
      const {name, email, password, role} = user;
      connectionMock = await getConnection();
		  sinon.stub(MongoClient, 'connect').resolves(connectionMock);
      db = connectionMock.db('Cookmaster');

      await db.collection('users').deleteMany({});
      await db.collection('users').insertOne({name, email, password, role });
      const token = await chai.request(server)
        .post('/login')
        .send({email, password})
        .then((res) => res.body.token);

      const id = await chai.request(server)
        .post('/recipes')
        .set('authorization', token)
        .send(recipe)
        .then((res) => res.body.recipe._id);

      response = await chai.request(server)
        .get(`/recipes/${id}`)
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('returns status code 200', () => {
      expect(response).to.have.status(200);
    });

    it('returns an object on body', () => {
      expect(response.body).to.be.an('object');
    });

    it('object on body is not empty', () => {
      expect(response.body).to.be.not.empty;
    });
  })
})

describe('GET /recipes/:id', () => {
  describe('send an invalid id', () => {
    let connectionMock;

    before(async () => {
      const {name, email, password, role} = user;
      connectionMock = await getConnection();
		  sinon.stub(MongoClient, 'connect').resolves(connectionMock);
      db = connectionMock.db('Cookmaster');

      await db.collection('users').deleteMany({});
      await db.collection('users').insertOne({name, email, password, role });
      const token = await chai.request(server)
        .post('/login')
        .send({email, password})
        .then((res) => res.body.token);
      ;

      response = await chai.request(server)
        .get('/recipes/12345')

    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('returns status code 404', () => {
      expect(response).to.have.status(404);
    });

    it('returns an object on body', () => {
      expect(response.body).to.be.an('object');
    });

    it('response object has "message" property', () => {
      expect(response.body).to.have.property('message');
    });

    it('"message" property is "recipe not found"', () => {
      expect(response.body.message).to.be.equals('recipe not found');
    });
  })
})

describe('PUT /recipes/:id', () => {
  describe('edit one recipe successfully', () => {
    let connectionMock;

    before(async () => {
      const {name, email, password, role} = user;
      connectionMock = await getConnection();
		  sinon.stub(MongoClient, 'connect').resolves(connectionMock);
      db = connectionMock.db('Cookmaster');

      await db.collection('users').deleteMany({});
      await db.collection('users').insertOne({name, email, password, role });
      const token = await chai.request(server)
        .post('/login')
        .send({email, password})
        .then((res) => res.body.token);

      const id = await chai.request(server)
        .post('/recipes')
        .set('authorization', token)
        .send(recipe)
        .then((res) => res.body.recipe._id);

      response = await chai.request(server)
        .put(`/recipes/${id}`)
        .set('authorization', token)
        .send(anotherRecipe);

    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('returns status code 200', () => {
      expect(response).to.have.status(200);
    });

    it('returns an object on body', () => {
      expect(response.body).to.be.an('object');
    });

    it('object on body is not empty', () => {
      expect(response.body).to.be.not.empty;
    });
  })
})

describe('DELETE /recipes/:id', () => {
  describe('delete one recipe successfully', () => {
    let connectionMock;

    before(async () => {
      const {name, email, password, role} = user;
      connectionMock = await getConnection();
		  sinon.stub(MongoClient, 'connect').resolves(connectionMock);
      db = connectionMock.db('Cookmaster');

      await db.collection('users').deleteMany({});
      await db.collection('users').insertOne({name, email, password, role });
      const token = await chai.request(server)
        .post('/login')
        .send({email, password})
        .then((res) => res.body.token);

      const id = await chai.request(server)
        .post('/recipes')
        .set('authorization', token)
        .send(recipe)
        .then((res) => res.body.recipe._id);

      response = await chai.request(server)
        .delete(`/recipes/${id}`)
        .set('authorization', token);
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('returns status code 204', () => {
      expect(response).to.have.status(204);
    });

    it('returns an object on body', () => {
      expect(response.body).to.be.an('object');
    });

    it('object on body is empty', () => {
      expect(response.body).to.be.empty;
    });
  })
})

describe('POST /users/admin', () => {
  describe('add an admin successfully', () => {
    let connectionMock;

    before(async () => {
      const {name, email, password, role} = admin;
      connectionMock = await getConnection();
		  sinon.stub(MongoClient, 'connect').resolves(connectionMock);
      db = connectionMock.db('Cookmaster');

      await db.collection('users').deleteMany({});
      await db.collection('users').insertOne({name, email, password, role });
      const token = await chai.request(server)
        .post('/login')
        .send({email, password})
        .then((res) => res.body.token);

      response = await chai.request(server)
        .post('/users/admin')
        .set('authorization', token)
        .send(newAdmin);
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('returns status code 201', () => {
      expect(response).to.have.status(201);
    });

    it('returns an object on body', () => {
      expect(response.body).to.be.an('object');
    });

    it('response object has "user" property', () => {
      expect(response.body).to.have.property('user');
    });

    it('object on body is not empty', () => {
      expect(response.body).to.be.not.empty;
    });
  })
}) 