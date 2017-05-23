// apiKey is included in config.js
// Ignoring file from git

$(document).ready(()=>{

    const weatherApi = 'http://api.openweathermap.org/data/2.5/weather';

    $('#weather-form').submit(function(event){
        event.preventDefault();
        // console.log('User submitted the form');
        var zipCode = $('#zip-code').val();
        // console.log(zipCode);
        // var weatherData = weatherApi + '?zip=' + zipCode + '&appid=' + apiKey;
        var weatherData = `${weatherApi}?zip=${zipCode}&units=imperial&appid=${apiKey}`;
        // console.log(weatherData);
        $.getJSON(weatherData, (weatherData)=>{
            console.log(weatherData);
            // var currTemp = weatherData.main.temp;
            var temps = {
                curr: weatherData.main.temp,
                max: weatherData.main.temp_max,
                min: weatherData.main.temp_min,
                hum: weatherData.main.humidity
            }
            var name = weatherData.name;
            var icon = weatherData.weather[0].icon + '.png';
            var desc = weatherData.weather[0].description;
            var newHTML = '<img src="http://openweathermap.org/img/w/'+icon+'">';

            newHTML += '<div>The temp in ' + name + ' is currently ' + temps.curr + '&deg;</div>';
            newHTML += '<div>High: ' + temps.max + '&deg;</div>';
            newHTML += '<div>Low: ' + temps.min + '&deg;</div>';
            newHTML += '<div>Humidity: ' + temps.hum + '&#37;</div>';

            $('#temp-info').html(newHTML);
            animateCircle(0,temps.curr);
        });
    });

    var canvas = $('#weather-canvas');
    var context = canvas[0].getContext('2d');
    var assumedTemperature = 65;
    var currentPercent = 0;

    function animateCircle(currentArc,currentTemp){

        // Draw inner circle
        context.fillStyle = "#ccc";
        context.beginPath();
        context.arc(255,195,165,Math.PI*0,Math.PI*2);
        context.fill();

        // Draw outter line
        // 5px wide line
        context.lineWidth = 20;
        context.strokeStyle = '#7B9FE9';
        context.beginPath();
        context.arc(255,195,175,Math.PI*1.5,(Math.PI*2*currentArc) + Math.PI*1.5);
        context.stroke();

        // Update the current percentage
        currentPercent++;
        if(currentPercent < currentTemp){
            requestAnimationFrame(function(){
                animateCircle(currentPercent/100, currentTemp);
            });
        }

        // // Draw in the temp number
        // context.stroke();
        // context.font = "48px Myriad Pro";
        // context.fillStyle = "Blue";
        // context.textBaseline = "top";
        // context.fillText(temps.curr,255,195);
    }
    animateCircle();
});