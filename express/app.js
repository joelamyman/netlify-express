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

router.get('/results/show/*', (req, res) => {
  MongoClient.connect(uri, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    console.log('request body is:')
    const db = client.db('test-data')
    const submissionsCollection = db.collection('submissions');
    var query = {
      "_id" : {"$in":[ObjectId("5ebea76b69c5ed197b666bde"), ObjectId("5ebeb3b9eb8fc5d083afa5cd"), ObjectId("5ebeb4eeeb8fc5d083afa5ce"), ObjectId("5ece296b45ce3f056cdab669"), ObjectId("5ece2a1845ce3f056cdab66b"), ObjectId("5eda7b5d5f39ff02b0fdf877")]}
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
      const colourSchemeData = dataString.find(x => x._id === '5eda7b5d5f39ff02b0fdf877').colourScheme;
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

      let thisAddress = req.protocol + '://' + 'eloquent-brown-615c35.netlify.app' + req.originalUrl;
      thisAddress = thisAddress.replace("show", "share");

      const id = req.query.id.replace(/['"]+/g, '');

      let textImageVariable = '';
      let additionalInfoVariable = '';
      let productOptionsVariable = '';
      let imagePosVariable = '';
      let buttonsVariable = '';

      switch (req.query.textSize.replace(/['"]+/g, '')){
        case "c-shopDisplay__bodyText--size-small":
          textImageVariable = "textsize-small";
          break;
        case "c-shopDisplay__bodyText--size-medium":
          textImageVariable = "textsize-medium";
          break;
        case "c-shopDisplay__bodyText--size-large":
          textImageVariable = "textsize-large";
          break;
        case "c-shopDisplay__bodyText--size-xlarge":
          textImageVariable = "textsize-xlarge";
      }

      switch (req.query.infoAmount.replace(/['"]+/g, '')){
        case "c-shopDisplay__additionalInfo--text":
          additionalInfoVariable = "infoAmount-texty";
          break;
        case "c-shopDisplay__additionalInfo--bullets":
          additionalInfoVariable = "infoAmount-bullets";
          break;
        case "c-shopDisplay__additionalInfo--mixed":
          additionalInfoVariable = "infoAmount-mix";
          break;
        case "c-shopDisplay__additionalInfo--details":
          additionalInfoVariable = "infoAmount-details";
      }

      switch (req.query.productOptions.replace(/['"]+/g, '')){
        case "c-shopDisplay__productOptions--select":
          productOptionsVariable = "productOptions-select";
          break;
        case "c-shopDisplay__productOptions--listOfCards":
          productOptionsVariable = "productOptions-cards";
          break;
        case "c-shopDisplay__productOptions--radios":
          productOptionsVariable = "productOptions-bullets";
          break;
        case "c-shopDisplay__productOptions--rowOfCards":
          productOptionsVariable = "productOptions-grid";
      }

      switch (req.query.imagePos.replace(/['"]+/g, '')){
        case "c-shopDisplay__imagePos--right":
          imagePosVariable = "imagePos-right";
          break;
        case "c-shopDisplay__imagePos--left":
          imagePosVariable = "imagePos-left";
          break;
        case "c-shopDisplay__imagePos--bottom":
          imagePosVariable = "imagePos-bottom";
          break;
        case "c-shopDisplay__imagePos--top":
          imagePosVariable = "imagePos-top";
      }

      switch (req.query.buttons.replace(/['"]+/g, '')){
        case "c-shopDisplay__buttons--top":
          buttonsVariable = "buttons-top";
          break;
        case "c-shopDisplay__buttons--middle":
          buttonsVariable = "buttons-middle";
          break;
        case "c-shopDisplay__buttons--bottom":
          buttonsVariable = "buttons-bottom";
      }

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
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content="I just made the perfect shopping UI!" />
          <meta name="twitter:description" content="Sorry, there's no way you can beat this." />
          <meta name="twitter:image" content="https://eloquent-brown-615c35.netlify.app/imgs/meta-images/image-${textImageVariable}-${additionalInfoVariable}-${productOptionsVariable}.png" />
          <link rel="stylesheet" href="https://eloquent-brown-615c35.netlify.app/main.css">
        </head>
        
        <body>
          <h1>Here is what you've made!</h1>
          <p>Your custom ID is: ${id}</p>
          <label class="c-share__label" id="share">Share your results!</label>
          <input class="c-share__input" type="text" for="share" value="${thisAddress}">
          <div class="c-analyseSites">
            <section class="c-analyseSites__site">
              <a id="liveSite"></a>
              <p class="o-bwText h-maxContent h-mt--0">Here's the site you created:</p>
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
                  <div class="c-shopNav">
                    <p class="c-shopNav__title">very good shop (patent pending)</p>
                    <p class="c-shopNav__menu">Menu</p>
                  </div>
                  <div class="c-shopDisplay">
                    <!-- QUESTION 1 -->
                    <div class="c-shopDisplay__bodyText ${req.query.textSize.replace(/['"]+/g, '')}">
                      <div class="c-shopDisplay__buttons ${req.query.buttons.replace(/['"]+/g, '')}">
                        <h1 class="c-shopDisplay__heading">Blessed bog roll</h1>
                        <div data-button="c-shopDisplay__buttons--top">
                          <button class="o-shopButton">Add to basket</button>
                        </div>
                        <p class="c-shopDisplay__paragraph">This is the most important product you will ever buy. Its
                          importance
                          cannot be described by words.
                          Doesn't
                          that sound important!</p>
                        <div class="c-shopDisplay__buttons" data-button="c-shopDisplay__buttons--middle">
                          <button class="o-shopButton">Add to basket</button>
                        </div>
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
                            <label class="o-label">Please select a package size:</label>
                            <select class="c-shopDisplay__productOptions--select-font">
                              <option>Small</option>
                              <option>Medium</option>
                              <option>Large</option>
                              <option>Extra large</option>
                            </select>
                          </div>
                          <fieldset class="c-shopDisplay__productOptions--listOfCards o-fieldset u-hidden">
                            <legend class="o-label">Please select a package size:</legend>
                            <div class="c-shopDisplay__productOptions--listOfCards-grid">
                              <div class="form-questionHolder-inputStack form-questionHolder-inputStack--listOfCards">
                                <input type="radio" id="productOptions--listOfCards-small" name="productOptions">
                                <label class="u-semibold u-halfPadding c-listOfCards__label"
                                  for="productOptions--listOfCards-small">
                                  <img class="c-listOfCards__img" src="https://eloquent-brown-615c35.netlify.app/imgs/smallOrder.svg"><span>Small</span></label>
                              </div>
                              <div class="form-questionHolder-inputStack form-questionHolder-inputStack--listOfCards">
                                <input type="radio" id="productOptions--listOfCards-medium" name="productOptions">
                                <label class="u-semibold u-halfPadding c-listOfCards__label"
                                  for="productOptions--listOfCards-medium">
                                  <img class="c-listOfCards__img" src="https://eloquent-brown-615c35.netlify.app/imgs/mediumOrder.svg"><span>Medium</span>
                                </label>
                              </div>
                              <div class="form-questionHolder-inputStack form-questionHolder-inputStack--listOfCards">
                                <input type="radio" id="productOptions--listOfCards-large" name="productOptions">
                                <label class="u-semibold u-halfPadding c-listOfCards__label"
                                  for="productOptions--listOfCards-large">
                                  <img class="c-listOfCards__img" src="https://eloquent-brown-615c35.netlify.app/imgs/largeOrder.svg"><span>Large</span>
                                </label>
                              </div>
                              <div class="form-questionHolder-inputStack form-questionHolder-inputStack--listOfCards">
                                <input type="radio" id="productOptions--listOfCards-xlarge" name="productOptions">
                                <label class="u-semibold u-halfPadding c-listOfCards__label"
                                  for="productOptions--listOfCards-xlarge">
                                  <img class="c-listOfCards__img" src="https://eloquent-brown-615c35.netlify.app/imgs/xlargeOrder.svg"><span>Extra large</span>
                                </label>
                              </div>
                            </div>
                          </fieldset>
                          <fieldset class="c-shopDisplay__productOptions--radios o-fieldset u-hidden">
                            <legend class="o-label">Please select a package size:</legend>
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
                            <legend class="o-label">Please select a package size:</legend>
                            <div class="c-shopDisplay__productOptions--rowOfCards-grid">
                              <div class="form-questionHolder-inputStack form-questionHolder-inputStack--rowOfCards">
                                <input type="radio" id="productOptions--rowOfCards-small" name="productOptions">
                                <label class="u-semibold u-halfPadding c-rowOfCards__label"
                                  for="productOptions--rowOfCards-small">
                                  <img class="c-rowOfCards__img" src="https://eloquent-brown-615c35.netlify.app/imgs/smallOrder.svg"><span>Small</span>
                                </label>
                              </div>
                              <div class="form-questionHolder-inputStack form-questionHolder-inputStack--rowOfCards">
                                <input type="radio" id="productOptions--rowOfCards-medium" name="productOptions">
                                <label class="u-semibold u-halfPadding c-rowOfCards__label"
                                  for="productOptions--rowOfCards-medium">
                                  <img class="c-rowOfCards__img" src="https://eloquent-brown-615c35.netlify.app/imgs/mediumOrder.svg"><span>Medium</span>
                                </label>
                              </div>
                              <div class="form-questionHolder-inputStack form-questionHolder-inputStack--rowOfCards">
                                <input type="radio" id="productOptions--rowOfCards-large" name="productOptions">
                                <label class="u-semibold u-halfPadding c-rowOfCards__label"
                                  for="productOptions--rowOfCards-large">
                                  <img class="c-rowOfCards__img" src="https://eloquent-brown-615c35.netlify.app/imgs/largeOrder.svg"><span>Large</span>
                                </label>
                              </div>
                              <div class="form-questionHolder-inputStack form-questionHolder-inputStack--rowOfCards">
                                <input type="radio" id="productOptions--rowOfCards-xlarge" name="productOptions">
                                <label class="u-semibold u-halfPadding c-rowOfCards__label"
                                  for="productOptions--rowOfCards-xlarge">
                                  <img class="c-rowOfCards__img" src="https://eloquent-brown-615c35.netlify.app/imgs/xlargeOrder.svg"><span>Extra large</span>
                                </label>
                              </div>
                            </div>
                          </fieldset>
                        </div>
                        <div class="c-shopDisplay__buttons" data-button="c-shopDisplay__buttons--bottom">
                          <button class="o-shopButton">Add to basket</button>
                        </div>
                      </div>
                    </div>
                    <!-- QUESTION 5 -->
                    <div class="c-shopDisplay__imagePos ${req.query.imagePos.replace(/['"]+/g, '')}">
                      <img class="c-shopDisplay__image" src="https://eloquent-brown-615c35.netlify.app/imgs/toiletRoll.svg">
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

            <section class="c-analyseSites__site">
              <a id="liveSite"></a>
              <p class="o-bwText h-maxContent h-mt--0">Here's the most popular site so far:</p>
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
                  <div class="c-shopNav">
                    <p class="c-shopNav__title">very good shop (patent pending)</p>
                    <p class="c-shopNav__menu">Menu</p>
                  </div>
                  <div class="c-shopDisplay">
                    <!-- QUESTION 1 -->
                    <div class="c-shopDisplay__bodyText ${mostFrequent(textSizesData)}">
                      <div class="c-shopDisplay__buttons ${mostFrequent(buttonsData)}">
                        <h1 class="c-shopDisplay__heading">Blessed bog roll</h1>
                        <div data-button="c-shopDisplay__buttons--top">
                          <button class="o-shopButton">Add to basket</button>
                        </div>
                        <p class="c-shopDisplay__paragraph">This is the most important product you will ever buy. Its
                          importance
                          cannot be described by words.
                          Doesn't
                          that sound important!</p>
                        <div class="c-shopDisplay__buttons" data-button="c-shopDisplay__buttons--middle">
                          <button class="o-shopButton">Add to basket</button>
                        </div>
                        <!-- QUESTION 2 -->
                        <div class="c-shopDisplay__additionalInfo ${mostFrequent(additionalInfoData)}">
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
                        <div class="c-shopDisplay__productOptions ${mostFrequent(productOptionsData)}">
                          <div class="c-shopDisplay__productOptions--select u-hidden">
                            <label class="o-label">Please select a package size:</label>
                            <select class="c-shopDisplay__productOptions--select-font">
                              <option>Small</option>
                              <option>Medium</option>
                              <option>Large</option>
                              <option>Extra large</option>
                            </select>
                          </div>
                          <fieldset class="c-shopDisplay__productOptions--listOfCards o-fieldset u-hidden">
                            <legend class="o-label">Please select a package size:</legend>
                            <div class="c-shopDisplay__productOptions--listOfCards-grid">
                              <div class="form-questionHolder-inputStack form-questionHolder-inputStack--listOfCards">
                                <input type="radio" id="productOptions--listOfCards-small" name="productOptions">
                                <label class="u-semibold u-halfPadding c-listOfCards__label"
                                  for="productOptions--listOfCards-small">
                                  <img class="c-listOfCards__img" src="https://eloquent-brown-615c35.netlify.app/imgs/smallOrder.svg"><span>Small</span></label>
                              </div>
                              <div class="form-questionHolder-inputStack form-questionHolder-inputStack--listOfCards">
                                <input type="radio" id="productOptions--listOfCards-medium" name="productOptions">
                                <label class="u-semibold u-halfPadding c-listOfCards__label"
                                  for="productOptions--listOfCards-medium">
                                  <img class="c-listOfCards__img" src="https://eloquent-brown-615c35.netlify.app/imgs/mediumOrder.svg"><span>Medium</span>
                                </label>
                              </div>
                              <div class="form-questionHolder-inputStack form-questionHolder-inputStack--listOfCards">
                                <input type="radio" id="productOptions--listOfCards-large" name="productOptions">
                                <label class="u-semibold u-halfPadding c-listOfCards__label"
                                  for="productOptions--listOfCards-large">
                                  <img class="c-listOfCards__img" src="https://eloquent-brown-615c35.netlify.app/imgs/largeOrder.svg"><span>Large</span>
                                </label>
                              </div>
                              <div class="form-questionHolder-inputStack form-questionHolder-inputStack--listOfCards">
                                <input type="radio" id="productOptions--listOfCards-xlarge" name="productOptions">
                                <label class="u-semibold u-halfPadding c-listOfCards__label"
                                  for="productOptions--listOfCards-xlarge">
                                  <img class="c-listOfCards__img" src="https://eloquent-brown-615c35.netlify.app/imgs/xlargeOrder.svg"><span>Extra large</span>
                                </label>
                              </div>
                            </div>
                          </fieldset>
                          <fieldset class="c-shopDisplay__productOptions--radios o-fieldset u-hidden">
                            <legend class="o-label">Please select a package size:</legend>
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
                            <legend class="o-label">Please select a package size:</legend>
                            <div class="c-shopDisplay__productOptions--rowOfCards-grid">
                              <div class="form-questionHolder-inputStack form-questionHolder-inputStack--rowOfCards">
                                <input type="radio" id="productOptions--rowOfCards-small" name="productOptions">
                                <label class="u-semibold u-halfPadding c-rowOfCards__label"
                                  for="productOptions--rowOfCards-small">
                                  <img class="c-rowOfCards__img" src="https://eloquent-brown-615c35.netlify.app/imgs/smallOrder.svg"><span>Small</span>
                                </label>
                              </div>
                              <div class="form-questionHolder-inputStack form-questionHolder-inputStack--rowOfCards">
                                <input type="radio" id="productOptions--rowOfCards-medium" name="productOptions">
                                <label class="u-semibold u-halfPadding c-rowOfCards__label"
                                  for="productOptions--rowOfCards-medium">
                                  <img class="c-rowOfCards__img" src="https://eloquent-brown-615c35.netlify.app/imgs/mediumOrder.svg"><span>Medium</span>
                                </label>
                              </div>
                              <div class="form-questionHolder-inputStack form-questionHolder-inputStack--rowOfCards">
                                <input type="radio" id="productOptions--rowOfCards-large" name="productOptions">
                                <label class="u-semibold u-halfPadding c-rowOfCards__label"
                                  for="productOptions--rowOfCards-large">
                                  <img class="c-rowOfCards__img" src="https://eloquent-brown-615c35.netlify.app/imgs/largeOrder.svg"><span>Large</span>
                                </label>
                              </div>
                              <div class="form-questionHolder-inputStack form-questionHolder-inputStack--rowOfCards">
                                <input type="radio" id="productOptions--rowOfCards-xlarge" name="productOptions">
                                <label class="u-semibold u-halfPadding c-rowOfCards__label"
                                  for="productOptions--rowOfCards-xlarge">
                                  <img class="c-rowOfCards__img" src="https://eloquent-brown-615c35.netlify.app/imgs/xlargeOrder.svg"><span>Extra large</span>
                                </label>
                              </div>
                            </div>
                          </fieldset>
                        </div>
                        <div class="c-shopDisplay__buttons" data-button="c-shopDisplay__buttons--bottom">
                          <button class="o-shopButton">Add to basket</button>
                        </div>
                      </div>
                    </div>
                    <!-- QUESTION 5 -->
                    <div class="c-shopDisplay__imagePos ${mostFrequent(imagePosData)}">
                      <img class="c-shopDisplay__image" src="https://eloquent-brown-615c35.netlify.app/imgs/toiletRoll.svg">
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
          </div>
          <p></p>

          <script>
            window.onload = function(){
              console.log(window.location.href);
              let stateObj = {
                foo: "bar",
              }
              let windowUrl = window.location.href;
              windowUrl = windowUrl.replace("show", "share");
              console.log(windowUrl);
              history.replaceState(null, null, windowUrl);
            }
          </script>
        </body>
      `);
      res.end();
    });
  })
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
        res.redirect(`/complete/?id="${randomId}"`)
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

    parameter = `imagePos.${req.body.imagePos}`;
    updateAction = { $inc: { [parameter]: 1 } };
    submissionsCollection.findOneAndUpdate({"_id" : ObjectId("5ece296b45ce3f056cdab669")}, updateAction, updateOptions)
      .then(result => {
        console.log('Saved new page request. Current count:', result.value.requests);
        client.close();
      })
      .catch(error => console.error(error))

    parameter = `buttons.${req.body.buttons}`;
    updateAction = { $inc: { [parameter]: 1 } };
    submissionsCollection.findOneAndUpdate({"_id" : ObjectId("5ece2a1845ce3f056cdab66b")}, updateAction, updateOptions)
      .then(result => {
        console.log('Saved new page request. Current count:', result.value.requests);
        client.close();
      })
      .catch(error => console.error(error))

    parameter = `colourScheme.${req.body.colourScheme}`;
    updateAction = { $inc: { [parameter]: 1 } };
    submissionsCollection.findOneAndUpdate({"_id" : ObjectId("5ee0b8619cdebebbfd66d645")}, updateAction, updateOptions)
      .then(result => {
        console.log('Saved new page request. Current count:', result.value.requests);
        client.close();
      })
      .catch(error => console.error(error))

    parameter = `reviews.${req.body.reviews}`;
    updateAction = { $inc: { [parameter]: 1 } };
    submissionsCollection.findOneAndUpdate({"_id" : ObjectId("5ee0b8869cdebebbfd66d646")}, updateAction, updateOptions)
      .then(result => {
        console.log('Saved new page request. Current count:', result.value.requests);
        client.close();
      })
      .catch(error => console.error(error))

    parameter = `spacing.${req.body.spacing}`;
    updateAction = { $inc: { [parameter]: 1 } };
    submissionsCollection.findOneAndUpdate({"_id" : ObjectId("5ee0b8999cdebebbfd66d647")}, updateAction, updateOptions)
      .then(result => {
        console.log('Saved new page request. Current count:', result.value.requests);
        client.close();
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

function mostPopular(dbObject){
  console.log(dbObject);
  let mostFrequent = [];
  console.log(dbObject[0].textsize);
  const entries = Object.entries(dbObject[0].textsize);
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
  mostFrequent.push(temporaryHighestValStore);
  return temporaryHighestValStore[0][1];
}

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
 