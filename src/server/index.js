/* Initialize blank data holder where we will store our entries */
let appData = [];

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
const server = app.listen(process.env.PORT, () => {
    console.log(`Server running on localhost:${process.env.PORT}`);
});


/* INTERNAL client requests */

/* Define post request to get city results data */
app.post('/cities', (req, res) => {

    // Get request object
    const location = req.body;

    // Make external API call and send response
    getCitiesByCountry(location)
    .then(response => res.send(response))
    .catch(error => res.send(error));
});

/* Define post request to get weather forecast data */
app.post('/weather', (req, res) => {

    // Get request object
    const location = req.body;

    getWeatherForecast(location.lat, location.lon)
    .then(response => res.send(response))
    .catch(error => res.send(error));
});

/* Define post request to get image data */
app.post('/image', (req, res) => {

    // Get request object
    const location = req.body;
    const {city, state, country} = location;

    // Pre-define placeholder image in case needed later
    const placeholderImage = {
        src: 'https://pixabay.com/get/57e1d14a485aa514f1dc8460962930791537dbe3524c704c7c297fdc954ec050_640.jpg',
        alt: 'luggage, vacations, travel',
        attr: 'stux',
    };

    // For domestic, include attempt query with state
    if (country === 'United States') {
        getImage(encodeURI(`${city} ${state}`))
        .then(response => {

            // Check if response is empty
            if (response.total === 0) {

                // Try again with just the state
                getImage(encodeURI(state))
                .then(response => {

                    // Check if response is empty
                    if (response.total === 0) {

                        // Send placeholder image as final option
                        res.send(placeholderImage);

                    } else {

                        // Else, not empty. Send state response
                        res.send(parseImageResponse(response));
                    };
                })
                .catch(error => res.send(error));
            } else {

                // Else, not empty. Send city + state response
                res.send(parseImageResponse(response));
            };
        })
        .catch(error => res.send(error));
    } else {

        // For international, don't include state in query
        getImage(encodeURI(`${city} ${country}`))
        .then(response => {

            // Check if response is empty
            if (response.total === 0) {

                // Try again with just the country
                getImage(encodeURI(country))
                .then(response => {

                    // Check if response is empty
                    if (response.total === 0) {

                        // Send placeholder image as final option
                        res.send(placeholderImage);

                    } else {
                        // Else, not empty. Send country response
                        res.send(parseImageResponse(response));
                    };
                })
                .catch(error => res.send(error));
            } else {
                // Else, not empty. Send city + country response
                res.send(parseImageResponse(response));
            };
        })
        .catch(error => res.send(error));
    };
});

/* Define post request to save entry to app data */
app.post('/saveEntry', (req, res) => {

    // Pull just the pieces we will need to display
    const {city, state, country, fromDate, toDate, itinerary, forecastType, forecast, img} = req.body;
    const entry = {city, state, country, fromDate, toDate, itinerary, forecastType, forecast, img};

    // Save entry to our app data
    appData.push(entry);

    // Finally, sort our data by fromDate so they will be stored in chronological order
    appData.sort((a,b) => {
        const fromDateA = a.fromDate;
        const fromDateB = b.fromDate;

        let comparison = 0;
        if (fromDateA > fromDateB) {
            comparison = 1;
        } else if (fromDateA < fromDateB) {
            comparison = -1;
        };

        return comparison;
    });

    // Send standard status response
    res.send();
});

/* Define get request to retrieve all app data */
app.get('/upcomingTrips', (req, res) => {
    res.send(JSON.stringify(appData));
});

/* Define get request to reset all app data */
app.get('/resetData', (req, res) => {

    // Reset app data to empty array
    appData = [];
    
    // Send standard status response
    res.send();
});


/* EXTERNAL api requests */

/**
 * @description Get matching cities with detailed location from Geonames
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
            }; // Else ignore
        };

        // Alphabetize results by state
        filteredData.sort((a,b) => {
            const stateA = a.state.toLowerCase();
            const stateB = b.state.toLowerCase();

            let comparison = 0;
            if (stateA > stateB) {
                comparison = 1;
            } else if (stateA < stateB) {
                comparison = -1;
            };

            return comparison;
        });

        return filteredData;

    } catch (error) {
        console.log(error);
    };
}

/**
 * @description Get 16-day weather forecast from WeatherBit
 * @param {*} lat
 * @param {*} lon
 * @returns Forecast array including date, high and low temps, weather condition
 * code and description
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
            const code = day.weather.code;
            const description = day.weather.description;

            let low = '00';
            if (day.low_temp !== null) {
                low = day.low_temp.toFixed(0);
            } else if (day.min_temp !== null) {
                low = day.min_temp.toFixed(0);
            };

            let high = '00';
            if (day.high_temp !== null) {
                high = day.high_temp.toFixed(0);
            } else if (day.max_temp !== null) {
                high = day.max_temp.toFixed(0);
            };

            const singleDayForecast = {date, low, high, code, description};

            forecast.push(singleDayForecast);
        };

        return forecast;

    } catch (error) {
        console.log(error);
    };
}

/**
 * @description Get image results from Pixabay
 * @param {*} query
 * @returns Image results array
 */
async function getImage(query) {

    // Build url
    const url = `https://pixabay.com/api/?key=${process.env.API_KEY_PIXABAY}&q=${query}&image_type=photo&safesearch=true`;

    try {
        // Request raw data
        const response = await fetch(url, {
            method: 'GET',
        });

        // Convert raw data to JSON
        return await response.json();

    } catch (error) {
        console.log(error);
    };
}

/**
 * @description Helper method to parse just needed image data from first result found
 * @param {} response
 * @returns Single image object
 */
function parseImageResponse(response) {

    const imageData = response.hits[0];
    return {
        src: imageData.webformatURL,
        alt: imageData.tags,
        attr: imageData.user,
    };
}

exports.getWeatherForecast = getWeatherForecast;