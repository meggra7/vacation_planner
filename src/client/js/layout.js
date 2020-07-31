const mHeader = document.querySelector('header');
let mHeaderVisibilityTimeout;


function showHeader() {
    mHeader.classList.remove('hidden');
    mHeader.classList.add('visible');
}

function hideHeader() {
    mHeader.classList.remove('visible');
    mHeader.classList.add('hidden');
}

/**
 * @description Toggle header to only be visible if user is at top of page, is scrolling, or
 * mouses over the top of the page.
 */
function checkHeaderVisibility() {

    // Make sure header is visible and clear any prior timeouts
    showHeader();
    window.clearTimeout(mHeaderVisibilityTimeout);

    // Set timeout to hide header once scrolling has stopped
    mHeaderVisibilityTimeout = setTimeout(function() {
        console.log(':: mHeaderVisibilityTimeout called ::')

        // If user is not at top of page, hide header
        if (pageYOffset > 45) {
            hideHeader();
        }

    }, 2000); // Hide after 2 seconds
}

/**
 * @description Custom scroll behavior to scroll smoothly to clicked link.
 */
function scrollTo(event) {
    // Cancel automatic 'jumping' to link location
    event.preventDefault();

    // Get the location of the desired section and scroll smoothly into view
    const anchorId = event.target.getAttribute('href');
    document.querySelector(anchorId).scrollIntoView({
        behavior: 'smooth'
    });
}

export {
    showHeader,
    hideHeader,
    checkHeaderVisibility,
    scrollTo,
};

