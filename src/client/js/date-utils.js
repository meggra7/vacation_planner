/**
 * @description Takes a date and gets date number since January 1, 1970, UTC
 * @param {string} date YYYY-MM-DD
 * @returns {number}
 */
function getDateAsNumber(date) {

    // Create new date object in milliseconds
    const dateInMilli = new Date(date).getTime();

    // Divide by milliseconds per day to get date number
    const millisecondsPerDay = 86400000;
    let dateAsNumber = dateInMilli / millisecondsPerDay;

    // Round down to nearest integer
    dateAsNumber = Math.floor(dateAsNumber); 

    return dateAsNumber;
}

/**
 * @description Gets today as a date number since January 1, 1970, UTC
 * @returns {number}
 */
function getTodayAsNumber() {
    const today = new Date();
    return getDateAsNumber(today);
}

/**
 * @description Calculates the number of days (including) between two dates
 * @param {string} fromDate YYYY-MM-DD
 * @param {string} toDate YYYY-MM-DD
 * @returns {number}
 */
function getDateRangeLength(fromDate, toDate) {

    // Convert dates to number of days
    const fromDateAsNumber = getDateAsNumber(fromDate);
    const toDateAsNumber = getDateAsNumber(toDate);

    // Return date range (including) by subtracting from and to dates plus one to include
    return toDateAsNumber - fromDateAsNumber + 1;
}


/**
 * @description Calculates the number of days (excluding) from today
 * @param {string} date YYYY-MM-DD
 * @returns {number}
 */
function getNumberOfDaysFromToday(date) {

    // Convert date to number of days
    const dateAsNumber = getDateAsNumber(date);

    // Return date range (excluding) by subtracting today from date
    return dateAsNumber - getTodayAsNumber();
}

/**
 * @description Formats a short date into a long, readable format
 * with the month written out.
 * @param {string} date YYYY-MM-DD
 * @returns {string}
 */
function getLongDate(date) {

    // Pull the year portion of the date
    const year = date.slice(0,4);

    // Pull the month portion of the date and convert to word
    const monthNumber = date.slice(5,7);
    let monthWord = '';
    switch (monthNumber) {
        case '01':
            monthWord = 'January';
            break;
        case '02':
            monthWord = 'February';
            break;
        case '03':
            monthWord = 'March';
            break;
        case '04':
            monthWord = 'April';
            break;
        case '05':
            monthWord = 'May';
            break;
        case '06':
            monthWord = 'June';
            break;
        case '07':
            monthWord = 'July';
            break;
        case '08':
            monthWord = 'August';
            break;
        case '09':
            monthWord = 'September';
            break;
        case '10':
            monthWord = 'October';
            break;
        case '11':
            monthWord = 'November';
            break;
        case '12':
            monthWord = 'December';
            break;
        default:
            monthWord = 'error';
            break;
    };

    // Pull the day portion of the date
    let day = date.slice(8);
    if (day.slice(0,1) === '0') {
        // Remove any leading zeros
        day = day.slice(1);
    };

    return `${monthWord} ${day}, ${year}`;
}

export {
    getTodayAsNumber,
    getDateAsNumber,
    getDateRangeLength,
    getNumberOfDaysFromToday,
    getLongDate,
};