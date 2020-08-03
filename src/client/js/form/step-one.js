/**
 * Analyze and process data for step one (enter destination city and country) in order to proceed to step two.
 */
function processStepOne() {

    console.log(':: processStepOne ::')

    // Collect form data
    const city = document.querySelector('#city').value.trim();
    const countryAbbrev = document.querySelector('#country').value;

    console.log(`User entered: ${city}, ${countryAbbrev}`);

    // Validate data
    const cityErrors = validateCityForErrors(city, countryAbbrev);

    if (cityErrors.length === 0) {

        // No validation errors, ok to process data

        // Display loading indicator
        Client.displayLoadingIndicator();

        // Request city results
        getCities(city, countryAbbrev)
        .then(resultsList => {
                
            // Make sure response not empty
            if (resultsList.length > 0) {

                // Begin building our entry data
                Object.assign(window.entryBuilder, {resultsList});

                // DEBUGGING SHOW CURRENT ENTRY
                console.log(JSON.stringify(window.entryBuilder)); 

                // Pre-populate step two with our results list
                populateStepTwo();

                // Move display to next step
                window.currentStep += 1;
                Client.displayStep(window.currentStep);

            } else {
                // No results found.  Display API error.
                Client.displayApiError(`No results found. Please make sure you entered a valid city/country combination.
                <br><br>Troubleshooting:
                <br>&bull; Check for spelling errors
                <br>&bull; Reverse any punctuation (remove if included, add if excluded)
                <br>&bull; Reverse any abbreviation (abbreviate if spelled out, spell out if abbreviated)`);
            }
        })
        .catch(error => {
            console.log(error);
            Client.displayApiError(`Error getting destination results. Please make sure you entered a valid city/country combination, check your internet connection and try again.
                <br><br>Troubleshooting:
                <br>&bull; Check for spelling errors
                <br>&bull; Reverse any punctuation (remove if included, add if excluded)
                <br>&bull; Reverse any abbreviation (abbreviate if spelled out, spell out if abbreviated)`);
        });

    } else {
        // Error(s) found. Display validation error.
        Client.displayValidationError(cityErrors);
    };
}

/**
 * Validate destination city form input
 * @param {*} city 
 * @param {*} countryAbbrev 
 */
function validateCityForErrors(city) {

    console.log(':: validateCityForErrors ::')

    // Initiate error holder
    let errors = [];

    // Make sure city isn't empty
    if (city === '') {
        errors.push('Enter city name');
    };

    return errors;    
}


/**
 * Make request to local server to access API endpoints and request list of cities
 * @param {*} city 
 * @param {*} countryAbbrev 
 */
async function getCities(city, countryAbbrev) {

    console.log(':: getCities ::')

    try {

        // Make request to local server
        const response = await fetch(`${Client.LOCAL_SERVER_BASE_URL}/cities`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({city, countryAbbrev}),
        });

        // Return results
        return await response.json();

    } catch (error) {
        console.log(error);
    }
}

/**
 * Using retrieved cities list, pre-populate step two form options
 */
function populateStepTwo() {

    console.log(':: populateStepTwo ::')

    // Initialize inner HTML by adding header
    let innerHtmlBuilder = '<h3>Please confirm your destination:</h3>';

    // Iterate through each result and add a radio button option
    for (let cityId = 0; cityId < window.entryBuilder.resultsList.length; cityId++) {
        const currentLocation = window.entryBuilder.resultsList[cityId];
        const displayName = `${currentLocation.city}, ${currentLocation.state}, ${currentLocation.country}`;
        innerHtmlBuilder += `<input type="radio" name="destination" value="${cityId}">
            <label>${displayName}</label><br><br>`;
    }

    // Set the built innerHTML to element
    document.getElementById('step-two').innerHTML = innerHtmlBuilder;

    // If only one option, go ahead and check it by default
    if (window.entryBuilder.resultsList.length === 1) {
        document.getElementById('step-two').getElementsByTagName('input')[0].checked = true;
    }
}

export {
    processStepOne,
}