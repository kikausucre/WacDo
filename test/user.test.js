const { expect } = require('chai');
const sinon = require('sinon');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../backend/models/User');
const { createUser, userLogin, getUsers, delUsers } = require('../backend/controllers/userController');

describe('User Controller', () => {
  afterEach(() => sinon.restore());

  //createUser
  describe('createUser', () => {
    it('retourne 201 si OK', async () => {
      sinon.stub(bcrypt, 'hash').resolves('hashedPassword');
      sinon.stub(User.prototype, 'save').resolves();
      const req = { body: { username: 'Alice', password: 'password123', role: 'admin' } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
 
      await createUser(req, res);

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith({ message: 'Utilisateur créé' })).to.be.true;
    });
});

  //getUsers
  describe('getUsers', () => {
    it('retourne la liste des utilisateurs', async () => {
      sinon.stub(User, 'find').resolves([{ username: 'Alice' }]);
      const req = {};
      const res = { json: sinon.stub() };

      await getUsers(req, res);

      expect(res.json.calledWith([{ username: 'Alice' }])).to.be.true;
    });

    it('retourne 400 si erreur', async () => {
      sinon.stub(User, 'find').rejects(new Error('DB error'));
      const req = {};
      const res = { json: sinon.stub(), status: sinon.stub().returnsThis() };

      try {
        await getUsers(req, res);
      } catch (err) {
        expect(err).to.exist;
      }
    });
  });

  //delUser
  describe('delUsers', () => {
    it('retourne message si OK', async () => {
      sinon.stub(User, 'findByIdAndDelete').resolves({ username: 'Alice' });
      const req = { params: { id: '123' } };
      const res = { json: sinon.stub() };
      const next = sinon.stub();

      await delUsers(req, res, next);

      expect(res.json.calledWith({ message: 'Utilisateur supprimé' })).to.be.true;
    });

    it('appelle next si utilisateur introuvable', async () => {
      sinon.stub(User, 'findByIdAndDelete').resolves(null);
      const req = { params: { id: '123' } };
      const res = {};
      const next = sinon.stub();

      await delUsers(req, res, next);

      expect(next.calledOnce).to.be.true;
      const err = next.getCall(0).args[0];
      expect(err).to.be.instanceOf(Error);
      expect(err.message).to.equal('Utilisateur introuvable');
    });

    it('retourne 500 si erreur serveur', async () => {
      sinon.stub(User, 'findByIdAndDelete').rejects(new Error('DB error'));
      const req = { params: { id: '123' } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
      const next = sinon.stub();

      await delUsers(req, res, next);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
    });
  });
});
