function getTodayAsNumber() {
    const today = new Date();
    return getDateAsNumber(today);
}

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

function getDateRangeLength(fromDate, toDate) {

    // Convert dates to number of days
    const fromDateAsNumber = getDateAsNumber(fromDate);
    const toDateAsNumber = getDateAsNumber(toDate);

    // Return date range (including) by subtracting from and to dates plus one to include
    return toDateAsNumber - fromDateAsNumber + 1;
}

function getNumberOfDaysFromToday(date) {

    // Convert date to number of days
    const dateAsNumber = getDateAsNumber(date);

    // Return date range (excluding) by subtracting today from date
    return dateAsNumber - getTodayAsNumber();
}

/**
 * Takes a numeric date in format YYYY-MM-DD and returns the date in long form
 * with the month written out.
 * @param {} date 
 */
function getLongDate(date) {

    const year = date.slice(0,4);
    const monthNumber = date.slice(5,7);
    let day = date.slice(8);
    if (day.slice(0,1) === '0') {
        // Remove any leading zeros
        day = day.slice(1);
    }

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
    getTodayAsNumber,
    getDateAsNumber,
    getDateRangeLength,
    getNumberOfDaysFromToday,
    getLongDate,
};