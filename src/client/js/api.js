const BASE_URL = 'http://localhost:8081';

function displayApiError(error) {

    // Get reference to error display
    const errorHolder = document.getElementById('error-message');

    // Update error text
    errorHolder.textContent = error;

    // Display message to user
    errorHolder.classList.add('visible');
}

async function getCity(city, state, country) {

    try {
        const response = await fetch(`${BASE_URL}/city`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({city, state, country}),
        });

        const locationData = await response.json();

        console.log(JSON.stringify(locationData));

    } catch (error) {
        console.log('error', error);
        displayApiError('We were unable to verify your destination.  Please make sure you entered a valid city and review for any spelling errors. Otherwise, please check your internet connection and try again.');
    }

}

export {
    displayApiError,
    getCity,
}