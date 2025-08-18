const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: (req, files, callback) => callback(null, 'uploads/'), // les images iront dans /uploads
    filename: (req, file, callback) => {                               // on defini comment nommer les images
        const unique = Date.now();
        callback(null, unique + path.extname(file.originalname));      // on recupere l'extension original et on la concatène au nouveau nom

    }
});

const fileFilter = (req, file, callback) => {
    const allowedTypes = /jpeg|jpg|svg|png|gif|webp/;    // on defini les types autorisés
    const isExtensionValid = allowedTypes.test(path.extname(file.originalname).toLowerCase());   // on vérifie si l'extension du fichier est valide
    const isMimetypeValid = allowedTypes.test(file.mimetype);                                    // on vérifie si le type mime est valide
    if(isExtensionValid && isMimetypeValid)
        callback(null, true);
    else
        callback(new Error('seul les images sont autorisées'));
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});

module.exports = upload;
