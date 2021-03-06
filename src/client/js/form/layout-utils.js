// Initialize app-global variables
window.LOCAL_SERVER_BASE_URL = 'http://localhost:8081';
window.entryBuilder = {}; // Will hold our entry to post
window.currentStep = 1; // Always begin at step 1

// Initialize file-global variables
const mStepOne = document.getElementById('step-one');
const mStepTwo = document.getElementById('step-two');
const mStepThree = document.getElementById('step-three');
const mStepFour = document.getElementById('step-four');
const mLoadingIndicator = document.getElementById('loading-indicator');
const mErrorMessage = document.getElementById('error-message');

/**
 * @description Process user event of pressing the back button
 */
function backButtonPress() {

    // Decrease step count
    window.currentStep -= 1;

    // Display new step
    displayStep(window.currentStep);
}

/**
 * @description Process user event of pressing the forward button
 */
function forwardButtonPress() {

    switch(window.currentStep) {
        case 1:
            Client.processStepOne();
            break;
        case 2:
            Client.processStepTwo();
            break;
        case 3:
            Client.processStepThree();
            break;
        case 4:
            Client.processStepFour();
            break;
        default:
            console.log(`ERROR: Unable to process forward button press`);
            return;
    };
}

/**
 * @description Update user interface by making current step visible in the form section
 * @param {*} stepNumber
 */
function displayStep(stepNumber) {

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
    };

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
    };

    // Re-display progress tracker
    progressTrackerContainer.classList.remove('hidden');

    // Hide loading indicator
    mLoadingIndicator.classList.remove('visible');

}

/**
 * @description Display a list of errors required to correct before continuing
 * to enter trip details.
 * @param {*} errors
 */
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

/**
 * @description Display an error message when any internal or external API calls
 * have failed.  Generally the result of server error.
 * @param {*} error
 */
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
    };
}

/**
 * @description Display the loading indicator while server and API calls are processing
 */
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

/**
 * @description Reset all form input fields and load step one
 */
function resetForm() {

    // Reformat global entry variable
    window.entryBuilder = {};

    // Clear step one city and country fields
    document.querySelector('#city').value = '';
    document.querySelector('#country').value = 'US';

    // Nothing to clear on step two - it dynamically populates each time

    // Clear step three date fields
    document.querySelector('#date-from').value = '';
    document.querySelector('#date-to').value = '';

    // Clear step four itinerary field
    document.querySelector('#itinerary-input').value = '';

    // Reset step number to 1 and display
    window.currentStep = 1;
    displayStep(window.currentStep);
}

export {
    backButtonPress,
    forwardButtonPress,
    displayStep,
    displayValidationError,
    displayApiError,
    displayLoadingIndicator,
    resetForm,
}

