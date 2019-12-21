const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  Promise.resolve(req.cookies.shortlyId)
  .then(hash=> {
    if (!hash) {
      throw hash;
    }
    return models.Sessions.get({hash})
  })
  .then(session=> {
    if (!session) {
      throw session;
    }
    return session
  })
  .catch(()=> {
    return models.Sessions.create()
    .then(results=> {
      return models.Sessions.get({id: results.insertId});
    })
  })
  .then(session=> {
    req.session = session;
    next();
  })
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

