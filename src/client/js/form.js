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
const mBackButton = document.getElementById('back-button');
const mForwardButton = document.getElementById('forward-button');
let mCurrentStep = 2; // DEBUGGING


function backButtonPress() {
    console.log(':: backButtonPress ::')
    mCurrentStep -= 1;

    goToStep(mCurrentStep);
}

function forwardButtonPress() {
    console.log(':: forwardButtonPress ::')
    mCurrentStep += 1;

    goToStep(mCurrentStep);
}

function goToStep(stepNumber) {
    console.log(`:: goToStep ${stepNumber} ::`)

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
            console.log(`ERROR: Unable to go to step number ${stepNumber}`)

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

export {
    backButtonPress,
    forwardButtonPress,
    goToStep
}

