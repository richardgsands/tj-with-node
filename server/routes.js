/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  // SEO
  app.use(function(req, res, next) {
    var fragment = req.query._escaped_fragment_;

    // If there is no fragment in the query params
    // then we're not serving a crawler
    if (!fragment) return next();

    // If the fragment is empty, serve the
    // index page
    if (fragment === "" || fragment === "/")
        fragment = "/index.html";

    // If fragment does not start with '/'
    // prepend it to our fragment
    if (fragment.charAt(0) !== "/")
        fragment = '/' + fragment;

    // If fragment does not end with '.html'
    // append it to the fragment
    if (fragment.indexOf('.html') == -1)
        fragment += ".html";

    // Serve the static html snapshot
    try {
        var file = __dirname + "/snapshots" + fragment;
        res.sendfile(file);
    } catch (err) {
        res.send(404);
    }
  });

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
