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

        alert('Submitting trip!');

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

export {
    processStepFour,
}