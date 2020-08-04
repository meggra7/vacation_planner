/**
 * @description Analyze and process data for step three (enter dates) in order to 
 * proceed to step four.
 */
export function processStepThree() {

    // First get reference to 'from' and 'to' dates
    const fromDate = document.querySelector('#date-from').value;
    const toDate = document.querySelector('#date-to').value;

    // Check for any validation errors
    const dateErrors = validateDatesForErrors(fromDate, toDate);

    // Make sure no errors in order to proceed
    if (dateErrors.length === 0) {

        // Update our entry builder with the dates
        Object.assign(window.entryBuilder, {fromDate, toDate});

        // Move to next step
        window.currentStep += 1;
        Client.displayStep(window.currentStep);

    } else {
        Client.displayValidationError(dateErrors);
    }
}

/**
 * @description Check user input to make sure dates entered and in the future, 
 * relative to today and each other.
 * @param {*} fromDate
 * @param {*} toDate
 * @returns Array of found errors
 */
function validateDatesForErrors(fromDate, toDate) {

    // Initiate error holder
    let errors = [];

    // Make sure valid from date
    if (fromDate) {
        fromDate = new Date(document.querySelector('#date-from').value);
        fromDate = Client.getDateAsNumber(fromDate);

        // Make sure from date is also after today
        const today = Client.getTodayAsNumber();
        if (fromDate <= today) {
            errors.push('\'From\' date must be after today\'s date');
        }

    } else {
        errors.push('Enter a \'from\' date');
    }

    // Make sure valid to date
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