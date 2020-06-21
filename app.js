const express = require('express');
const path = require('path');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config({path:'./.env'})
let port = process.env.PORT;

const app = express();
app.use(cors());

app.use(express.static(path.join(__dirname, './client/build')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build', 'index.html'));
});

app.get('/news',  (req, res) => {
    axios.get(`https://newsapi.org/v2/everything?q=${req.query.q}&apiKey=${process.env.API_KEY}&pageSize=100`, {
      })
      .then(function (response) {
        // console.log(response.data);
        res.send(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
})

app.get('/weather', (req, res) => {


})

app.get('/stockdata', (req, res) => {

})


if (port == null || port == "") {
  port = 9000;
}

app.listen(port, () => {
  console.log(`Server has started successfully on ${port}`);
});