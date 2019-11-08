const tokenService = require('../token-service');

module.exports = function createEnsureAuth() {
  return (req, res, next) => {
    const token = req.get('Authorization');

    if(!token) {
      next({
        statusCode: 400,
        message: 'No authorization token found on request'
      });
      return;
    }

    tokenService.verify(token)
      .then(payload => {
        req.user = payload;

        try {
          req.user.isAdmin = req.user.roles.includes('admin');
        }
        catch(err) {
          req.user.isAdmin = false;
        }

        next();
      })
      .catch(() => {
        next({
          statusCode: 401,
          message: 'Invalid authorization token'
        });
      });
  };
};