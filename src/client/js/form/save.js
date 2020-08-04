// Initialize global entry for this file since will be accessed often
let mEntry = window.entryBuilder;

export function processEntry() {

    // Display loading indicator
    Client.displayLoadingIndicator();

    // Now request all available weather (16 days)
    getAvailableWeather(mEntry.lat, mEntry.lon)
    // Compare to trip dates and retrieve forecast for trip only
    .then(response => getTripForecast(response))
    // Add trip forecast to entry
    .then(response => {
        Object.assign(mEntry, {
            forecastType: response.forecastType,
            forecast: response.forecastToDisplay,
        });
    })
    // Get image
    .then(response => getImage(mEntry.city, mEntry.state, mEntry.country))
    // Add image to entry
    .then(response => {
        Object.assign(mEntry, {img: response});
    })
    // Save entry to local server
    .then(response => saveEntry())
    // Get entries from local server
    .then(response => getUpcomingTrips())
    // Display entries to user
    .then(response => Client.displayUpcomingTrips(response))
    .catch(error => {
        console.log(error);
        Client.displayStep(window.currentStep);
        Client.displayApiError('We\'re sorry, we are unable to save your trip at this time. Please try again later.');
    });    
}

/**
 * Make request to local server to access API endpoints and request weather forecast
 * @param {*} lat 
 * @param {*} lon 
 */
async function getAvailableWeather(lat, lon) {

    console.log(':: getAvailableWeather ::')

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
 * Using currently available weather up to 16 days, compare to upcoming trip and get
 * available forecasts if possible.  If starting date too far in future (greater than 16 days),
 * will return the current forecast only.
 * 
 * @param {*} availableForecast 
 * @returns Array of forecast for available days falling within trip date range.
 */
function getTripForecast(availableForecast) {

    // First get our trip dates
    const fromDate = mEntry.fromDate;
    const toDate = mEntry.toDate;

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
    if (startDateNotFound) {

        // Set forecast type as current and return today's forecast only
        forecastType = 'current';
        forecastToDisplay.push(availableForecast[0]);
    } else {

        // Set forecast type as future
        forecastType = 'future';

        // Get trip length 
        let tripLength = Client.getDateRangeLength(fromDate, toDate);
        console.log(`Trip length will be ${tripLength} days`);

        // Iterate over the available forecast and add days to our display
        // until we reach the end of the available forecast
        // or we reach the end of our trip, whichever comes first
        while (forecastIndex < availableForecast.length && tripLength > 0) {
            forecastToDisplay.push(availableForecast[forecastIndex]);
            forecastIndex++; // Increase forecast day
            tripLength--; // Decrease number of trip days remaining
        }
    }

    console.log(`Trip forecast (from available) is ${JSON.stringify(forecastToDisplay)}`);

    return {forecastType, forecastToDisplay};
}

/**
 * Make request to local server to access API endpoints and request image for our location
 * @param {*} city 
 * @param {*} state 
 * @param {*} country 
 */
async function getImage(city, state, country) {

    console.log(':: getImage ::')

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
        const image = await response.json();

        console.log(image);

        return image;

    } catch (error) {
        console.log(error);
    };
}

/**
 * POST request to local server to save entry
 */
async function saveEntry() {

    console.log(':: saveEntry ::')

    try {
        // Make request to local server
        const response = await fetch(`${window.LOCAL_SERVER_BASE_URL}/saveEntry`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(mEntry),
        });

        // Log status
        console.log(response);

    } catch (error) {
        console.log(error);
    };
}

/**
 * GET request to local server for all saved entries
 */
async function getUpcomingTrips() {

    console.log(':: getUpcomingTrips ::')

    try {
        // Make request to local server
        const response = await fetch(`${window.LOCAL_SERVER_BASE_URL}/upcomingTrips`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        // Convert response to JSON object
        return await response.json();

    } catch (error) {
        console.log(error);
    };

}

