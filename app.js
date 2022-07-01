const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const { write } = require("fs");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.get("/",function(req, res){
    res.sendFile(__dirname + "/index.html")
})
app.post("/",function(req,res){
    const apiKey = "68409623d4c93836b3c176d20529fb3a"
    const city = req.body.cityName
    const url ="https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + apiKey
    
    https.get(url, function(response){
        response.on("data", function(data){

            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const description = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const img =  "https://openweathermap.org/img/wn/" + icon + ".png"
            const name = req.body.yourName
            res.write("<h1> hey " +name+" weather in " + city + " is " + temp + " degree celcius</h1>")
            res.write("<p>The description is " + description + "<\p>")
            res.write("<img src=" + img + ">")
            console.log(name);
            res.send()
        })
    })
})
app.get()
app.listen(3000,function(){
    console.log("server is running on port 3000")
})