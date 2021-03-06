/* Import SETUP functions*/
import {
    checkHeaderVisibility,
    scrollTo,
    resetData,
    populateCountrySelections,
} from './js/setup.js';

/* Import DATE UTILS functions*/
import {
    getTodayAsNumber,
    getDateAsNumber,
    getDateRangeLength,
    getNumberOfDaysFromToday,
    getLongDate,
} from './js/date-utils.js';
export {
    getTodayAsNumber,
    getDateAsNumber,
    getDateRangeLength,
    getNumberOfDaysFromToday,
    getLongDate,
};

/* Import FORM functions */
import {
    backButtonPress,
    forwardButtonPress,
    displayStep,
    displayValidationError,
    displayApiError,
    displayLoadingIndicator,
    resetForm,
} from './js/form/layout-utils.js';
import {
    processStepOne,
} from './js/form/step-one.js';
import {
    processStepTwo,
} from './js/form/step-two.js';
import {
    processStepThree,
} from './js/form/step-three.js';
import {
    processStepFour,
} from './js/form/step-four.js';
import {
    processEntry,
} from './js/form/save.js';
import {
    displayUpcomingTrips,
} from './js/form/display.js';
export {
    backButtonPress,
    forwardButtonPress,
    displayStep,
    displayValidationError,
    displayApiError,
    displayLoadingIndicator,
    resetForm,
    processStepOne,
    processStepTwo,
    processStepThree,
    processStepFour,
    processEntry,
    displayUpcomingTrips,
};

/* Import all stylesheets */
import './styles/reset.scss';
import './styles/base.scss';
import './styles/header.scss';
import './styles/form.scss';
import './styles/entry.scss';
import './styles/footer.scss';

/* Import images */
import loadingIndicator from './media/Cube-1s-200px.gif';
import stepUpcoming from './media/circle_outline_32dp_primary_dark.png';
import stepCompleted from './media/circle_filled_32dp_primary_dark.png';
import airplane from './media/airplane-32dp-777.png';
import a01d from './media/weather-icons/a01d.png';
import c01d from './media/weather-icons/c01d.png';
import c02d from './media/weather-icons/c02d.png';
import c03d from './media/weather-icons/c03d.png';
import c04d from './media/weather-icons/c04d.png';
import d01d from './media/weather-icons/d01d.png';
import r01d from './media/weather-icons/r01d.png';
import r03d from './media/weather-icons/r03d.png';
import r05d from './media/weather-icons/r05d.png';
import s01d from './media/weather-icons/s01d.png';
import s02d from './media/weather-icons/s02d.png';
import s05d from './media/weather-icons/s05d.png';
import s06d from './media/weather-icons/s06d.png';
import t01d from './media/weather-icons/t01d.png';
import t04d from './media/weather-icons/t04d.png';
export {
    airplane,
    stepUpcoming,
    stepCompleted,
    a01d,
    c01d,
    c02d,
    c03d,
    c04d,
    d01d,
    r01d,
    r03d,
    r05d,
    s01d,
    s02d,
    s05d,
    s06d,
    t01d,
    t04d,
};



/* Add shortcut icon */
const link = document.createElement('link');
link.setAttribute('href', airplane);
link.setAttribute('rel', 'shortcut icon');
document.querySelector('head').appendChild(link);

/* Initial form setup */
populateCountrySelections();
document.getElementById('loading-indicator').setAttribute('src', loadingIndicator);
document.getElementById('progress-tracker-one').setAttribute('src', airplane);
document.getElementById('progress-tracker-one').classList.add('current');
document.getElementById('progress-tracker-two').setAttribute('src', stepUpcoming);
document.getElementById('progress-tracker-three').setAttribute('src', stepUpcoming);
document.getElementById('progress-tracker-four').setAttribute('src', stepUpcoming);


/* Set event listeners */

// Add listeners for both scroll and mouseover events to toggle the header visibility.
document.addEventListener('scroll', checkHeaderVisibility);
document.querySelector('header').addEventListener('mouseover', checkHeaderVisibility);

// Add listener to nav bar to override scroll behavior when clicked.
document.querySelector('header').addEventListener('click', scrollTo);

// Add listeners to form buttons
document.querySelector('#back-button').addEventListener('click', backButtonPress);
document.querySelector('#forward-button').addEventListener('click', forwardButtonPress);

// Add listener to load event to make sure data reset
window.addEventListener('load', resetData);