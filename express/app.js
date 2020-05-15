const serverless = require('serverless-http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
ObjectId = require('mongodb').ObjectID;

const uri = `mongodb+srv://jlamyman:${process.env.DB_PASS}@mtestcluster-bstuo.mongodb.net/test?retryWrites=true&w=majority`;

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
    console.log('request body is:')
    console.log(req.body.textsize);
    const db = client.db('test-data')
    const submissionsCollection = db.collection('submissions');
    submissionsCollection.insertOne(req.body)
      .then(result => {
        res.redirect('/')
      })
      .catch(error => console.error(error));
    const updateAction = { $inc: { [req.body.textsize]: 1 } }; // increment requests record by 1
    const updateOptions = {
      projection: { _id: 0 },
      upsert: true, // create record if not present
      returnOriginal: false // return updated value
    };
    submissionsCollection.findOneAndUpdate({"_id" : [ObjectId("5ebea76b69c5ed197b666bde")]}, updateAction, updateOptions, (err, result) => {
      if (err) return errorResponse(callback, err);

      console.log('Saved new page request. Current count:', result.value.requests);
  
      client.close();

      callback(null, {
        statusCode: 200,
        body: JSON.stringify(result)
      });
    })
  })
  .catch(error => console.error(error))

});

app.use(bodyParser.urlencoded({ extended: true }))
app.use('/.netlify/functions/app', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);
