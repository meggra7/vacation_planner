/**
 * @description Analyze and process data for step two (confirm destination from
 * results list) in order to proceed to step three.
 */
export function processStepTwo() {

    // Get user selection
    const selection = getSelectedDestination();

    // Make sure user made a selection
    if (selection !== '') {

        // Update our entry builder with the selected destination
        const {city, state, country, lat, lon} = selection;
        Object.assign(window.entryBuilder, {city, state, country, lat, lon});

        // Move to next step
        window.currentStep += 1;
        Client.displayStep(window.currentStep);

    } else {
        // No selection made, display validation error
        Client.displayValidationError(['Select a destination option to continue.']);
    };
}

/**
 * @description Get reference to destination selections and locate selected option
 * @returns Selected destination object
 */
function getSelectedDestination() {

    // Get reference to options
    const options = document.getElementsByName('destination');

    // Initialize blank selection
    let selection = '';
    let index = 0;

    // Iterate over options until a selection is found or reach end of options
    while (selection === '' && index < options.length) {

        if (options[index].checked) {
            // Once checked option found, update selection
            selection = window.entryBuilder.resultsList[index];
        };
        index++;
    };

    return selection;
}