const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const server = require('../src/api/app');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');


chai.use(chaiHttp);
const { expect } = chai;

describe('1 - rota /user/register', () => {
  describe('1.1 ----- Registro do usuario - ok', () => {
    let response = {};
    const DBServer = new MongoMemoryServer();

    before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock);

      sinon.stub(MongoClient, 'connect')
      .resolves(connectionMock);

      response = await chai.request(server)
          .post('/user/register')
          .send({
              name: 'Vrawnilsom',
              email: 'Teste@test.teste',
              password: 'Wraw251$#'
          });
    });

    after(async () => {
        MongoClient.connect.restore();
        await DBServer.stop();
    });

    it('Retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });
    
    it('O objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('Retorna o código de status 201', () => {
      expect(response.status).to.equal(201);
    });

    it('A propriedade "role" é igual a "customer"', () => {
      expect(response.body.user.role).to.be.equal('customer');
    });

    it('A propriedade "message" possui o texto "User created successfully"',
      () => {
        expect(response.body.message).to.be.equal('User created successfully');
     });
  });

  describe('1.2 ----- Registro do usuario - campos vazios', () => {
    let response = {};
    const DBServer = new MongoMemoryServer();

    before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock);

      sinon.stub(MongoClient, 'connect')
        .resolves(connectionMock);
    });

    after(async () => {
        MongoClient.connect.restore();
        await DBServer.stop();
    });

    describe('1.2.1 _ name', () => {
      it('Retorna o código de status 400',async () => {
        response = await chai.request(server)
          .post('/user/register')
          .send({
              name: '',
              password: 'Wraw251$#',
              email: 'treta@mil.vich'
        });
        expect(response.status).to.equal(400);
      });
  
      it('A propriedade "message" possui o texto "Invalid entries. Try again."',
        () => {
          expect(response.body.message)
            .to.be.equal('Invalid entries. Try again.');
       });
    });

    describe('1.2.2 _ password', () => {
      it('Retorna o código de status 400',async () => {
        response = await chai.request(server)
          .post('/user/register')
          .send({
              name: 'vranilson',
              password: '',
              email: 'treta@mil.vich'
        });
        expect(response.status).to.equal(400);
      });
  
      it('A propriedade "message" possui o texto "Invalid entries. Try again."',
        () => {
          expect(response.body.message)
            .to.be.equal('Invalid entries. Try again.');
       });
    });

    describe('1.2.3 _ email',async () => {
      it('Retorna o código de status 400',async () => {
        response = await chai.request(server)
          .post('/user/register')
          .send({
              name: 'vranilson',
              password: 'Wraw251$#',
              email: ''
        });
        expect(response.status).to.equal(400);
      });
  
      it('A propriedade "message" possui o texto "Invalid entries. Try again."',
        () => {
          expect(response.body.message)
            .to.be.equal('Invalid entries. Try again.');
       });
    });
  });

  describe('1.3 ----- Registro do usuario - campos errados', () => {
    let response = {};
    const DBServer = new MongoMemoryServer();

    before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock);

      sinon.stub(MongoClient, 'connect')
        .resolves(connectionMock);
    });

    after(async () => {
        MongoClient.connect.restore();
        await DBServer.stop();
    });

    describe('1.3.1 _ name', () => {
      it('Retorna o código de status 400',async () => {
        response = await chai.request(server)
          .post('/user/register')
          .send({
              nae: 'vrawmerson',
              password: 'Wraw251$#',
              email: 'treta@mil.vich'
        });
        expect(response.status).to.equal(400);
      });
  
      it('A propriedade "message" possui o texto "Invalid entries. Try again."',
        () => {
          expect(response.body.message)
            .to.be.equal('Invalid entries. Try again.');
       });
    });

    describe('1.3.2 _ password', () => {
      it('Retorna o código de status 400',async () => {
        response = await chai.request(server)
          .post('/user/register')
          .send({
              name: 'vranilson',
              pssword: 'asdf123423',
              email: 'treta@mil.vich'
        });
        expect(response.status).to.equal(400);
      });
  
      it('A propriedade "message" possui o texto "Invalid entries. Try again."',
        () => {
          expect(response.body.message)
            .to.be.equal('Invalid entries. Try again.');
       });
    });

    describe('1.3.3 _ email', () => {
      it('Retorna o código de status 400',async () => {
        response = await chai.request(server)
          .post('/user/register')
          .send({
              name: 'vranilson',
              password: 'Wraw251$#',
              emal: 'vraw@vraw.vraw'
        });
        expect(response.status).to.equal(400);
      });
  
      it('A propriedade "message" possui o texto "Invalid entries. Try again."',
        () => {
          expect(response.body.message)
            .to.be.equal('Invalid entries. Try again.');
       });
    });
  });

  describe('1.4 ----- Registro do usuario - dados invalidos', () => {
    let response = {};
    const DBServer = new MongoMemoryServer();

    before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock);

      sinon.stub(MongoClient, 'connect')
        .resolves(connectionMock);
    });

    after(async () => {
        MongoClient.connect.restore();
        await DBServer.stop();
    });

    describe('1.4.1 _ name', () => {
      it('Retorna o código de status 400',async () => {
        response = await chai.request(server)
          .post('/user/register')
          .send({
              name: ' aa',
              password: 'Wraw251$#',
              email: 'treta@mil.vich'
        });
        expect(response.status).to.equal(400);
      });
  
      it('A propriedade "message" possui o texto "Invalid entries. Try again."',
        () => {
          expect(response.body.message)
            .to.be.equal('Invalid entries. Try again.');
       });
    });

    describe('1.4.2 _ password', () => {
      it('Retorna o código de status 400',async () => {
        response = await chai.request(server)
          .post('/user/register')
          .send({
              name: 'vranilson',
              email: 'treta@mil.vich',
              password: 'a'
        });
        expect(response.status).to.equal(400);
      });
  
      it('A propriedade "message" possui o texto "Weak password"',
        () => {
          expect(response.body.message)
            .to.be.equal('Weak password');
       });
    });

    describe('1.4.3 _ email', () => {
      it('Retorna o código de status 400',async () => {
        response = await chai.request(server)
          .post('/user/register')
          .send({
              name: 'vranilson',
              email: 'aaaaa',
              password: 'Wraw251$#'
        });
        expect(response.status).to.equal(400);
      });
  
      it('A propriedade "message" possui o texto "Invalid entries. Try again."',
        () => {
          expect(response.body.message)
            .to.be.equal('Invalid entries. Try again.');
       });
    });
  
  });
});
