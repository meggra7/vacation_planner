/**
 * @description Primary save function that chains events required to obtain weather
 * forecast and image, then saving the trip data to local app data
 * @param {*} entry 
 */
export function processEntry(entry) {

    // Display loading indicator
    Client.displayLoadingIndicator();

    // Now request all available weather (16 days)
    getAvailableWeather(entry.lat, entry.lon)
    // Compare to trip dates and retrieve forecast for trip only
    .then(response => getTripForecast(entry, response))
    // Add trip forecast to entry
    .then(response => {
        Object.assign(entry, {
            forecastType: response.forecastType,
            forecast: response.forecastToDisplay,
        });
    })
    // Get image
    .then(response => getImage(entry.city, entry.state, entry.country))
    // Add image to entry
    .then(response => {
        Object.assign(entry, {img: response});
    })
    // Save entry to local server
    .then(response => saveEntry(entry))
    // Reset form
    .then(response => Client.resetForm())
    // Display entries to user
    .then(response => Client.displayUpcomingTrips())
    .catch(error => {
        console.log(error);
        Client.displayStep(window.currentStep);
        Client.displayApiError('We\'re sorry, we are unable to save your trip at this time. Please try again later.');
    });    
}

/**
 * @description Make request to local server to access API endpoints and request weather forecast
 * @param {*} lat 
 * @param {*} lon 
 * @returns JSON weather data
 */
async function getAvailableWeather(lat, lon) {

    try {
        // Make request to local server
        const response = await fetch(`${window.LOCAL_SERVER_BASE_URL}/weather`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({lat, lon}),
        });

        // Return results
        return await response.json();

    } catch (error) {
        console.log(error);
    };
}

/**
 * @description Using currently available weather up to 16 days, compare to upcoming 
 * trip and get available forecasts if possible.  If starting date too far in future 
 * (greater than 16 days), will return the current forecast only.
 * 
 * @param {*} entry
 * @param {*} availableForecast 
 * @returns Object with forecast type and forecast array
 */
function getTripForecast(entry, availableForecast) {

    // First get our trip dates
    const fromDate = entry.fromDate;
    const toDate = entry.toDate;

    // Next, cycle through the available forecast and see if our start date is found
    let startDateNotFound = true;
    let forecastIndex = 0;
    while (startDateNotFound && forecastIndex < availableForecast.length) {

        if (fromDate === availableForecast[forecastIndex].date) {
            // Start date now found!
            startDateNotFound = false;
        } else {
            // Only increase index if not found, since once it's found we want
            // to save the forecast index where it was found as our starting point.  
            // By switching the startDateNotFound to false that will trigger 
            // exiting the loop anyway.
            forecastIndex++;
        }
    };

    // Initiate forecast display
    let forecastType = '';
    let forecastToDisplay = [];

    // Set the type and forecast
    if (startDateNotFound) {

        // Set forecast type as current and return today's forecast only
        forecastType = 'current';
        forecastToDisplay.push(availableForecast[0]);

    } else {

        // Set forecast type as future
        forecastType = 'future';

        // Get trip length 
        let tripLength = Client.getDateRangeLength(fromDate, toDate);

        // Iterate over the available forecast and add days to our display
        // until we reach the end of the available forecast
        // or we reach the end of our trip, whichever comes first
        while (forecastIndex < availableForecast.length && tripLength > 0) {
            forecastToDisplay.push(availableForecast[forecastIndex]);
            forecastIndex++; // Increase forecast day
            tripLength--; // Decrease number of trip days remaining
        }
    }

    return {forecastType, forecastToDisplay};
}

/**
 * @description Make request to local server to access API endpoints and request 
 * image for our location.
 * 
 * @param {*} city 
 * @param {*} state 
 * @param {*} country 
 * @returns image Object
 */
async function getImage(city, state, country) {

    try {
        // Make request to local server
        const response = await fetch(`${window.LOCAL_SERVER_BASE_URL}/image`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({city, state, country}),
        });

        // Return results
        return await response.json();

    } catch (error) {
        console.log(error);
    };
}

/**
 * @description POST request to local server to save entry
 * 
 * @param {*} entry
 */
async function saveEntry(entry) {

    try {
        // Make request to local server
        const response = await fetch(`${window.LOCAL_SERVER_BASE_URL}/saveEntry`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(entry),
        });

        // Log status in lieu of sending response
        console.log(response);

    } catch (error) {
        console.log(error);
    };
}