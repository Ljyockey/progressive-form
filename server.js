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
    * If the name form was sent, the app.locals.name prop will have that name
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
   * that routing has happened on the server.
   */
  app.locals.name = req.body.name;

  if (req.xhr) {
    res.status(200).send(app.locals.name);
  } else {
    res.status(301).redirect('/?name=' + app.locals.name);
  }
});

router.post('/toggle-js', (req, res) => {

  /** Set jsEnabled on the app.locals object and redirect to home.

   * The toggle-js radios have values of 1 and 0,
   * which can also be evaluated to true or false, respectively.
   * 
   * Here, we get the 1 or 0 from the req.body and convert it to 
   * its corresponding boolean. That boolean is then set to app.locals.jsEnabled.
   * 
   * Then we send the 1 or 0 in the query string as a visual indicator that we have
   * done some navigating server-side.
   */
  app.locals.jsEnabled = (req.body['js-enabled']==true);  
  res.status(301).redirect('/?js-enabled=' + req.body['js-enabled']);
});

/* Handle navigation to nonexistant routes */

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


