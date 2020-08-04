# Travel App Capstone Project


## Objective
Demonstrate all skills learned during Udacity's Front End Web Developer Nanodegree Program.  This project requires you to build out a travel app that, at a minimum, obtains a desired trip location & date from the user, and displays weather and an image of the location using information obtained from external APIs.


## Features
Enter a city and select a country to retrieve a list of destinations.  Confirm your destination, enter the dates of your trip and your itinerary.

Upon saving, the app will log your trip details, retrieve weather forecast for the area, and a photo of your destination.

Non-required features implemented:
- Add end date of trip
- Pull image from state or country when image of city not found
- Pull forecast for multiple days (within 16 available from API)
- Incorporate icons into forecast
- Allow adding multiple trips, sorted by countdown


## Demonstrated Skills

### JavaScript
All code and dynamic function written in native Javascript.

### HTML and CSS/Sass
Page design and styling have been written in HTML and CSS, additionally including Sass features such as variables, nesting, modules, and inheritance.

### DOM Manipulation
This single page web app display is updated dynamically as user input is received and processed.

### Handling Brower Events
Event listeners are added for click events to handle user data input.

### Local Server configuration
A local server has been configured to handle API requests in order to securely make API calls while hiding any private data.

### External API integration
The project makes API calls to multiple external API providers in order to provide and display an informative trip summary to the user.

### Webpack
The site is loaded and built through Webpack and NPM libraries.  The project includes unique development and production build modes, and includes the use of multiple loaders and plugins.  Refer to package.json for the full list of dependencies used.

### Service Workers
Service workers have been added to cache website data for improved performance in the event of poor or no internet connection.


## Authors and acknowledgment
All code (HTML, CSS, JavaScript) original by Meghan Dunham.  APIs used include Geonames (verify location), WeatherBit (weather forecasts), and Pixabay (images).

