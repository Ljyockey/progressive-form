'use strict';

const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

const router = express.Router();



/* Serve html */

router.get('/', (req, res) => {
  
   /** Set options on Express's res.locals object, which lets us add data
    * to a response:
    *
    * If the name form was sent, the name prop will be set to that name
    * and displayed in the view; if not, it will be undefined,
    * and our template will ignore it.

    * If the form for enabling JS was sent, app.locals.jsEnabled 
    * will be true and script tags will be added to the DOM.
    * @example
    * // renders 'You submitted "Wizard Ben"` and enables JavaScript
    * res.locals = {
    *   name: 'Wizard Ben',
    *   jsEnabled: true
    * }
    */
  res.locals = {
    name: req.query.name ? req.query.name : undefined,
    jsEnabled: app.locals.jsEnabled
  }

  /** Pass the locals object into the render function
   * to expose variables to our template.
   */

    res.render('home', res.locals); 
});

router.post('/print-name', (req, res) => {

  /* Send user's name as query string so it can be printed on redirect */
  res.redirect(302, '/?name=' + req.body.name);
});

router.post('/toggle-js', (req, res) => {

  /** Set jsEnabled on the app.locals object and redirect to home.
   * The app.locals object is like res.locals, except its data is "globa"
   * to the whole app, and not just one req-res cycle.
   * The toggle-js radios have values of 1 and 0,
   * which can also be evaluated to true or false, respectively.
   * 
   * Here, we convert 1 or 0 to its corresponding boolean and assign 
   * that boolean to the jsEnabled prop of the app.locals object.
   * That boolean is then sent as a query string so that handlebars
   * can do something with it.
   */
  app.locals.jsEnabled = (req.body['js-enabled'] == true);
  res.redirect(302, '/?js-enabled=' + app.locals.jsEnabled)
});

/* handle navigation to nonexistant routes */

router.use('*', function(req, res) {
  return res.status(404).json({message: 'Not Found'});
});


app.use('/', router);





let server;


function runServer(databaseUrl, port=8080) {

  return new Promise((resolve, reject) => {
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
      .on('error', err => {

        reject(err);
      });
  });
}


function closeServer() {
     return new Promise((resolve, reject) => {
       console.log('Closing server');
       server.close(err => {
           if (err) {
               return reject(err);
           }
           resolve();
       });
     });
}


if (require.main === module) {
  runServer().catch(err => console.error(err));
};

module.exports = {app, runServer, closeServer};


