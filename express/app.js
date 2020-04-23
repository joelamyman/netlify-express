const serverless = require('serverless-http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient

const router = express.Router();

router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.js!</h1>');
  res.end();
});
router.post('/', (req, res) =>  {
  MongoClient.connect(uri, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('star-wars-quotes')
    const quotesCollection = db.collection('quotes');
    quotesCollection.insertOne(req.body)
      .then(result => {
        res.redirect('/')
      })
      .catch(error => console.error(error))
  })
  .catch(error => console.error(error))




  // console.log(req.body);
  // res.json({ postBody: req.body });
});

app.use(bodyParser.urlencoded({ extended: true }))
app.use('/.netlify/functions/app', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);




// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.get('.netlify/functions/app/api/info', (req, res) => {
//   res.send({ application: 'sample-app', version: '1' });
// });
// app.post('.netlify/functions/app/api/v1/getback', (req, res) => {
//   res.send({ ...req.body });
// });
// //app.listen(3000, () => console.log(`Listening on: 3000`));
// module.exports.handler = serverless(app);