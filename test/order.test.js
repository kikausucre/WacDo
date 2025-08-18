const { expect } = require('chai');
const sinon = require('sinon');
const Order = require('../backend/models/Order');
const Product = require('../backend/models/Product');
const Menu = require('../backend/models/Menu');
const { createOrder, getAllOrder, putOrder, deleteOrder } = require('../backend/controllers/orderController');

describe('Order Controller', () => {
  afterEach(() => sinon.restore()); // Remet à zéro tous les stubs après chaque test

  //createOrder
  describe('createOrder', () => {
    it('retourne 201 si OK', async () => {
      sinon.stub(Product, 'findOne').resolves({ nom: 'Produit1', prix: 10 });
      sinon.stub(Menu, 'findOne').resolves(null);
      sinon.stub(Order.prototype, 'save').resolves();

      const req = {
        body: {
          nomClient: 'Alice',
          produits: [{ type: 'produit', nom: 'Produit1', quantite: 2 }],
          supplements: [],
          heureLivraison: '2025-08-18T12:00:00'
        }
      };
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

      await createOrder(req, res);

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
    });

    it('retourne 400 si erreur', async () => {
      sinon.stub(Order.prototype, 'save').rejects(new Error('DB error'));
      const req = { body: {} };
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

      await createOrder(req, res);

      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
    });
  });

  //getAllOrder
describe('getAllOrder', () => {
  it('retourne 200 si OK', async () => {
    const sortStub = sinon.stub().resolves([{ nomClient: 'Alice' }]);
    sinon.stub(Order, 'find').returns({ sort: sortStub });

    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    await getAllOrder({}, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledOnce).to.be.true;
  });

  it('retourne 400 si erreur', async () => {
    const sortStub = sinon.stub().rejects(new Error('DB error'));
    sinon.stub(Order, 'find').returns({ sort: sortStub });

    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    await getAllOrder({}, res);

    expect(res.status.calledWith(400)).to.be.true;
    expect(res.json.calledOnce).to.be.true;
  });
});


  //deleteOrder
  describe('deleteOrder', () => {
    it('retourne 200 si OK', async () => {
      sinon.stub(Order, 'deleteOne').resolves({ acknowledged: true });
      const req = { params: { id: '123' } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

      await deleteOrder(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ message: 'Commande supprimée !' })).to.be.true;
    });

    it('retourne 400 si erreur', async () => {
      sinon.stub(Order, 'deleteOne').rejects(new Error('DB error'));
      const req = { params: { id: '123' } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

      await deleteOrder(req, res);

      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
    });
  });
});