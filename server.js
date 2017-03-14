'use strict';

const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');

const app = express();

app.use([
  express.static('public'),
  bodyParser.json(), 
  bodyParser.urlencoded({extended: false})
]);

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

const router = express.Router();



/* Serve html */

router.get('/', (req, res) => {
  
   /** Set options on Express's app.locals object, which lets us carry data
    * in the server app. This will be our `database`, for lack of a real one.
    *
    * If the name form was sent, the app.locals.name prop will be set to that name
    * and displayed in the view; if not, it will be undefined,
    * and our template will ignore it.
    * If the form for enabling JS was sent, app.locals.jsEnabled 
    * will be true and script tags will be added to the DOM.
    */    

   if (!app.locals.jsEnabled && req.query['js-enabled']) {
     app.locals.jsEnabled = req.query['js-enabled'] == true;
   }

    res.render('home', app.locals); 
});

router.post('/print-name', (req, res) => {

  /** Send user's name as query string just to illustrate 
   * *that stuff has happened on the server 
   * TODO: use req.xhr to test if ajax request and handle sending actual data
   */
  app.locals.name = req.body.name;

  if (req.xhr) {
    res.status(200).send(app.locals.name);
  } else {
    res.redirect(301, '/?name=' + app.locals.name);
  }
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
  app.locals.jsEnabled = (req.body['js-enabled']==true);  
  res.redirect(301, '/?js-enabled=' + req.body['js-enabled']);
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


