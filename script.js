$(document).ready(() => {
    $(() => {
        var today = new Date();
        var day = today.getDate();
        var month = today.getMonth();
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var year = today.getFullYear();

        today = day + ' ' + months[month] + ' ' + year;
        $("#currentDate").text("Today, " + today);
    });
    let cities = [];
    $(".display").hide();
    $('#submitBtn').click(function(c) {
        c.preventDefault();
        var city = $('#inputCity').val(); //fetches the value of city
        if (city !== "") {
            $.ajax({
                type: 'GET',
                url: 'https://api.openweathermap.org/data/2.5/weather?' + city + '&appid=1b8a3ee8a0341c0b64756ef743026d5d',
                dataType: 'jsonp',
                success: function(data) {
                    $(".display").show();
                    cities.push(city);
                    $('#weather').empty().text(data.weather[0].description);
                    $("#city").empty().text(data.name);
                    $('#temperature').empty().text(data.main.temp + "°C");
                    $('#pressure').empty().append("Pressure: " + data.main.pressure + " hPa");
                    $('#humidity').empty().append("Humidity: " + data.main.humidity + " %");
                    $('#minTemp').empty().append("Min temperature: " + data.main.temp_min + "°C");
                    $('#maxTemp').empty().append("Max temperature: " + data.main.temp_max + "°C");
                    $('weatherIcon').attr('src', 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png');
                    $("#display").fadeIn("slow", function() {});
                }
            })
        } else $("#inputCity").attr("placeholder", "Molimo unesite ime grada")
    });
});