/* Import functions*/
import {
    showHeader,
    hideHeader,
    checkHeaderVisibility,
    scrollTo,
} from './js/layout.js';
export {
    showHeader,
    hideHeader,
    checkHeaderVisibility,
    scrollTo,
};

/* Import all stylesheets */
import './styles/reset.scss';
import './styles/base.scss';
import './styles/header.scss';
import './styles/form.scss';
import './styles/entry.scss';

/* Import image(s) */
import loadingIndicator from './media/Cube-1s-200px.gif';
import placeholderImage from './media/luggage.jpg';
import stepUpcoming from './media/circle_outline_32dp_primary_dark.png';
import stepCompleted from './media/circle_filled_32dp_primary_dark.png';
import airplane from './media/airplane-32dp-777.png';
import a01d from './media/weather-icons/a01d.png';
import c01d from './media/weather-icons/c01d.png';
import c02d from './media/weather-icons/c02d.png';
import c03d from './media/weather-icons/c03d.png';
import c04d from './media/weather-icons/c04d.png';
import d01d from './media/weather-icons/d01d.png';
import f01d from './media/weather-icons/f01d.png';
import r01d from './media/weather-icons/r01d.png';
import r03d from './media/weather-icons/r03d.png';
import r05d from './media/weather-icons/r05d.png';
import r06d from './media/weather-icons/r06d.png';
import s01d from './media/weather-icons/s01d.png';
import s02d from './media/weather-icons/s02d.png';
import s04d from './media/weather-icons/s04d.png';
import s05d from './media/weather-icons/s05d.png';
import s06d from './media/weather-icons/s06d.png';
import t01d from './media/weather-icons/t01d.png';
import t04d from './media/weather-icons/t04d.png';
import u00d from './media/weather-icons/u00d.png';




/* Set initial images */
document.getElementById('step-one').setAttribute('src', stepCompleted);
document.getElementById('step-two').classList.add('current');
document.getElementById('step-two').setAttribute('src', airplane);
document.getElementById('step-three').setAttribute('src', stepUpcoming);
document.getElementById('step-four').setAttribute('src', stepUpcoming);


document.getElementById('upcoming').getElementsByTagName('img')[0].setAttribute('src', placeholderImage);

const icons = document.getElementsByClassName('icon');
console.log(icons);
for (let i = 0; i < icons.length; i++) {
    switch (i) {
        case 0:
            icons[i].setAttribute('src', s02d);
            break;
        case 1:
            icons[i].setAttribute('src', c03d);
            break;
        case 2:
            icons[i].setAttribute('src', t01d);
            break;
        case 4:
            icons[i].setAttribute('src', c04d);
            break;
        default:
            icons[i].setAttribute('src', u00d);
    }
    
}



/* Set event listeners */
// Add listeners for both scroll and mouseover events to toggle the header visibility.
document.addEventListener('scroll', checkHeaderVisibility);
document.querySelector('header').addEventListener('mouseover', checkHeaderVisibility);

// Add listener to nav bar to override scroll behavior when clicked.
document.querySelector('header').addEventListener('click', scrollTo);



