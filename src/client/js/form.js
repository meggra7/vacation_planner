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
            // Otherwise increase step count
            mCurrentStep += 1;
            goToStep(mCurrentStep);
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

function displayLoadingIndicator() {

    mStepOne.classList.remove('visible');
    mStepTwo.classList.remove('visible');
    mStepThree.classList.remove('visible');
    mStepFour.classList.remove('visible');

    mLoadingIndicator.classList.add('visible');
}

function processStepOne() {

    // Collect data
    const city = document.querySelector('#city').value.trim();
    const state = document.querySelector('#state').value;
    const country = document.querySelector('#country').value;

    console.log(`Data entered: ${city}, ${state}, ${country}`);

    // Validate data
    const cityErrors = validateCityForErrors(city, state, country);
    if (cityErrors.length === 0) {

        // No errors, ok to process data
        displayLoadingIndicator();
        Client.getCity(city, state, country)
        .then(response => {
            console.log(response);

            // mCurrentStep += 1;
            // goToStep(mCurrentStep);
        });  
    } else {
        displayValidationError(cityErrors);
    };
}

/* Validate form information */
function validateCityForErrors(city, state, country) {

    // Initiate error holder
    let errors = [];

    // Make sure city isn't empty
    if (city === '') {
        errors.push('Enter city name');
    };

    // If country is US, make sure state is entered
    if (country === 'US' && state === '') {
        errors.push('Enter state (abbreviation)')
    };

    return errors;    
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

