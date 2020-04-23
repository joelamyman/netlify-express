const serverless = require('serverless-http');
const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get('.netlify/functions/app/api/info', (req, res) => {
  res.send({ application: 'sample-app', version: '1' });
});
app.post('.netlify/functions/app/api/v1/getback', (req, res) => {
  res.send({ ...req.body });
});
//app.listen(3000, () => console.log(`Listening on: 3000`));
module.exports.handler = serverless(app);