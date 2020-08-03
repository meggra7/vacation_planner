export function displayUpcomingTrips(upcomingTrips) {

    console.log(`:: displayUpcomingTrips ::
    ${JSON.stringify(upcomingTrips)}`);

    // Create empty fragment where we can hold trip cards as they are created
    let fragment = document.createDocumentFragment();

    // Iterate over all the trips and create cards for each
    for (let trip of upcomingTrips) {

        // Add each created card to our fragment
        fragment.appendChild(newTripCard(trip));
    }

    // Now that we have our updated fragment, clear any previous dataFinally, add our fragment back into our document
    // Get reference to our 'upcoming' section where we will display the trips
    const upcomingElement = document.querySelector('#upcoming');

    // Clear any prior data except header
    upcomingElement.innerHTML = '<h2>Upcoming trips</h2>';

    // Then add our fragment
    upcomingElement.appendChild(fragment)

    // Re-display our form
    // TODO Reset all form values to start fresh
    Client.displayStep(window.currentStep);
}

function newTripCard(trip) {

    // Create card holder
    let tripCard = document.createElement('div');
    tripCard.classList.add('card');
    tripCard.textContent = `New card for ${trip.city}`;

    // Add photo
    tripCard.append(newImage(trip.img));

    // Add basic info
    // tripCard.append(BASIC_INFO_ELEMENT);

    // Add itinerary
    // tripCard.append(ITINERARY_ELEMENT);

    // Add weather
    // tripCard.append(WEATHER_ELEMENT);

    return tripCard;
}

function newImage(image) {

    // Create image element of class location-photo
    let imgElement = document.createElement('img');
    imgElement.classList.add('location-photo');

    // Set the source and alternate text
    imgElement.setAttribute('src', image.src);
    imgElement.setAttribute('alt', image.alt);

    return imgElement;
}