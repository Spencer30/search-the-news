const functions = require("firebase-functions");
const axios = require("axios")
const API = functions.config().api;

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.stockData = functions.https.onRequest((req, res) => {
  console.log('fired')
    try{
        console.log(req.query.date);
        axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${req.query.stock}&outputsize=compact&apikey=${API.stocks_key}`).then(response => {
          // console.log('data is:' + response.data['Time Series (Daily)'][`${req.query.date}`])
          const refreshDate = response.data["Meta Data"]["3. Last Refreshed"];
          // console.log(refreshDate)
          const lastUpdateDate = refreshDate === req.query && req.query.date ? req.query.date : refreshDate
          // console.log(response.data)
          res.set('Access-Control-Allow-Origin', '*').status(200).send(response.data['Time Series (Daily)'][`${refreshDate}`]);
        }).catch(err => {
          console.log(err)
          res.status(404).send(err)
        })
      } catch(err) {
        console.log(err)
        res.status(400).send(err)
    
    }

});

exports.weather = functions.https.onRequest((req, res) => {
    axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${req.query.lat}&lon=${req.query.lon}&APPID=${API.weather_key}`).then(response => {
        console.log(response.data, process.env.WEATHER_API_KEY)
        return res.set('Access-Control-Allow-Origin', '*').status(200).send(response.data);
      }).catch(err => {
        console.log(err)
        res.status(404).send(err)
      })
});


exports.news = functions.https.onRequest((req, res) => {
                console.log(API);
    axios.get(`https://newsapi.org/v2/everything?q=${req.query.q}&apiKey=${API.news_key}&pageSize=100`, {
    })
        .then(function (response) {

            res.set('Access-Control-Allow-Origin', '*').send(response.data);
        })
        .catch(function (error) {
            // console.log(error);
            // res.status(400).send(error)
        })
});