
// verifie le role 
module.exports = function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      
      const err = new Error('Accès refusé : rôle insuffisant');
        err.status = 403;
        return next(err);

    }
    next();
  };
};