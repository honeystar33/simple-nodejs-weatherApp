const express = require('express');
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();
const app = express()

const apiKey = process.env.API_KEY;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
//set template engine
app.set('view engine', 'ejs')




//get /
  app.get('/', function (req, res) {
    res.render('index', {weather: null, error: null});
  })


///post
app.post('/',async (req, res)  => { 
    let city = req.body.city;
var currentUrl =`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
    var fiveDaysUrl =`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`

try{
var current = await axios.get(currentUrl);
var fiveDays = await axios.get(fiveDaysUrl);
  const date = new Date(fiveDays.data.list[0].dt)
  
  res.render('index', {weather:{current:current.data, fiveDays:fiveDays.data}, error:null})
  
}catch(err){
  if(err){
    res.render('index', {weather:null, error:`Error, ${err.message}`});
    console.log(err.message)
  }
}    
  })

  app.listen(PORT, function () {
    console.log('Example app listening on port 3000!')
  })
