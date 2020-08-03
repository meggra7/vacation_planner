// Initialize app-global variables
window.entryBuilder = {}; // Will hold our entry to post
window.currentStep = 1; // Always begin at step 1

// Initialize file-global variables
const mStepOne = document.getElementById('step-one');
const mStepTwo = document.getElementById('step-two');
const mStepThree = document.getElementById('step-three');
const mStepFour = document.getElementById('step-four');
const mLoadingIndicator = document.getElementById('loading-indicator');
const mErrorMessage = document.getElementById('error-message');

function backButtonPress() {
    console.log(':: backButtonPress ::')

    // Decrease step count
    window.currentStep -= 1;
    displayStep(window.currentStep);
}

function forwardButtonPress() {
    console.log(':: forwardButtonPress ::')

    switch(window.currentStep) {
        case 1:
            Client.processStepOne();
            break;
        case 2:
            Client.processStepTwo();
            break;
        case 3:
            const dateErrors = validateDatesForErrors();
            if (dateErrors.length === 0) {
                window.currentStep += 1;
                displayStep(window.currentStep);
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

function displayStep(stepNumber) {
    console.log(`:: displayStep ${stepNumber} ::`)

    // Get references to our display elements
    const progressTrackerContainer = document.getElementById('progress-tracker');
    const progressTrackerOne = document.getElementById('progress-tracker-one');    
    const progressTrackerTwo = document.getElementById('progress-tracker-two');
    const progressTrackerThree = document.getElementById('progress-tracker-three');
    const progressTrackerFour = document.getElementById('progress-tracker-four');
    const backButton = document.getElementById('back-button');
    const forwardButton = document.getElementById('forward-button');

    // Hide any previous errors
    mErrorMessage.classList.remove('visible');
    
    // Hide progress tracker while updating
    progressTrackerContainer.classList.add('hidden');

    // Update each progress tracker icon
    switch (stepNumber) {
        case 1:
            // Update progress tracker
            progressTrackerOne.setAttribute('src', Client.airplane);
            progressTrackerOne.classList.add('current');
            progressTrackerTwo.setAttribute('src', Client.stepUpcoming);
            progressTrackerTwo.classList.remove('current');
            progressTrackerThree.setAttribute('src', Client.stepUpcoming);
            progressTrackerThree.classList.remove('current');
            progressTrackerFour.setAttribute('src', Client.stepUpcoming);
            progressTrackerFour.classList.remove('current');

            // Hide other form steps
            mStepTwo.classList.remove('visible');
            mStepThree.classList.remove('visible');
            mStepFour.classList.remove('visible');

            // Show this step only
            mStepOne.classList.add('visible');

            break;

        case 2:
            // Update progress tracker
            progressTrackerOne.setAttribute('src', Client.stepCompleted);
            progressTrackerOne.classList.remove('current');
            progressTrackerTwo.setAttribute('src', Client.airplane);
            progressTrackerTwo.classList.add('current');
            progressTrackerThree.setAttribute('src', Client.stepUpcoming);
            progressTrackerThree.classList.remove('current');
            progressTrackerFour.setAttribute('src', Client.stepUpcoming);
            progressTrackerFour.classList.remove('current');

            // Hide other form steps
            mStepOne.classList.remove('visible');
            mStepThree.classList.remove('visible');
            mStepFour.classList.remove('visible');

            // Show this step only
            mStepTwo.classList.add('visible');

            break;

        case 3:
            // Update progress tracker
            progressTrackerOne.setAttribute('src', Client.stepCompleted);
            progressTrackerOne.classList.remove('current');
            progressTrackerTwo.setAttribute('src', Client.stepCompleted);
            progressTrackerTwo.classList.remove('current');
            progressTrackerThree.setAttribute('src', Client.airplane);
            progressTrackerThree.classList.add('current');
            progressTrackerFour.setAttribute('src', Client.stepUpcoming);
            progressTrackerFour.classList.remove('current');

            // Hide other form steps
            mStepOne.classList.remove('visible');
            mStepTwo.classList.remove('visible');
            mStepFour.classList.remove('visible');

            // Show this step only
            mStepThree.classList.add('visible');

            break;

        case 4:
            // Update progress tracker
            progressTrackerOne.setAttribute('src', Client.stepCompleted);
            progressTrackerOne.classList.remove('current');
            progressTrackerTwo.setAttribute('src', Client.stepCompleted);
            progressTrackerTwo.classList.remove('current');
            progressTrackerThree.setAttribute('src', Client.stepCompleted);
            progressTrackerThree.classList.remove('current');
            progressTrackerFour.setAttribute('src', Client.airplane);
            progressTrackerFour.classList.add('current');

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
            progressTrackerContainer.classList.remove('hidden');
            return;
    }

    // Make sure back button ENABLED for all steps except 1
    if (stepNumber === 1) {
        backButton.setAttribute('disabled', true);
    } else {
        backButton.removeAttribute('disabled', true);
    };

    // Make sure forward button has default text EXCEPT for final step
    if (stepNumber === 4) {
        forwardButton.textContent = 'Let\'s go!';
    } else {
        forwardButton.textContent = 'Next';
    }
    
    // Re-display progress tracker
    progressTrackerContainer.classList.remove('hidden');

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

function displayApiError(error) {

    // Update error text
    mErrorMessage.innerHTML = error;

    // Display message to user
    mErrorMessage.classList.add('visible');

    // Dismiss loading indicator
    mLoadingIndicator.classList.remove('visible');

    // Re-display current step
    switch (window.currentStep) {
        case 1:
            mStepOne.classList.add('visible');
            break;
        case 2:
            mStepTwo.classList.add('visible');
            break;
        case 3:
            mStepThree.classList.add('visible');
            break;
        case 4:
            mStepFour.classList.add('visible');
            break;
        default: 
            console.log(`ERROR: Unable to re-display step ${window.currentStep}`);
    }
}

function displayLoadingIndicator() {

    // Hide any form displays and error messages
    mStepOne.classList.remove('visible');
    mStepTwo.classList.remove('visible');
    mStepThree.classList.remove('visible');
    mStepFour.classList.remove('visible');
    mErrorMessage.classList.remove('visible');

    // Show loading indicator only
    mLoadingIndicator.classList.add('visible');
}

export {
    backButtonPress,
    forwardButtonPress,
    displayStep,
    displayValidationError,
    displayApiError,
    displayLoadingIndicator,
}

