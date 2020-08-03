function validateItineraryForErrors() {

    // Initiate error holder
    let errors = [];

    // Make sure user entered itinerary text
    const itinerary = document.querySelector('#itinerary-input').value;
    if (itinerary === '') {
        errors.push('Enter your itinerary');
    }

    return errors;

}