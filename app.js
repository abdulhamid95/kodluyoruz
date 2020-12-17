const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res){

    res.sendFile(__dirname + "/index.html");


    // res.send("The server is working");
});
app.post("/", function(req, res){
    const CitynName  = req.body.CityName
    console.log(CitynName);
    const units = "metric"

    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + CitynName + "&appid=6d20b9586036a25fbd48a12086ec1cee&units=" + units
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon

            const imageURL = "https://openweathermap.org/img/wn/" + icon +"@2x.png"
            res.write("<h1>The weather curentlly is " + weatherDescription + ".</h1>")
            res.write("<h1>The temprutare in " + CitynName +" is " + temp + " Ciluciess degree</h1>")
            res.write("<img src=" + imageURL + ">")
            res.send()

        })


    })
})

app.listen(3000, function(){
    console.log("The server working in 3000 localhost");
});