/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/messages', require('./api/message'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // Legacy routes from old website links
  var oldPages = [
      { section:'biography',	suffix: '.htm'  },
      { section:'education', 	suffix: '.htm'  },
      { section:'ensembles', 	suffix: '.htm'  },
      { section:'contact', 		suffix: '.html' },
      { section:'gallery', 		suffix: '.htm'  },
      { section:'music', 		suffix: '.htm'  },
      { section:'links',		suffix: '.htm'  }
  ];
  oldPages.forEach(function(oldPage) {
      app.route('/' + oldPage.section + oldPage.suffix)
          .get(function(req, res) {
              res.redirect('main/' + oldPage.section);
          });
  });

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
