const jwt = require('jsonwebtoken');

//verifie si un token valide est present
module.exports = function (req, res, next) {

    const token = req.header('Authorization');
    if(!token) {
        const err = new Error('Token invalide');
        err.status = 401;
        return next(err);
        
    }
    try {
        const user = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET );
        req.user = user; //stock user dans le req
        next();

        } catch(err) {
           return res.status(401).json({ message: 'Token invalide, vous n avez pas le role requis' });
        }


};

