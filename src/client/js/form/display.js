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

    // Add photo
    tripCard.append(newImage(trip.img));

    // Add basic info
    tripCard.append(newBasicInfo(trip.city, trip.state, trip.country, trip.fromDate, trip.toDate));

    // Add itinerary
    tripCard.append(newItinerary(trip.itinerary));

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

function newBasicInfo(city, state, country, fromDate, toDate) {

    // Initialize city to display
    let cityNameToDisplay = '';

    // If domestic, will display city and state
    if (country === 'United States') {
        cityNameToDisplay = `${city}, ${state}`;
    } else {
        // International will display city and country
        cityNameToDisplay = `${city}, ${country}`;
    }

    // Get long versions of from and to dates
    const longFromDate = Client.getLongDate(fromDate);
    const longToDate = Client.getLongDate(toDate);

    // Build date display
    const dateToDisplay = `${longFromDate} - ${longToDate}`;

    // Get days from today
    const daysFromToday = Client.getNumberOfDaysFromToday(fromDate);

    // Build countdown display
    const countdownToDisplay = `${daysFromToday} days away`;

    // Create paragraph element of class basic-info
    let pElement = document.createElement('p');
    pElement.classList.add('basic-info');
    
    // Set inner HTML using text displays found above
    pElement.innerHTML = `${cityNameToDisplay}<br>${dateToDisplay}<br>${countdownToDisplay}`;

    return pElement;
}

function newItinerary(itinerary) {

    // Create a fragment to hold our itinerary
    let itineraryFragment = document.createDocumentFragment();

    // Create our itinerary header and add to our fragment
    const headerElement = document.createElement('h3');
    headerElement.textContent = 'Itinerary';
    itineraryFragment.appendChild(headerElement);

    // Create paragraph element of class itinerary-display
    const pElement = document.createElement('p');
    pElement.classList.add('itinerary-display');
    
    // Set the itinerary as the paragraph text
    pElement.textContent = itinerary;

    // Add the paragraph to our fragment
    itineraryFragment.appendChild(pElement);

    return itineraryFragment;
}