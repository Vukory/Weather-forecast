/** API key for OpenWeatherMap. */
const apiKey = '9dcd8991f9f548f9d28bc5cf37a80c4e';

/** Base URL to access API endpoints. */
const baseUrl = 'https://api.openweathermap.org/data/2.5';

/** The particular API endpoint we're interested in. */
const endpoint = '/forecast';

/** Whenever we want to make a request, just dash the query at the end of this. */
const requestTemplate = `${baseUrl}${endpoint}?appid=${apiKey}&units=metric&q=`;

/** The index of the items in the list of temperatures we actually want. */
const itemsOfInterest = [0, 8, 16, 24, 32, 39];


const liTemplate =
    `
  
    <p class="dt">{{dt}}</p>
    <img src="https://openweathermap.org/img/wn/{{icon}}@2x.png">
    <p class="humidity row">Vlažnost: {{humidity}} %</p>
    <p class="pressure row">Pritisak: {{pressure}} hPa</p>
    <p class="temp row">Temperatura: {{temp}} °C</p>
    <p class="temp-min row">Minimalna temperatura: {{temp_min}} °C</p>
    <p class="temp-max row">Maksimalna temperatura: {{temp_max}} °C</p>
  `;


function onRequest() {
    console.log("Put in a query.");
    const query = $("#search-query").val();
    const requestUrl = requestTemplate + query;


    $.get(requestUrl, function(data, textStatus, jqXhr) {
        console.log('Succesfully made request: ', data);
        const city = data.city;
        const country = city.county;

        if (country)
            $("#location").html(city.name + ", " + country);
        else
            $("#location").html(city.name);

        const ul = $("#weather-items");
        ul.html("");

        const today = $('#today');
        today.html(" ");

        for (let i = 0; i < itemsOfInterest.length; i++) {
            const item = data.list[itemsOfInterest[i]];
            const main = item.main;
            const weather = item.weather[0];
            let liItem = liTemplate;

            const dt = item.dt;
            const date = new Date(dt * 1000);
            liItem = liItem.replace('{{dt}}', date.toLocaleDateString('bs-BA'));


            for (const key in main)
                liItem = liItem.replace(`{{${key}}}`, main[key]);

            for (const key in weather)
                liItem = liItem.replace(`{{${key}}}`, weather[key]);
            if (i == 0)
                today.append(liItem);
            else
                ul.append("<li>" + liItem + "<li>");
        }
    });
}