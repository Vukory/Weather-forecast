/** API key for OpenWeatherMap. */
const apiKey = '9dcd8991f9f548f9d28bc5cf37a80c4e';

/** Base URL to access API endpoints. */
const baseUrl = 'https://api.openweathermap.org/data/2.5';

/** The particular API endpoint we're interested in. */
const endpoint = '/forecast';

/** Whenever we want to make a request, just dash the query at the end of this. */
const requestTemplate = `${baseUrl}${endpoint}?appid=${apiKey}&q=`;

/** The index of the items in the list of temperatures we actually want. */
const itemsOfInterest = [0, 8, 16, 24, 32, 39];

const liTemplate =
    `
  <li>
    <p class="humidity">Humidity: {{humidity}}</p>
    <p class="pressure">Pressure: {{pressure}}</p>
    <p class="temp">Temperature: {{temp}}</p>
    <p class="temp-min">Minimum Temperature: {{temp_min}}</p>
    <p class="temp-max">Maximum Temperature: {{temp_max}}</p>
  </li>`;

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

        for (let i = 0; i < itemsOfInterest.length; i++) {
            const item = data.list[i];
            const main = item.main;
            let liItem = liTemplate;

            for (const key in main)
                liItem = liItem.replace(`{{${key}}}`, main[key]);

            ul.append(liItem);
        }
    });
}