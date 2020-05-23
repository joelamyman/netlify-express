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
  MongoClient.connect(uri, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    console.log('request body is:')
    const db = client.db('test-data')
    const submissionsCollection = db.collection('submissions');
    var query = {
      "_id" : {"$in":[ObjectId("5ebea76b69c5ed197b666bde"), ObjectId("5ebeb3b9eb8fc5d083afa5cd")]}
    };
    submissionsCollection.find(query).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      client.close();
      // const entries = Object.entries(receivedData[0].textsize);
      // const temporaryHighestValStore = [];
      // for (const entry of entries){
      //   if (temporaryHighestValStore !== undefined){}
      //   console.log(`The value in the array is ${temporaryHighestValStore}`);
      //   console.log(`This value is ${entry[1]}`);
      //   if (temporaryHighestValStore === undefined || temporaryHighestValStore.length == 0){
      //     temporaryHighestValStore.push(entry);
      //   } else if (entry[1] > temporaryHighestValStore[0][1]) {
      //     temporaryHighestValStore.splice(0, 1, entry)

      //   }
      // }

      res.set({
        'Content-Type': 'text/html'
      })
      // res.send(`<h1>Here is what you made!</h1><p>Text size' + req.query.textSize + ' Info amount ' + req.query.infoAmount + '</p><script>window.onload = function(){console.log("loaded")}</script>`);
      res.send(`
        <!DOCTYPE html>
        <html lang="en">
        
        <head>
          <meta charset="utf-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <title>Test Page</title>
          <meta name="description" content="Warning this is a work in progress">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <link rel="stylesheet" href="https://eloquent-brown-615c35.netlify.app/main.css">
        </head>
        
        <body>
          <h1>Here is what you've made!</h1>
          <p>Text size: ${req.query.textSize}</p>
          <section>
            <a id="liveSite"></a>
            <p>Here's your site so far!</p>
            <div id="site-in-progress">
              <div class="c-browser">
                <div class="c-shopDisplay__browserNav">
                  <div class="c-shopDisplay__buttonHolder">
                    <span class="o-circle c-shopDisplay__button c-shopDisplay__button--colour-red"></span>
                    <span class="o-circle c-shopDisplay__button c-shopDisplay__button--colour-yellow"></span>
                    <span class="o-circle c-shopDisplay__button c-shopDisplay__button--colour-green"></span>
                  </div>
                  <p class="c-shopDisplay__addressBar">https://www.mycoolshop.com</p>
                  <div class="c-shopDisplay__iconHolder">
                    <svg class="c-shopDisplay__userIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 137">
                      <path d="M0 120c0-27.614 22.386-50 50-50s50 22.386 50 50v17H0v-17z" fill="#C4C4C4" />
                      <circle cx="50" cy="38" r="38" fill="#C4C4C4" />
                    </svg>
                  </div>
                </div>
                <div class="c-shopDisplay">
                  <!-- QUESTION 1 -->
                  <div class="c-shopDisplay__bodyText ${req.query.textSize.replace(/['"]+/g, '')}">
                    <h1 class="c-shopDisplay__heading">Very important product</h1>
                    <p class="c-shopDisplay__paragraph">This is the most important product you will ever buy. It's importance
                      cannot be described by words.
                      Doesn't
                      that sound important!</p>
                    <!-- QUESTION 2 -->
                    <div class="c-shopDisplay__additionalInfo ${req.query.infoAmount.replace(/['"]+/g, '')}">
                      <h2 class="c-shopDisplay__heading2">Additional Information</h2>
                      <p class="c-shopDisplay__additionalInfo--text u-hidden">Lots of important text that you should
                        definitely be
                        reading
                        because all of it is important. Make
                        sure
                        that you carefully make a point to understand each detail and cross reference the facts. This is all
                        very important text that you will be quizzed on during your purchase. The person who makes this
                        product
                        is called Jane, you'll be expected to know Jane's sister's name at checkout. Don't forget the number
                        382, that may be important later.</p>
                      <ul class="c-shopDisplay__additionalInfo--bullets u-hidden">
                        <li>Very cool, as per usual.</li>
                        <li>Very trendy, super trendy.</li>
                        <li>Everyone will be jealous.</li>
                        <li>The postal staff may try to steal it as a result.</li>
                        <li>We may not even ship these, I think we'd rather keep them to ourselves.</li>
                      </ul>
                      <div class="c-shopDisplay__additionalInfo--mixed u-hidden">
                        <p>Lots of important text that you should definitely be
                          reading
                          because all of it is important. Make
                          sure
                          that you carefully make a point to understand each detail and cross reference the facts.</p>
                        <ul>
                          <li>Very cool, as per usual.</li>
                          <li>Very trendy, super trendy.</li>
                          <li>Everyone will be jealous.</li>
                        </ul>
                      </div>
                      <details class="c-shopDisplay__additionalInfo--details u-hidden">
                        <summary>View more information</summary>
                        <p>Discount code: NUMBER1F4N</p>
                        <p>That's right, we hid a discount code in here! Why? Because we didn't think anyone would look in
                          here and we also didn't want to be accused of not giving back to our customers. Try accuse of it
                          now!</p>
                      </details>
                    </div>
                    <!-- QUESTION 3 -->
                    <div class="c-shopDisplay__productOptions ${req.query.productOptions.replace(/['"]+/g, '')}">
                      <div class="c-shopDisplay__productOptions--select u-hidden">
                        <label class="o-label">Please select a size:</label>
                        <select class="c-shopDisplay__productOptions--select-font">
                          <option>Small</option>
                          <option>Medium</option>
                          <option>Large</option>
                          <option>Extra large</option>
                        </select>
                      </div>
                      <fieldset class="c-shopDisplay__productOptions--listOfCards o-fieldset u-hidden">
                        <legend class="o-label">Please select a size:</legend>
                        <div class="c-shopDisplay__productOptions--listOfCards-grid">
                          <div class="form-questionHolder-inputStack form-questionHolder-inputStack--listOfCards">
                            <input type="radio" id="productOptions--listOfCards-small" name="productOptions">
                            <label class="u-semibold u-halfPadding" for="productOptions--listOfCards-small">Small</label>
                          </div>
                          <div class="form-questionHolder-inputStack form-questionHolder-inputStack--listOfCards">
                            <input type="radio" id="productOptions--listOfCards-medium" name="productOptions">
                            <label class="u-semibold u-halfPadding" for="productOptions--listOfCards-medium">Medium</label>
                          </div>
                          <div class="form-questionHolder-inputStack form-questionHolder-inputStack--listOfCards">
                            <input type="radio" id="productOptions--listOfCards-large" name="productOptions">
                            <label class="u-semibold u-halfPadding" for="productOptions--listOfCards-large">Large</label>
                          </div>
                          <div class="form-questionHolder-inputStack form-questionHolder-inputStack--listOfCards">
                            <input type="radio" id="productOptions--listOfCards-xlarge" name="productOptions">
                            <label class="u-semibold u-halfPadding" for="productOptions--listOfCards-xlarge">Extra
                              large</label>
                          </div>
                        </div>
                      </fieldset>
                      <fieldset class="c-shopDisplay__productOptions--radios o-fieldset u-hidden">
                        <legend class="o-label">Please select a size:</legend>
                        <div class="c-shopDisplay__productOptions--radios-grid">
                          <div class="">
                            <input type="radio" id="productOptions--radios-small" name="productOptions">
                            <label for="productOptions--radios-small">Small</label>
                          </div>
                          <div class="">
                            <input type="radio" id="productOptions--radios-medium" name="productOptions">
                            <label for="productOptions--radios-medium">Medium</label>
                          </div>
                          <div class="">
                            <input type="radio" id="productOptions--radios-large" name="productOptions">
                            <label for="productOptions--radios-large">Large</label>
                          </div>
                          <div class="">
                            <input type="radio" id="productOptions--radios-xlarge" name="productOptions">
                            <label for="productOptions--radios-xlarge">Extra large</label>
                          </div>
                        </div>
                      </fieldset>
                      <fieldset class="c-shopDisplay__productOptions--rowOfCards o-fieldset u-hidden">
                        <legend class="o-label">Please select a size:</legend>
                        <div class="c-shopDisplay__productOptions--rowOfCards-grid">
                          <div class="form-questionHolder-inputStack form-questionHolder-inputStack--rowOfCards">
                            <input type="radio" id="productOptions--rowOfCards-small" name="productOptions">
                            <label class="u-semibold u-halfPadding" for="productOptions--rowOfCards-small">Small</label>
                          </div>
                          <div class="form-questionHolder-inputStack form-questionHolder-inputStack--rowOfCards">
                            <input type="radio" id="productOptions--rowOfCards-medium" name="productOptions">
                            <label class="u-semibold u-halfPadding" for="productOptions--rowOfCards-medium">Medium</label>
                          </div>
                          <div class="form-questionHolder-inputStack form-questionHolder-inputStack--rowOfCards">
                            <input type="radio" id="productOptions--rowOfCards-large" name="productOptions">
                            <label class="u-semibold u-halfPadding" for="productOptions--rowOfCards-large">Large</label>
                          </div>
                          <div class="form-questionHolder-inputStack form-questionHolder-inputStack--rowOfCards">
                            <input type="radio" id="productOptions--rowOfCards-xlarge" name="productOptions">
                            <label class="u-semibold u-halfPadding" for="productOptions--rowOfCards-xlarge">Extra
                              large</label>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                  </div>
                  <!-- QUESTION 5 -->
                  <div style="display: none;" class="c-shopDisplay__image">
                    <img src="https://source.unsplash.com/random/120x120">
                  </div>
                  <!-- QUESTION 6 -->
                  <div style="display: none;" class="c-shopDisplay__buyButton">
                    <button>Buy now!</button>
                  </div>
                </div>
              </div>
            </div>
            <a class="h-skipLink" href="#questions">Back to questions</a>
          </section>

        </body>
      `);
      res.end();
      res.send(JSON.stringify(result))
    });
  })
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
