function validateDatesForErrors() {

    // Initiate error holder
    let errors = [];

    // Make sure valid from date
    let fromDate = document.querySelector('#date-from').value;
    if (fromDate) {
        fromDate = new Date(document.querySelector('#date-from').value);
        fromDate = Client.getDateAsNumber(fromDate);

        // Make sure from date is also after today
        const today = Client.getTodaysDate();
        if (fromDate <= today) {
            errors.push('\'From\' date must be after today\'s date');
        }

    } else {
        errors.push('Enter a \'from\' date');
    }

    // Make sure valid to date
    let toDate = document.querySelector('#date-to').value;
    if (toDate) {
        toDate = new Date(document.querySelector('#date-to').value);
        toDate = Client.getDateAsNumber(toDate);
        
        // Make sure to date is same or greater than from date
        if (fromDate && toDate < fromDate) {
            errors.push('\'To\' date must be same as or after \'from\' date');
        }

    } else {
        errors.push('Enter a \'to\' date');
    }

    return errors;
}