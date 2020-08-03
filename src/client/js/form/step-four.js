/**
 * Analyze and process data for step four (enter itinerary) in order to proceed with saving 
 * and displaying entry.
 */
function processStepFour() {

    // First get reference to user input
    const itinerary = document.querySelector('#itinerary-input').value;

    // Make sure valid input
    const itineraryErrors = validateItineraryForErrors(itinerary);

    // If no errors ok to proceed
    if (itineraryErrors.length === 0) {

        // Update our entry builder with the itinerary
        Object.assign(window.entryBuilder, {itinerary});
        
        console.log(`Updated entry is ${JSON.stringify(window.entryBuilder)}`);

        // Now request weather forecast
        getWeather(window.entryBuilder.lat, window.entryBuilder.lon)
        .then(response => getTripForecast(response));

        // TODO get icons and convert to html for display

    } else {
        Client.displayValidationError(itineraryErrors);
    }
}

function validateItineraryForErrors(itinerary) {

    // Initiate error holder
    let errors = [];

    // Make sure user entered itinerary text
    if (itinerary === '') {
        errors.push('Enter your itinerary');
    }

    return errors;
}

/**
 * Make request to local server to access API endpoints and request weather forecast
 * @param {*} lat 
 * @param {*} lon 
 */
async function getWeather(lat, lon) {

    console.log(':: getWeather ::')

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
    const fromDate = window.entryBuilder.fromDate;
    const toDate = window.entryBuilder.toDate;

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
    let forecastToDisplay = [];
    if (startDateNotFound) {
        // Return today's forecast only
        forecastToDisplay.push(availableForecast[0]);
    } else {
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

    return forecastToDisplay;
}

export {
    processStepFour,
}