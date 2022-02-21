const express = require('express');
const path = require('path');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config({ path: './.env' })
let port = process.env.PORT;

const app = express();
app.use(cors());

app.use(express.static(path.join(__dirname, './client/build')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build', 'index.html'));
});

app.get('/news', (req, res) => {
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
  // console.log(req.query)
  axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${req.query.lat}&lon=${req.query.lon}&APPID=${process.env.WEATHER_API_KEY}`).then(response => {
    // console.log(response.data, process.env.WEATHER_API_KEY)
    return res.status(200).send(response.data);
  }).catch(err => {
    console.log(err)
  })
})

app.get('/stockdata', (req, res) => {
    try{
    console.log(req.query.date);
    axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${req.query.stock}&outputsize=compact&apikey=${process.env.STOCK_API}`).then(response => {
      // console.log('data is:' + response.data['Time Series (Daily)'][`${req.query.date}`])
      const refreshDate = response.data["Meta Data"]["3. Last Refreshed"];
      // console.log(refreshDate)
      const lastUpdateDate = refreshDate === req.query && req.query.date ? req.query.date : refreshDate
      // console.log(response.data)
      res.status(200).send(response.data['Time Series (Daily)'][`${refreshDate}`]);
    }).catch(err => {
      console.log(err)
      res.status(404).send(err)
    })
  } catch(err) {
    console.log(err)
    res.status(400).send(err)

}
})


if (port == null || port == "") {
    port = 9000;
}

app.listen(port, () => {
    console.log(`Server has started successfully on ${port}`);
});