import { stepCompleted } from "..";

const mProgressTrackerContainer = document.getElementById('progress-tracker');
const mProgressTrackerOne = document.getElementById('progress-tracker-one');
const mProgressTrackerTwo = document.getElementById('progress-tracker-two');
const mProgressTrackerThree = document.getElementById('progress-tracker-three');
const mProgressTrackerFour = document.getElementById('progress-tracker-four');
const mStepOne = document.getElementById('step-one');
const mStepTwo = document.getElementById('step-two');
const mStepThree = document.getElementById('step-three');
const mStepFour = document.getElementById('step-four');
const mLoadingIndicator = document.getElementById('loading-indicator');
const mErrorMessage = document.getElementById('error-message');
const mBackButton = document.getElementById('back-button');
const mForwardButton = document.getElementById('forward-button');
let mCurrentStep = 1;
let mEntryBuilder;


function backButtonPress() {
    console.log(':: backButtonPress ::')

    // Decrease step count
    mCurrentStep -= 1;
    goToStep(mCurrentStep);
}

function forwardButtonPress() {
    console.log(':: forwardButtonPress ::')

    switch(mCurrentStep) {
        case 1:
            processStepOne();
            break;
        case 2:
            processStepTwo();
            break;
        case 3:
            const dateErrors = validateDatesForErrors();
            if (dateErrors.length === 0) {
                mCurrentStep += 1;
                goToStep(mCurrentStep);
            } else {
                displayValidationError(dateErrors);
            }
            break;
        case 4:
            const itineraryErrors = validateItineraryForErrors();
            if (itineraryErrors.length === 0) {
                alert('Submitting trip!')
            } else {
                displayValidationError(itineraryErrors);
            }
            break;
        default:
            console.log(`ERROR: Unable to process forward button press`);
            return;            
    }
}

function goToStep(stepNumber) {
    console.log(`:: goToStep ${stepNumber} ::`)

    // Hide any previous errors
    mErrorMessage.classList.remove('visible');

    // Hide progress tracker to update
    mProgressTrackerContainer.classList.add('hidden');

    // Update each progress tracker icon
    switch (stepNumber) {
        case 1:
            // Update progress tracker
            mProgressTrackerOne.setAttribute('src', Client.airplane);
            mProgressTrackerOne.classList.add('current');
            mProgressTrackerTwo.setAttribute('src', Client.stepUpcoming);
            mProgressTrackerTwo.classList.remove('current');
            mProgressTrackerThree.setAttribute('src', Client.stepUpcoming);
            mProgressTrackerThree.classList.remove('current');
            mProgressTrackerFour.setAttribute('src', Client.stepUpcoming);
            mProgressTrackerFour.classList.remove('current');

            // Hide other form steps
            mStepTwo.classList.remove('visible');
            mStepThree.classList.remove('visible');
            mStepFour.classList.remove('visible');

            // Show this step only
            mStepOne.classList.add('visible');

            break;

        case 2:
            // Update progress tracker
            mProgressTrackerOne.setAttribute('src', Client.stepCompleted);
            mProgressTrackerOne.classList.remove('current');
            mProgressTrackerTwo.setAttribute('src', Client.airplane);
            mProgressTrackerTwo.classList.add('current');
            mProgressTrackerThree.setAttribute('src', Client.stepUpcoming);
            mProgressTrackerThree.classList.remove('current');
            mProgressTrackerFour.setAttribute('src', Client.stepUpcoming);
            mProgressTrackerFour.classList.remove('current');

            // Hide other form steps
            mStepOne.classList.remove('visible');
            mStepThree.classList.remove('visible');
            mStepFour.classList.remove('visible');

            // Show this step only
            mStepTwo.classList.add('visible');

            break;

        case 3:
            // Update progress tracker
            mProgressTrackerOne.setAttribute('src', Client.stepCompleted);
            mProgressTrackerOne.classList.remove('current');
            mProgressTrackerTwo.setAttribute('src', Client.stepCompleted);
            mProgressTrackerTwo.classList.remove('current');
            mProgressTrackerThree.setAttribute('src', Client.airplane);
            mProgressTrackerThree.classList.add('current');
            mProgressTrackerFour.setAttribute('src', Client.stepUpcoming);
            mProgressTrackerFour.classList.remove('current');

            // Hide other form steps
            mStepOne.classList.remove('visible');
            mStepTwo.classList.remove('visible');
            mStepFour.classList.remove('visible');

            // Show this step only
            mStepThree.classList.add('visible');

            break;

        case 4:
            // Update progress tracker
            mProgressTrackerOne.setAttribute('src', Client.stepCompleted);
            mProgressTrackerOne.classList.remove('current');
            mProgressTrackerTwo.setAttribute('src', Client.stepCompleted);
            mProgressTrackerTwo.classList.remove('current');
            mProgressTrackerThree.setAttribute('src', Client.stepCompleted);
            mProgressTrackerThree.classList.remove('current');
            mProgressTrackerFour.setAttribute('src', Client.airplane);
            mProgressTrackerFour.classList.add('current');

            // Hide other form steps
            mStepOne.classList.remove('visible');
            mStepTwo.classList.remove('visible');
            mStepThree.classList.remove('visible');

            // Show this step only
            mStepFour.classList.add('visible');

            break;
        default:
            console.log(`ERROR: Unable to go to step number ${stepNumber}`);

            // Unable to make any changes.  Redisplay progress tracker and
            // exit method to stay at current state.
            mProgressTrackerContainer.classList.remove('hidden');
            return;
    }

    // Make sure back button ENABLED for all steps except 1
    if (stepNumber === 1) {
        mBackButton.setAttribute('disabled', true);
    } else {
        mBackButton.removeAttribute('disabled', true);
    };

    // Make sure forward button has default text EXCEPT for final step
    if (stepNumber === 4) {
        mForwardButton.textContent = 'Let\'s go!';
    } else {
        mForwardButton.textContent = 'Next';
    }
    
    // Re-display progress tracker
    mProgressTrackerContainer.classList.remove('hidden');

    // Hide loading indicator
    mLoadingIndicator.classList.remove('visible');

}

function displayValidationError(errors) {

    // Initialize the error message
    let errorMessage = 'Please correct the following errors to continue:<br>';

    // Iterate through each error found and append to the message
    for (let error of errors) {
        errorMessage = errorMessage + '<br>&bull; ' + error;
    };

    // Update error text
    mErrorMessage.innerHTML = errorMessage;

    // Display message to user
    mErrorMessage.classList.add('visible');
}

function displayApiError() {

    switch (mCurrentStep) {
        case 1:

            // Dismiss loading indicator
            mLoadingIndicator.classList.remove('visible');

            // Re-display step 1
            mStepOne.classList.add('visible');

            // Update error text
            mErrorMessage.textContent = 'No results found. Please make sure you entered a valid city and review for any spelling errors.  Otherwise check your internet connection and try again.';

            // Display message to user
            mErrorMessage.classList.add('visible');
            
            break;

        case 2:
            break;
        case 3:
            break;
        case 4:
            break;
        default:
            
    }
}

function displayLoadingIndicator() {

    mStepOne.classList.remove('visible');
    mStepTwo.classList.remove('visible');
    mStepThree.classList.remove('visible');
    mStepFour.classList.remove('visible');
    mErrorMessage.classList.remove('visible');

    mLoadingIndicator.classList.add('visible');
}

function processStepOne() {

    // Collect data
    const city = document.querySelector('#city').value.trim();
    const state = document.querySelector('#state').value;
    const countryAbbrev = document.querySelector('#country').value;

    console.log(`Data entered: ${city}, ${state}, ${countryAbbrev}`);

    // Validate data
    const cityErrors = validateCityForErrors(city, state, countryAbbrev);
    if (cityErrors.length === 0) {

        // No validation errors, ok to process data
        // Display loading indicator
        displayLoadingIndicator();

        // Request data
        Client.getCity(city, state, countryAbbrev)
        .then(resultsList => {

            // Make sure response not empty
            if (resultsList.length > 0) {

                // Begin building our entry data
                mEntryBuilder = {resultsList};
                console.log(JSON.stringify(mEntryBuilder));

                // Populate step two with our results list
                populateStepTwo();

                // Move to next step
                mCurrentStep += 1;
                goToStep(mCurrentStep);

            } else {
                displayApiError();
            }
        })
        .catch(error => {
            console.log(error);
            displayApiError();
        });
    } else {
        displayValidationError(cityErrors);
    };
}

/* Validate form information */
function validateCityForErrors(city, state, countryAbbrev) {

    // Initiate error holder
    let errors = [];

    // Make sure city isn't empty
    if (city === '') {
        errors.push('Enter city name');
    };

    // If country is US, make sure state is entered
    if (countryAbbrev === 'US' && state === '') {
        errors.push('Enter state (abbreviation)')
    };

    return errors;    
}

function populateStepTwo() {

    // Initialize inner HTML by adding header
    let innerHtml = '<h3>Please confirm your destination:</h3>';

    // Iterate through each result and add a radio button option
    for (let index = 0; index < mEntryBuilder.resultsList.length; index++) {

        const currentLocation = mEntryBuilder.resultsList[index];
        const displayName = `${currentLocation.city}, ${currentLocation.state}, ${currentLocation.country}`;

        innerHtml += `<input type="radio" name="destination" value="${index}">
            <label>${displayName}</label><br><br>`;
            // <input type="radio" name="destination" value="one">
            // <label for="male">New York, NY</label><br><br>
    }

    mStepTwo.innerHTML = innerHtml;

    // If only one option, go ahead and check it by default
    if (mEntryBuilder.resultsList.length === 1) {
        mStepTwo.getElementsByTagName('input')[0].checked = true;
    }
}

function checkForStateRequirement() {
    const selectedCountry = document.querySelector('#country').value;
    const stateInput = document.querySelector('#state');

    if (selectedCountry === 'US') {
        stateInput.removeAttribute('disabled');
    } else {
        stateInput.setAttribute('disabled', true);
        stateInput.value = '';
    }
}

function processStepTwo() {
    console.log(':: processStepTwo ::')
    
    const destinationErrors = validateDestinationSelectionForErrors();
    if (destinationErrors.length === 0) {

        // No validation errors, ok to process data
        // Display loading indicator
        displayLoadingIndicator();

    } else {
        displayValidationError(destinationErrors);
    };
}

function validateDestinationSelectionForErrors() {

    console.log(':: validateDestinationSelectionForErrors ::')

    // Initiate error holder
    let errors = [];

    const destinationOptions = document.getElementsByName('destination');

    let noDestination = true;
    let index = 0;
    while (noDestination && index < destinationOptions.length) {
        if (destinationOptions[index].checked) {
            noDestination = false;
        }
        index++;
    }

    if (noDestination) {
        errors.push('Confirm a destination');
    }

    return errors;
}

function validateDatesForErrors() {

    // Initiate error holder
    let errors = [];

    // Make sure valid from date
    let fromDate = document.querySelector('#date-from').value;
    if (fromDate) {
        fromDate = new Date(document.querySelector('#date-from').value);
        fromDate = Client.getDateAsNumber(fromDate);

        // Make sure from date is also after today
        const today = Client.getTodaysDate();
        if (fromDate <= today) {
            errors.push('\'From\' date must be after today\'s date');
        }

    } else {
        errors.push('Enter a \'from\' date');
    }

    // Make sure valid to date
    let toDate = document.querySelector('#date-to').value;
    if (toDate) {
        toDate = new Date(document.querySelector('#date-to').value);
        toDate = Client.getDateAsNumber(toDate);
        
        // Make sure to date is same or greater than from date
        if (fromDate && toDate < fromDate) {
            errors.push('\'To\' date must be same as or after \'from\' date');
        }

    } else {
        errors.push('Enter a \'to\' date');
    }

    return errors;
}

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


export {
    backButtonPress,
    forwardButtonPress,
    goToStep,
    displayValidationError,
    validateCityForErrors,
    checkForStateRequirement,
    validateDatesForErrors,
    validateItineraryForErrors,
}

