'use strict';

var utils = require('../../utils');

var routes = function () {
  var exp = {};

  exp.viewNews = function (req, res) {

    req.updateCollections(req.db, req.dbName, function (error) {
      if (error) {
        req.session.error = 'Could not refresh collections. ' + JSON.stringify(error);
        console.error(error);
        return res.redirect('back');
      }

      req.db.stats(function (error, data) {
        if (error) {
          req.session.error = 'Could not get stats. ' + JSON.stringify(error);
          console.error(error);
          return res.redirect('back');
        }

        var ctx = {
          title: 'Viewing News: ' + req.dbName
        };

        res.render('news', ctx);
      });
    });
  };

  return exp;
};

module.exports = routes;
