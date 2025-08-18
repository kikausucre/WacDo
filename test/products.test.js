const { expect } = require('chai');
const sinon = require('sinon');
const Produit = require('../backend/models/Product');
const { getAllProduits, getProduitById, createProduit, putProduit, deleteProduit } = require('../backend/controllers/productController');


//getAllProduits
describe('getAllProduits test des status', () => {
  afterEach(() => sinon.restore()); // Après chaque test, restaure tous les stubs pour éviter que les tests suivants soient affectés

  it('retourne 200 si OK', async () => {
    sinon.stub(Produit, 'find').resolves([]); // On simule la méthode Produit.find() de la base de données pour qu'elle renvoie un tableau vide (succès)
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() }; // Création d’un objet 'res' simulé : status() retourne 'res'
    await getAllProduits({}, res);  // On appelle la fonction getAllProduits avec req vide et notre res simulé
    expect(res.status.calledWith(200)).to.be.true; // Vérifie que res.status(200) a bien été appelé → succès
  });

  it('retourne 400 si erreur', async () => {
    sinon.stub(Produit, 'find').rejects(new Error('DB error')); // On simule une erreur de DB (Produit.find() rejette une erreur)
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() }; // Objet 'res' simulé
    await getAllProduits({}, res); // On appelle la fonction getAllProduits avec req vide et notre res simulé
    expect(res.status.calledWith(400)).to.be.true; // Vérifie que res.status(400) a été appelé → erreur détectée correctement
  });
});


// getProduitById
describe('getProduitById', () => {
  afterEach(() => sinon.restore()); 

  it('retourne 200 si OK', async () => {
      sinon.stub(Produit, 'findById').resolves({ nom: 'Produit1' });
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
      const next = sinon.stub();
      const req = { params: { id: '123' } };
      await getProduitById(req, res, next);
      expect(res.status.calledWith(200)).to.be.true;
    });

  it('retourne 404 si produit non trouvé', async () => {
      sinon.stub(Produit, 'findById').resolves(null);
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
      const next = sinon.stub();
      const req = { params: { id: '123' } };
      await getProduitById(req, res, next);
      expect(next.calledOnce).to.be.true; // vérifie que next(err) a été appelé
      const err = next.firstCall.args[0];
      expect(err.status).to.equal(404);
    });

  it('retourne 500 si erreur DB', async () => {
      sinon.stub(Produit, 'findById').rejects(new Error('DB error'));
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
      const next = sinon.stub();
      const req = { params: { id: '123' } };
      await getProduitById(req, res, next);
      expect(res.status.calledWith(500)).to.be.true;
    });
  });

// createProduit
describe('createProduit', () => {
  afterEach(() => sinon.restore()); 

  it('retourne 201 si OK', async () => {
    const saveStub = sinon.stub().resolves();
    sinon.stub(Produit.prototype, 'save').callsFake(saveStub);

    const req = {
      body: {
        nom: 'Produit1',
        description: 'Desc',
        prix: 10,
        categorie: 'Cat',
      },
      file: { filename: 'image.png' }, // fichier simulé
    };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    await createProduit(req, res);

    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.calledWith({ message: 'Objet enregistré !' })).to.be.true;
  });

  it('retourne 400 si pas de fichier', async () => {
    const req = { body: {}, file: null };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    await createProduit(req, res);

    expect(res.status.calledWith(400)).to.be.true;
  });

  it('retourne 500 si erreur DB', async () => {
    sinon.stub(Produit.prototype, 'save').rejects(new Error('DB error'));
    const req = {
      body: {
        nom: 'Produit1',
        description: 'Desc',
        prix: 10,
        categorie: 'Cat',
      },
      file: { filename: 'image.png' },
    };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    await createProduit(req, res);

    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledOnce).to.be.true;
  });
});

// putProduits
describe('putProduit', () => {
  afterEach(() => sinon.restore());

  it('retourne 200 si OK', async () => {
    sinon.stub(Produit, 'updateOne').resolves();
    const req = { params: { id: '123' }, body: { nom: 'ProduitModifié' } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    await putProduit(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith({ message: 'Objet modifié !' })).to.be.true;
  });

  it('retourne 400 si erreur', async () => {
    sinon.stub(Produit, 'updateOne').rejects(new Error('DB error'));
    const req = { params: { id: '123' }, body: { nom: 'ProduitModifié' } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    await putProduit(req, res);

    expect(res.status.calledWith(400)).to.be.true;
    expect(res.json.calledOnce).to.be.true;
  });
});

//deleteProduit
describe('deleteProduit', () => {
  afterEach(() => sinon.restore());

  it('retourne 200 si OK', async () => {
    sinon.stub(Produit, 'deleteOne').resolves();
    const req = { params: { id: '123' } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    await deleteProduit(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith({ message: 'Objet supprimé !' })).to.be.true;
  });

  it('retourne 400 si erreur', async () => {
    sinon.stub(Produit, 'deleteOne').rejects(new Error('DB error'));
    const req = { params: { id: '123' } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    await deleteProduit(req, res);

    expect(res.status.calledWith(400)).to.be.true;
    expect(res.json.calledOnce).to.be.true;
  });
});


// npx mocha test/*.test.js