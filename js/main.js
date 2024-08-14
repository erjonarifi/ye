document.addEventListener('DOMContentLoaded', () => {
    const notification = document.getElementById('notification');
    const notificationMessage = document.getElementById('notification-message');
    const notificationStatus = document.getElementById('notification-status');
    const notificationClose = document.getElementById('notification-close');
    const topUl = document.querySelector('.topUl');
    const mrenaa = document.querySelector('.mrenaa');

    // Function to show notification
    function showNotification(message, status) {
        notificationMessage.textContent = message;
        notificationStatus.textContent = status;
        notification.classList.add('notification-show');
    }

    // Function to hide notification
    function hideNotification() {
        notification.classList.remove('notification-show');
    }

    // Copy text and show notification
    document.querySelectorAll('.topUl .copyable, .mrenaa .copyable').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default link behavior
            const text = item.querySelector('a').getAttribute('data-copy-text');
            navigator.clipboard.writeText(text).then(() => {
                showNotification(`Numri i celularit ${text}`, 'është kopjuar');

                // Auto-hide the notification after 3 seconds
                setTimeout(() => {
                    hideNotification();
                }, 3000);
            }).catch(err => console.error('Failed to copy text: ', err));
        });
    });

    // Close button functionality
    notificationClose.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent the click event from bubbling up
        hideNotification();
    });

    // Close notification when clicking outside
    document.addEventListener('click', (e) => {
        if (!notification.contains(e.target) && !topUl.contains(e.target) && !mrenaa.contains(e.target)) {
            hideNotification();
        }
    });

    // Prevent closing when clicking inside the notification
    notification.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent the click event from bubbling up
    });

    // Select elements
    const menuIcon = document.getElementById('menu');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMenuIcon = document.getElementById('closeMenu');
    const mobileMenuExtra = document.getElementById('mobileMenuExtra');
    const closeMenuExtraIcon = document.getElementById('closeMenuExtra');

    // Event listener to open mobile menu
    menuIcon.addEventListener('click', () => {
        if (window.innerWidth <= 540) {
            mobileMenuExtra.classList.add('open');
        } else {
            mobileMenu.classList.add('open');
        }
    });

    // Event listener to close mobile menu
    closeMenuIcon.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
    });

    // Event listener to close mobile menu extra
    closeMenuExtraIcon.addEventListener('click', () => {
        mobileMenuExtra.classList.remove('open');
    });

});

// Getting all required elements
const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".icon");
let linkTag = searchWrapper.querySelector("a");
let selectedSuggestion = '';

// If user presses any key and releases
inputBox.addEventListener('keyup', (e) => {
    let userData = e.target.value; // User entered data
    let emptyArray = [];
    if (userData) {
        emptyArray = suggestions.filter((data) => {
            // Filtering array value and user characters to lowercase
            return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
        });
        emptyArray = emptyArray.map((data) => {
            // Creating an HTML link for each suggestion
            let fileName = data.toLocaleLowerCase().replace(/\s+/g, '') + ".html";
            return `<li data-file="${fileName}">${data}</li>`;
        });
        searchWrapper.classList.add("active"); // Show autocomplete box
        showSuggestions(emptyArray);
    } else {
        searchWrapper.classList.remove("active"); // Hide autocomplete box
    }
});

// Handle clicks on suggestions
suggBox.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        selectedSuggestion = e.target.dataset.file; // Store the file name
        inputBox.value = e.target.textContent; // Fill input box with selected suggestion
        searchWrapper.classList.remove("active"); // Hide autocomplete box
    }
});

// Handle clicks outside the search box and suggestions
document.addEventListener('mousedown', (e) => {
    if (!searchWrapper.contains(e.target)) {
        // Clicked outside the search box and suggestions
        if (inputBox.value) {
            selectedSuggestion = inputBox.value.toLocaleLowerCase().replace(/\s+/g, '') + ".html";
        }
        searchWrapper.classList.remove("active"); // Hide autocomplete box
    }
});

// Handle the icon click
icon.addEventListener('click', () => {
    if (selectedSuggestion) {
        let webLink = selectedSuggestion;
        linkTag.setAttribute("href", webLink);
        linkTag.click();
    }
});

// Handle Enter key press
inputBox.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        if (selectedSuggestion) {
            let webLink = selectedSuggestion;
            linkTag.setAttribute("href", webLink);
            linkTag.click();
        }
    }
});

function showSuggestions(list) {
    if (list.length) {
        suggBox.innerHTML = list.join(''); // Display suggestions
    } else {
        suggBox.innerHTML = ''; // Ensure no content is shown if no suggestions
        searchWrapper.classList.remove("active"); // Hide autocomplete box
    }
}
