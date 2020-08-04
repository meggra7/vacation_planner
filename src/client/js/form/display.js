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
    tripCard.append(newWeatherForecast(trip.forecastType, trip.forecast));

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

function newWeatherForecast(forecastType, forecast) {

    // Create a fragment to hold our forecast
    let forecastFragment = document.createDocumentFragment();

    // Create our forecast header and add to our fragment
    const headerElement = document.createElement('h3');
    headerElement.textContent = 'Weather Forecast';
    forecastFragment.appendChild(headerElement);

    // Create div element of class weather-display to hold the weather tiles
    const weatherDisplayElement = document.createElement('div');
    weatherDisplayElement.classList.add('weather-display');

    // Now iterate over each forecast entry, build a tile for each and append
    // to our weather display container
    for (let day of forecast) {

        // Create div element of class forecast
        const forecastElement = document.createElement('div');
        forecastElement.classList.add('forecast');

        // Create and paragraph element of class date
        const dateElement = document.createElement('p');
        dateElement.classList.add('date');

        // Depending on if current weather or future forecast,
        // set the date text accordingly
        if (forecastType === 'current') {
            dateElement.textContent = 'CURRENTLY';
        } else { // forecastType === 'future'
            dateElement.textContent = day.date.slice(5);
        }

        // Append date to forecast tile
        forecastElement.appendChild(dateElement);

        // Create image element of class icon
        const iconElement = document.createElement('img');
        iconElement.classList.add('icon');

        // Set src and alternate text
        iconElement.setAttribute('src', getWeatherIcon(day.code));
        iconElement.setAttribute('alt', day.description);

        // Append icon to forecast tile
        forecastElement.appendChild(iconElement);

        // Create paragraph elements of class low-temp & high-temp
        const lowTempElement = document.createElement('p');
        lowTempElement.classList.add('low-temp');
        const highTempElement = document.createElement('p');
        highTempElement.classList.add('high-temp');

        // Set temps as inner html
        lowTempElement.innerHTML = `${day.low}&deg;F`;
        highTempElement.innerHTML = `${day.high}&deg;F`;

        // Append temps to forecast tile
        forecastElement.appendChild(lowTempElement);
        forecastElement.appendChild(highTempElement);

        // Finally, append constructed forecast tile to display container
        weatherDisplayElement.appendChild(forecastElement);
    }

    // Append weather display to fragment
    forecastFragment.appendChild(weatherDisplayElement);

    return forecastFragment;
}

/**
 * Helper function to retrieve weather icon image path based on weather code
 * @param {} code
 */
function getWeatherIcon(code) {

    switch (code) {
        case 200: // Thunderstorm with light rain
        case 201: // Thunderstorm with rain
        case 202: // Thunderstorm with heavy rain
            return Client.t01d;
        case 230: // Thunderstorm with light drizzle
        case 231: // Thunderstorm with drizzle
        case 232: // Thunderstorm with heavy drizzle
        case 233: // Thunderstorm with Hail
            return Client.t04d;
        case 300: // Light Drizzle
        case 301: // Drizzle
        case 302: // Heavy Drizzle
            return Client.d01d;
        case 500: // Light Rain
        case 501: // Moderate Rain
        case 511: // Freezing rain
        case 520: // Light shower rain
        case 522: // Heavy shower rain
        case 900: // Unknown Precipitation
            return Client.r01d;
        case 502: // Heavy Rain
            return Client.r03d;
        case 521: // Shower rain
            return Client.r05d;
        case 600: // Light snow
        case 610: // Mix snow/rain
        case 621: // Snow shower
            return Client.s01d;
        case 601: // Snow
        case 602: // Heavy Snow
        case 622: // Heavy snow shower
            return Client.s02d;
        case 611: // Sleet
        case 612: // Heavy sleet
            return Client.s05d;
        case 623: // Flurries
            return Client.s06d;
        case 700: // Mist
        case 711: // Smoke
        case 721: // Haze
        case 731: // Sand/dust
        case 741: // Fog
        case 751: // Freezing Fog
            return Client.a01d;
        case 800: // Clear sky
            return Client.c01d;
        case 801: // Few clouds
        case 802: // Scattered clouds
            return Client.c02d;
        case 803: // Broken clouds
            return Client.c03d;
        case 804: // Overcast clouds
            return Client.c04d;
        default:
            return Client.c02d;
    }
}