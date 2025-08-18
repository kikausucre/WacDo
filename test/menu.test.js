const { expect } = require('chai');
const sinon = require('sinon');
const Menu = require('../backend/models/Menu');
const Product = require('../backend/models/Product'); 
const { createMenu, getAllMenu, putMenu, deleteMenu } = require('../backend/controllers/menuController');

describe('Menu Controller', () => {
  afterEach(() => sinon.restore()); // Reset tous les stubs après chaque test

  //createMenu
  describe('createMenu', () => {
    it('retourne 201 si OK', async () => {
      sinon.stub(Menu.prototype, 'save').resolves();
      const req = { body: { nom: 'Menu1', prix: 15 } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

      await createMenu(req, res);

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
    });

    it('retourne 400 si erreur', async () => {
      sinon.stub(Menu.prototype, 'save').rejects(new Error('DB error'));
      const req = { body: { nom: 'Menu1', prix: 15 } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

      await createMenu(req, res);

      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
    });
  });

  //getAllMenu
  describe('getAllMenu', () => {
    it('retourne 200 si OK', async () => {
      sinon.stub(Menu, 'find').resolves([{ nom: 'Menu1', prix: 15 }]);
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

      await getAllMenu({}, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
    });

    it('retourne 400 si erreur', async () => {
      sinon.stub(Menu, 'find').rejects(new Error('DB error'));
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

      await getAllMenu({}, res);

      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
    });
  });

  //putMenu
  describe('putMenu', () => {
    it('retourne 200 si OK', async () => {
      sinon.stub(Menu, 'updateOne').resolves({ acknowledged: true });
      const req = { params: { id: '123' }, body: { nom: 'MenuModifie', prix: 20 } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

      await putMenu(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ message: 'Menu modifié !' })).to.be.true;
    });

    it('retourne 400 si erreur', async () => {
      sinon.stub(Menu, 'updateOne').rejects(new Error('DB error'));
      const req = { params: { id: '123' }, body: { nom: 'MenuModifie', prix: 20 } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

      await putMenu(req, res);

      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
    });
  });

  //deleteMenu
  describe('deleteMenu', () => {
    it('retourne 200 si OK', async () => {
      sinon.stub(Menu, 'deleteOne').resolves({ acknowledged: true });
      const req = { params: { id: '123' } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

      await deleteMenu(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ message: 'Menu supprimé !' })).to.be.true;
    });

    it('retourne 400 si erreur', async () => {
      sinon.stub(Menu, 'deleteOne').rejects(new Error('DB error'));
      const req = { params: { id: '123' } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

      await deleteMenu(req, res);

      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
    });
  });
});
