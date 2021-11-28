const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const server = require('../src/api/app');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');


chai.use(chaiHttp);
const { expect } = chai;

describe('1 - rota /user', () => {
  describe('1.1 - Registro do usuario ok', () => {
    let response = {};
    const DBServer = new MongoMemoryServer();

    before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock);

      sinon.stub(MongoClient, 'connect')
      .resolves(connectionMock);

      response = await chai.request(server)
          .post('/user')
          .send({
              name: 'jane',
              password: 'senha123',
              email: 'treta@mil.vich'
          });

    });

    after(async () => {
        MongoClient.connect.restore();
        await DBServer.stop();
    })

    it('Retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });
    
    it('O objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('Retorna o código de status 201', () => {
      expect(response).to.have.status(201);
    });

    it('A propriedade "message" possui o texto "User created successfully"',
      () => {
        expect(response.body.message)
          .to.be.equal('User created successfully');
     });
    
  });

  describe('1.2 - Registro do usuario falho', () => {
    let response = {};
    const DBServer = new MongoMemoryServer();

    before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock);

      sinon.stub(MongoClient, 'connect')
      .resolves(connectionMock);

      response = await chai.request(server)
          .post('/user/')
          .send({
              nae: 'jane',
              password: 'senha123',
              email: 'treta@mil.vich'
          });

    });

    after(async () => {
        // MongoClient.connect.restore();
        await DBServer.stop();
    })

    it('Retorna o código de status 400', () => {
      expect(response).to.have.status(400);
    });

    it('A propriedade "message" possui o texto "Invalid entries. Try again."',
      () => {
        expect(response.body.message)
          .to.be.equal('Invalid entries. Try again.');
     });
    
  });



});