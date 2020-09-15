const serverless = require('serverless-http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const randomWords = require('random-words');
const { check } = require('express-validator');
ObjectId = require('mongodb').ObjectID;

const uri = `mongodb+srv://jlamyman:${process.env.DB_PASS}@mtestcluster-bstuo.mongodb.net/test?retryWrites=true&w=majority`;

const router = express.Router();

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
router.get('/orange-monkey-llama-32/', (req, res) => {
  MongoClient.connect(uri, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database');
    const db = client.db('test-data');
    const submissionsCollection = db.collection('submissions');
    submissionsCollection.find().toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      client.close();
      res.send(JSON.stringify(result))
    });
  })
});
router.get('/results/share/*', (req, res) => {
  const id = req.query.id.replace(/['"]+/g, '');

  

  MongoClient.connect(uri, { useUnifiedTopology: true })
  .then(client => {
    const db = client.db('test-data')
    const submissionsCollection = db.collection('submissions');
    var query = {
      "userID" :  id 
    };
    submissionsCollection.find(query).toArray(function(err, result) {
      if (err) throw err;
      res.status(200).jsonp({ "message": result })
      client.close();
    });
})
});
router.get('/results/popular/', (req, res) => {
  MongoClient.connect(uri, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    console.log('request body is:')
    const db = client.db('test-data')
    const submissionsCollection = db.collection('submissions');
    var query = {
      "_id" : {"$in":[ObjectId("5ebea76b69c5ed197b666bde"), ObjectId("5ebeb3b9eb8fc5d083afa5cd"), ObjectId("5ebeb4eeeb8fc5d083afa5ce"), ObjectId("5ece296b45ce3f056cdab669"), ObjectId("5ece2a1845ce3f056cdab66b"), ObjectId("5ee0b8619cdebebbfd66d645"), ObjectId("5ee0b8869cdebebbfd66d646"), ObjectId("5ee0b8999cdebebbfd66d647"), ObjectId("5ee0b8b69cdebebbfd66d648")]}
    };
    submissionsCollection.find(query).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      client.close();
      const dataString = JSON.parse(JSON.stringify(result));
      const textSizesData = dataString.find(x => x._id === '5ebea76b69c5ed197b666bde').textsize;
      const additionalInfoData = dataString.find(x => x._id === '5ebeb3b9eb8fc5d083afa5cd').infoAmount;
      const productOptionsData = dataString.find(x => x._id === '5ebeb4eeeb8fc5d083afa5ce').productOptions;
      const imagePosData = dataString.find(x => x._id === '5ece296b45ce3f056cdab669').imagePos;
      const buttonsData = dataString.find(x => x._id === '5ece2a1845ce3f056cdab66b').buttons;
      const colourSchemeData = dataString.find(x => x._id === '5ee0b8619cdebebbfd66d645').colourScheme;
      const reviewsData = dataString.find(x => x._id === '5ee0b8869cdebebbfd66d646').reviews;
      const spacingData = dataString.find(x => x._id === '5ee0b8999cdebebbfd66d647').spacing;
      const additionalFeaturesData = dataString.find(x => x._id === '5ee0b8b69cdebebbfd66d648').additionalFeatures;
      res.status(200).jsonp({
        "textSize": mostFrequent(textSizesData),
        "additionalInfo": mostFrequent(additionalInfoData),
        "productOptions": mostFrequent(productOptionsData),
        "imagePos": mostFrequent(imagePosData),
        "buttons": mostFrequent(buttonsData),
        "colourScheme": mostFrequent(colourSchemeData),
        "reviews": mostFrequent(reviewsData),
        "spacing": mostFrequent(spacingData),
        "additionalFeatures": mostFrequent(additionalFeaturesData)
      })
    })
  })
});
router.post('/consent', (req, res) => {
  res.redirect(`/testing/`)
});
router.post('/', [
  check('textsize').isLength({ min: 5 }).trim().escape(),
  check('infoAmount').isLength({ min: 5 }).trim().escape(),
  check('productOptions').isLength({ min: 5 }).trim().escape(),
  check('imagePos').isLength({ min: 5 }).trim().escape(),
  check('buttons').isLength({ min: 5 }).trim().escape(),
  check('colourScheme').isLength({ min: 5 }).trim().escape(),
  check('reviews').isLength({ min: 5 }).trim().escape(),
  check('spacing').isLength({ min: 5 }).trim().escape(),
  check('additionalFeatures').isLength({ min: 5 }).trim().escape()
] , (req, res) =>  {
  MongoClient.connect(uri, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')

    const cleanTextSize = req.body.textsize;
    const cleanInfoAmount = req.body.infoAmount;
    const cleanProductOptions = req.body.productOptions;
    const cleanImagePos = req.body.imagePos;
    const cleanButtons = req.body.buttons;
    const cleanColourScheme = req.body.colourScheme;
    const cleanReviews = req.body.reviews ;
    const cleanSpacing = req.body.spacing ;
    const cleanAdditionalFeatures = req.body.additionalFeatures ;

    const randomId = randomWords({ exactly: 3, join: '-' });

    const db = client.db('test-data')
    const submissionsCollection = db.collection('submissions');

    submissionsCollection.insertOne( { userID: [randomId], textSize: [cleanTextSize], infoAmount: [cleanInfoAmount], productOptions: [cleanProductOptions], imagePos: [cleanImagePos], cleanButtons: [cleanButtons], colourScheme: [cleanColourScheme], reviews: [cleanReviews], spacing: [cleanSpacing], additionalFeatures: [cleanAdditionalFeatures] } )
      .then(result => {
        res.redirect(`/review/?id="${randomId}"`)
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
      })
      .catch(error => console.error(error));

    parameter = `infoAmount.${req.body.infoAmount}`;
    updateAction = { $inc: { [parameter]: 1 } };
    submissionsCollection.findOneAndUpdate({"_id" : ObjectId("5ebeb3b9eb8fc5d083afa5cd")}, updateAction, updateOptions)
      .then(result => {
        console.log('Saved new page request. Current count:', result.value.requests);
      })
      .catch(error => console.error(error));

    parameter = `productOptions.${req.body.productOptions}`;
    updateAction = { $inc: { [parameter]: 1 } };
    submissionsCollection.findOneAndUpdate({"_id" : ObjectId("5ebeb4eeeb8fc5d083afa5ce")}, updateAction, updateOptions) 
      .then(result => {
        console.log('Saved new page request. Current count:', result.value.requests);
      })
      .catch(error => console.error(error))

    parameter = `imagePos.${req.body.imagePos}`;
    updateAction = { $inc: { [parameter]: 1 } };
    submissionsCollection.findOneAndUpdate({"_id" : ObjectId("5ece296b45ce3f056cdab669")}, updateAction, updateOptions)
      .then(result => {
        console.log('Saved new page request. Current count:', result.value.requests);
      })
      .catch(error => console.error(error))

    parameter = `buttons.${req.body.buttons}`;
    updateAction = { $inc: { [parameter]: 1 } };
    submissionsCollection.findOneAndUpdate({"_id" : ObjectId("5ece2a1845ce3f056cdab66b")}, updateAction, updateOptions)
      .then(result => {
        console.log('Saved new page request. Current count:', result.value.requests);
      })
      .catch(error => console.error(error))

    parameter = `colourScheme.${req.body.colourScheme}`;
    updateAction = { $inc: { [parameter]: 1 } };
    submissionsCollection.findOneAndUpdate({"_id" : ObjectId("5ee0b8619cdebebbfd66d645")}, updateAction, updateOptions)
      .then(result => {
        console.log('Saved new page request. Current count:', result.value.requests);
      })
      .catch(error => console.error(error))

    parameter = `reviews.${req.body.reviews}`;
    updateAction = { $inc: { [parameter]: 1 } };
    submissionsCollection.findOneAndUpdate({"_id" : ObjectId("5ee0b8869cdebebbfd66d646")}, updateAction, updateOptions)
      .then(result => {
        console.log('Saved new page request. Current count:', result.value.requests);
      })
      .catch(error => console.error(error))

    parameter = `spacing.${req.body.spacing}`;
    updateAction = { $inc: { [parameter]: 1 } };
    submissionsCollection.findOneAndUpdate({"_id" : ObjectId("5ee0b8999cdebebbfd66d647")}, updateAction, updateOptions)
      .then(result => {
        console.log('Saved new page request. Current count:', result.value.requests);
      })
      .catch(error => console.error(error))

    parameter = `additionalFeatures.${req.body.additionalFeatures}`;
    updateAction = { $inc: { [parameter]: 1 } };
    submissionsCollection.findOneAndUpdate({"_id" : ObjectId("5ee0b8b69cdebebbfd66d648")}, updateAction, updateOptions)
      .then(result => {
        console.log('Saved new page request. Current count:', result.value.requests);
        client.close();
      })
      .catch(error => console.error(error))
    
  })
  .catch(error => console.error(error))

});

function mostFrequent(dbObject){
  const entries = Object.entries(dbObject);
  const temporaryHighestValStore = [];
  for (const entry of entries){
    if (temporaryHighestValStore !== undefined){}
    console.log(`The value in the array is ${temporaryHighestValStore}`);
    console.log(`This value is ${entry[1]}`);
    if (temporaryHighestValStore === undefined || temporaryHighestValStore.length == 0){
      temporaryHighestValStore.push(entry);
    } else if (entry[1] > temporaryHighestValStore[0][1]) {
      temporaryHighestValStore.splice(0, 1, entry)

    }
  }
  console.log(temporaryHighestValStore);
  console.log(`The highest value is ${temporaryHighestValStore[0][0]} and its value is ${temporaryHighestValStore[0][1]}`);
  return temporaryHighestValStore[0][0];
}

app.use(bodyParser.urlencoded({ extended: true }))
app.use('/.netlify/functions/app', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);
 