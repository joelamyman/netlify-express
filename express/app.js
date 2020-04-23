const serverless = require('serverless-http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const router = express.Router();

router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.js!</h1>');
  res.end();
});
router.post('/', (req, res) => res.json({ postBody: req.body }));

app.use(bodyParser.json());
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