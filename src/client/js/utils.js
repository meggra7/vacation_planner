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

export {
    getTodaysDate,
    getDateAsNumber,
};