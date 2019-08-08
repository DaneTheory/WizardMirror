// Config Options
const weatherDiv = document.getElementById("pos-topRight");
const tempUnit = "C"; // C or F
const windSpeedUnit = "km/h"; // km/h or mi/h
const weatherApiKey = "fba8cef2c152d45d1cd464705864cb5f";
const cityId = "5391832"; // refer to city.list.json, to find your city ID

//Actual code
var weatherIcon = document.createElement("img");
var city, temp, humidity, temp_min, icon, temp_max, wind;


update();


function update() {
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?id=" + cityId + "&appid=" + weatherApiKey, function (data) {
        // console.dir(data);
        icon = data["weather"][0]["icon"];
        temp = kToUnit(data["main"]["temp"]);
        wind = mpsToUnit(data["wind"]["speed"]);
        humidity = data["main"]["humidity"];
        temp_max = kToUnit(data["main"]["temp_max"]);
        temp_min = kToUnit(data["main"]["temp_min"]);
        city = data["name"];

        weatherDiv.innerHTML = "";
        var iconHolder = document.createElement('div'); iconHolder.id = 'iconHolder';
        var iconPic = document.createElement('img'); 
        iconPic.height = 60; iconPic.src = "apps/currentWeather/"+icon+".png"; iconHolder.appendChild(iconPic);
        var tempTextHolder = document.createElement('div'); tempTextHolder.id = 'tempTextHolder';
        var tempText = document.createElement('h1'); 
        tempText.appendChild(document.createTextNode(temp)); tempTextHolder.appendChild(tempText);
        var unitHolder = document.createElement('div'); unitHolder.id = 'unitHolder';
        var unitText = document.createElement('h1'); 
        unitText.appendChild(document.createTextNode(String.fromCharCode(176)+tempUnit)); unitHolder.appendChild(unitText);
        var humidityHolder = document.createElement('div'); humidityHolder.id = 'humidityHolder';
        var humidityText = document.createElement('h1'); 
        humidityText.appendChild(document.createTextNode('Humidity: '+humidity+'%')); humidityHolder.appendChild(humidityText);
        var windHolder = document.createElement('div'); windHolder.id = 'windHolder';
        var windText = document.createElement('h1'); 
        windText.appendChild(document.createTextNode('Wind: '+wind + windSpeedUnit)); windHolder.appendChild(windText);

        weatherDiv.appendChild(iconHolder); weatherDiv.appendChild(tempTextHolder); weatherDiv.appendChild(unitHolder);
        weatherDiv.appendChild(humidityHolder); weatherDiv.appendChild(windHolder);
        
    });
    // display the results 

    setTimeout(arguments.callee, 1200000); // Loop every 20 minutes
}





function kToUnit(k) {
    return parseInt((tempUnit == "C" ? Math.round(k - 273.15) : (tempUnit == "F" ? Math.round(((k - 273.15) * 9 / 5) + 32) : 'Wrong Unit')));
}

function mpsToUnit(mps) {
    return parseInt(windSpeedUnit == "km/h"? Math.round(mps*3.6) : (windSpeedUnit == "mi/h"? Math.round(mps*2.237) : 'Wrong Unit'));
}