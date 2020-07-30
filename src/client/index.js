// SRC js file
console.log('Javascript is connected!');

/* Import all stylesheets */
import './styles/reset.scss';
import './styles/base.scss';
import './styles/header.scss';
import './styles/form.scss';
import './styles/entry.scss';

/* Import and set image(s) */
import loadingIndicator from './assets/Cube-1s-200px.gif';
import placeholderImage from './assets/luggage.jpg';
import stepUpcoming from './assets/circle_outline_32dp_primary_dark.png';
import stepCompleted from './assets/circle_filled_32dp_primary_dark.png';
import airplane from './assets/airplane-32dp-777.png';


document.getElementById('step-one').setAttribute('src', stepCompleted);
document.getElementById('step-two').classList.add('current');
document.getElementById('step-two').setAttribute('src', airplane);
document.getElementById('step-three').setAttribute('src', stepUpcoming);
document.getElementById('step-four').setAttribute('src', stepUpcoming);

document.getElementById('upcoming').getElementsByTagName('img')[0].setAttribute('src', placeholderImage);