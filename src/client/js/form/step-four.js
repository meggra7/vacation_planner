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
        .then(response => console.log(response));

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

export {
    processStepFour,
}