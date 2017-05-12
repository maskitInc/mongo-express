'use strict';

const express     = require('express');
const swig        = require('swig-templates');
const swigFilters = require('./filters');
const router      = require('./router');

const assets = require('../build-assets.json');

const middleware = function (config) {
  const app = express();

  app.locals.assets = assets;


  //Set up swig

  const swigOptions = {
    cache: process.env.NODE_ENV === 'production' ? 'memory' : false,
  };
  const swigEngine = new swig.Swig(swigOptions);
  app.engine('html', swigEngine.renderFile);
  Object.keys(swigFilters).forEach(function (name) {
    swig.setFilter(name, swigFilters[name]);
  });


  //App configuration
  //app.engine('pug', cons.pug);
  //app.set('view engine', 'pug');

  //app.engine('html', cons.swig);
  //app.set('view engine', 'html');


  app.set('view engine', 'html');
  app.set('views', __dirname + '/views');


  app.use('/', router(config));
  //app.set('view options', { layout: false });

  app.set('read_only',      config.options.readOnly      || false);
  app.set('gridFSEnabled',  config.options.gridFSEnabled || false);

  return app;
};

module.exports = middleware;
