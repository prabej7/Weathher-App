const express = require('express');
const app = express();
const https = require('https');
const bodyParser = require('body-parser');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

let city = "Birgunj";

app.post("/",(req,res)=>{
    city = req.body.cityName;
    console.log(city);
    res.redirect("/");
});

app.get("/",(req,res)=>{
    
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid={API_KEY}&units=metric";
    const request = https.get(url,(response)=>{
        response.on("data",(data)=>{
            const waetherData = JSON.parse(data);
            res.render("index",{temperature: waetherData.main.temp,Dis:waetherData.weather[0].description,imgCode:'https://openweathermap.org/img/wn/' + waetherData.weather[0].icon +'@2x.png',city:city});

        });
    })

});



app.listen(3000,(req,res)=>{
    console.log("Server is running at port 3000");
});
