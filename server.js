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



// serve html

router.get('/', (req, res) => {
  res.render('home');
});

///////////////////////////////////////////////////
app.use('/', router);

router.use('*', function(req, res) {
  return res.status(404).json({message: 'Not Found'});
});


//////////////////////

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


