/* Set up Express server environment */

// Initialize Express
const express = require('express');
const app = express();
app.use(express.static('dist'));

// Initialize body parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Initialize cors
const cors = require('cors');
app.use(cors());

// Set up fetch
const fetch = require('node-fetch');

// Set up dotenv to securely access API keys
const dotenv = require('dotenv');
dotenv.config();

// Set up host server
const localHost = 8081;
const server = app.listen(localHost, () => {
    console.log(`Server running on localhost:${localHost}`);
});


/* INTERNAL client requests */

/* Define post request to get city results data */
app.post('/cities', (req, res) => {

    // Get request object
    const location = req.body;

    // Make external API call and send response
    getCitiesByCountry(location)
    .then(response => res.send(response));
});

app.post('/weather', (req, res) => {

    // Get request object
    const location = req.body;
    console.log(location);

    getWeatherForecast(location.lat, location.lon)
    .then(response => res.send(response));
});


/* EXTERNAL api requests */

/**
 * Get list of matches for city and country provided.
 * @param {*} req Location request with defined country value
 * @returns Array list of matching location objects with state/province
 */
async function getCitiesByCountry(req) {

    // Get url parameters we need
    const {city, countryAbbrev} = req;

    // Build url
    const url = `http://api.geonames.org/searchJSON?username=${process.env.API_KEY_GEONAMES}&type=json&maxRows=1000&name_equals=${encodeURI(city)}&country=${countryAbbrev}`;

    try {

        // Request raw data
        const response = await fetch(url, {
            method: 'GET',
        });

        // Convert raw data to JSON
        const locationData = await response.json();

        // Remove duplicates
        let statesFound = new Set();
        let filteredData = [];
        for (let location of locationData.geonames) {

            // Check if state has been seen yet
            // AND state isn't blank
            // AND city name matches (name may have matched elsewhere)
            const currentState = location.adminName1;
            if (!statesFound.has(currentState) 
                && location.adminName1 !== ''
                && city.toLowerCase() === location.name.toLowerCase()) {

                // Add to our lists
                statesFound.add(currentState);
                filteredData.push({
                    city: location.name,
                    state: location.adminName1,
                    country: location.countryName,
                    lat: location.lat,
                    lon: location.lng,
                });

            } // Else ignore
        }

        // Alphabetize results by state
        filteredData.sort((a,b) => {
            const stateA = a.state.toLowerCase();
            const stateB = b.state.toLowerCase();

            let comparison = 0;
            if (stateA > stateB) {
                comparison = 1;
            } else if (stateA < stateB) {
                comparison = -1;
            }

            return comparison;
        });
        
        return filteredData;

    } catch (error) {
        console.log(error);
    }
}

/**
 * Get 16-day weather forecast for specified latitude and longitude
 * @param {*} lat 
 * @param {*} lon 
 * @returns Forecast array including date, high and low temps, weather condition code and description
 */
async function getWeatherForecast(lat, lon) {

    // Build url
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.API_KEY_WEATHERBIT}&units=I&lat=${lat}&lon=${lon}`;

    try {

        // Request raw data
        const response = await fetch(url, {
            method: 'GET',
        });

        // Convert raw data to JSON
        const weatherData = await response.json();

        // Get just the parts we want for each day and add to forecast array
        let forecast = [];
        for (let day of weatherData.data) {

            const date = day.valid_date;
            const low = day.low_temp.toFixed(0);
            const high = day.high_temp.toFixed(0);
            const code = day.weather.code;
            const description = day.weather.description;

            const singleDayForecast = {date, low, high, code, description};

            forecast.push(singleDayForecast);
        }

        return forecast;

    } catch (error) {
        console.log(error);
    }
}