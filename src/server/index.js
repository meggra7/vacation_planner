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

app.post('/city', (req, res) => {

    // Get location object
    const location = req.body;

    // Make API request
    let response;
    if (location.country === 'US') {
        // If domestic, we already have state and assumed
        // safe to return first result
        getFirstMatchForState(location)
        .then(response => res.send(response));
    } else {
        // If international, need to return list to 
        // select from
        response = getAllMatchesForCountry(location)
        .then(response => res.send(response));
    }

});


/* EXTERNAL api requests */

/**
 * Get list of matches for city and country provided.
 * @param {*} req Location request with defined country value
 * @returns Array list of matching location objects with state/province
 */
async function getAllMatchesForCountry(req) {

    // Get url parameters we need
    const {city, country} = req;

    // Build url
    const url = `http://api.geonames.org/searchJSON?username=${process.env.API_KEY_GEONAMES}&type=json&maxRows=100&name_equals=${encodeURI(city)}&country=${country}`;

    try {

        // Request raw data
        const response = await fetch(url, {
            method: 'GET',
        });

        // Convert data to JSON
        const locationData = await response.json();

        // Remove duplicates
        let statesFound = new Set();
        let filteredData = [];
        for (let location of locationData.geonames) {

            // Check if state has been seen yet
            const currentState = location.adminName1;
            if (!statesFound.has(currentState) 
                && location.adminCode1 !== ''
                && location.adminName1 !== '') {

                // If not found, add to our lists
                statesFound.add(currentState);
                filteredData.push({
                    name: location.name,
                    stateAbbrev: location.adminCode1,
                    stateName: location.adminName1,
                    country: location.countryName,
                });

            } // else ignore
        }
        
        return filteredData;

    } catch (error) {
        console.log('error', error);
    }
}

/**
 * Get first/best match for city and state/province provided.
 * @param {*} req Location request with defined state value
 * @returns Array with single location object with latitude and longitude
 */
async function getFirstMatchForState(req) {

    // Get url parameters we need
    const {city, state} = req;

    // Build url
    const url = `http://api.geonames.org/searchJSON?username=${process.env.API_KEY_GEONAMES}&type=json&maxRows=100&name_equals=${encodeURI(city)}&admincode1=${state}`;
    
    try {

        // Request raw data
        const response = await fetch(url, {
            method: 'GET',
        });

        // Convert data to JSON
        const locationData = await response.json();

        // Get first match and return object
        const firstMatch = locationData.geonames[0];
        return [{
            name: firstMatch.name,
            stateName: firstMatch.adminName1,
            country: firstMatch.countryName,
            lat: firstMatch.lat,
            lon: firstMatch.lng,
        }];

    } catch (error) {
        console.log('error', error);
    }
}

