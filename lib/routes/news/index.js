'use strict';

// Add routes from other files
const newsRoute = require('./news');

module.exports = function (config) {
  const exp = {};

  const configuredNewsRoutes = newsRoute(config);
  exp.viewNews = configuredNewsRoutes.viewNews;

  // Homepage route
  exp.index = function (req, res) {
    const ctx = {
      title: 'Mongo Express',
      info: false,
    };

    if (typeof req.adminDb === 'undefined') {
      return res.render('news/index');
    }

    req.adminDb.serverStatus((err, info) => {
      if (err) {
        // TODO: handle error
        console.error(err);
      }

      ctx.info = info;
      res.render('news/index', ctx);
    });

  };

  return exp;
};
