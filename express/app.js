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
router.get('/complete/', (req, res) => {
  MongoClient.connect(uri, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    console.log('request body is:')
    console.log(req.body.textsize);
    const db = client.db('test-data')
    const submissionsCollection = db.collection('submissions');
    var query = {
      "_id" : {"$in":[ObjectId("5ebea76b69c5ed197b666bde"), ObjectId("5ebeb3b9eb8fc5d083afa5cd")]}
    };
    submissionsCollection.find(query).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      client.close();
      res.send(JSON.stringify(result))
    });
  })
});
router.get('/results/share/*', (req, res) => {
  res.redirect(`/`)
});
router.get('/results/show/*', (req, res) => {
  // res.set({
  //   'Content-Type': 'text/html'
  // }) oops
  // res.send('<h1>Here is what you made!</h1><p>Text size' + req.query.textSize + '<br> Info amount ' + req.query.infoAmount + '</p><script>window.onload = function(){console.log("loaded")}</script>');
  res.sendFile('index.html', { root: '/results/'});
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
        res.redirect(`/.netlify/functions/app/results/show/?textSize="${req.body.textsize}"&infoAmount="${req.body.infoAmount}"&productOptions="${req.body.productOptions}"&imagepos="${req.body.imagepos}"`)
      })
      .catch(error => console.error(error));
    console.log("about to tackle the second");
    let parameter = `textsize.${req.body.textsize}`;
    let updateAction = { $inc: { [parameter]: 1 } }; // increment requests record by 1
    const updateOptions = {
      projection: { _id: 0 },
      upsert: true, // create record if not present
      returnOriginal: false // return updated value
    };
    submissionsCollection.findOneAndUpdate({"_id" : ObjectId("5ebea76b69c5ed197b666bde")}, updateAction, updateOptions)
      .then(result => {
        console.log('Saved new page request. Current count:', result.value.requests);
        client.close();  
      })
      .catch(error => console.error(error));

    parameter = `infoAmount.${req.body.infoAmount}`;
    updateAction = { $inc: { [parameter]: 1 } };
    submissionsCollection.findOneAndUpdate({"_id" : ObjectId("5ebeb3b9eb8fc5d083afa5cd")}, updateAction, updateOptions)
      .then(result => {
        console.log('Saved new page request. Current count:', result.value.requests);
        client.close();  
      })
      .catch(error => console.error(error));

    parameter = `productOptions.${req.body.productOptions}`;
    updateAction = { $inc: { [parameter]: 1 } };
    submissionsCollection.findOneAndUpdate({"_id" : ObjectId("5ebeb4eeeb8fc5d083afa5ce")}, updateAction, updateOptions) 
      .then(result => {
        console.log('Saved new page request. Current count:', result.value.requests);
        client.close();
      })
      .catch(error => console.error(error))

    parameter = `imagepos.${req.body.imagepos}`;
    updateAction = { $inc: { [parameter]: 1 } };
    submissionsCollection.findOneAndUpdate({"_id" : ObjectId("5ebeb564eb8fc5d083afa5cf")}, updateAction, updateOptions)
      .then(result => {
        console.log('Saved new page request. Current count:', result.value.requests);
        client.close();
      })
      .catch(error => console.error(error))

    
  })
  .catch(error => console.error(error))

});

app.use(bodyParser.urlencoded({ extended: true }))
app.use('/.netlify/functions/app', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);
