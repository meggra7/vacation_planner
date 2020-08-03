function getTodaysDate() {
    const today = new Date().valueOf();
    return getDateAsNumber(today);
}

function getDateAsNumber(dateValueInMilliseconds) {

    const millisecondsPerDay = 86400000;
    let dateAsNumber = dateValueInMilliseconds / millisecondsPerDay;
    dateAsNumber = Math.floor(dateAsNumber); // Round down to nearest integer

    return dateAsNumber;
}

function getDateRangeLength(fromDate, toDate) {

    // First convert date strings into date objects in milliseconds
    const fromDateInMilli = new Date(fromDate).getTime();
    const toDateInMilli = new Date(toDate).getTime();

    // Next, convert milliseconds to number of days
    const fromDateAsNumber = getDateAsNumber(fromDateInMilli);
    const toDateAsNumber = getDateAsNumber(toDateInMilli);

    // Return date range (including) by subtracting from and to dates plus one to include
    return toDateAsNumber - fromDateAsNumber + 1;
}

function getNumberOfDaysFromToday(date) {
    
    // First convert date string into date object in milliseconds
    const dateInMilli = new Date(date).getTime();

    // Next, convert milliseconds to number of days
    const dateAsNumber = getDateAsNumber(dateInMilli);

    // Return date range (excluding) by subtracting today from date
    return dateAsNumber - getTodaysDate();
}

/**
 * Takes a numeric date in format YYYY-MM-DD and returns the date in long form
 * with the month written out.
 * @param {} date 
 */
function getLongDate(date) {

    const year = date.slice(0,4);
    const monthNumber = date.slice(5,7);
    const day = date.slice(8);

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
    }

    return `${monthWord} ${day}, ${year}`;
}

export {
    getTodaysDate,
    getDateAsNumber,
    getDateRangeLength,
    getNumberOfDaysFromToday,
    getLongDate,
};