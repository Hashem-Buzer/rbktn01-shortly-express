const model = require('../models')

const parseCookies = (req, res, next) => {
  var cookieObj = {};

  if (req.headers.cookie) {
    var cookies = req.headers.cookie.split('; ');
    cookies.forEach(cookie => {
      var arr = cookie.split('=');
      cookieObj[arr[0]] = arr[1];
    })
  }
  req.cookies = cookieObj;
  next();
};

module.exports = parseCookies;
