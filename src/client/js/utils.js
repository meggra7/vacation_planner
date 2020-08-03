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

export {
    getTodaysDate,
    getDateAsNumber,
    getDateRangeLength,
};