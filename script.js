document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('searchButton'); // Assuming you have this button in your HTML
    searchButton.addEventListener('click', fetchRestaurants);
});

function fetchRestaurants() {
    const postcode = document.getElementById('postcodeInput').value;
    // UK postcode regex pattern
    const postcodeRegex = /^[A-Z]{1,2}[0-9][0-9A-Z]?\s?[0-9][A-Z]{2}$/i;
    if (!postcodeRegex.test(postcode)) {
        alert("Please enter a valid UK postcode.");
        return;
    }

    fetch(`https://jet-hommework.ew.r.appspot.com/restaurants/${postcode}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch data: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (!Array.isArray(data)) {
                throw new Error("Received data is not an array");
            }
            displayRestaurants(data);  // Pass the data directly as it's already the array you need
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById('restaurant-list').innerHTML = `<p>Error fetching data: ${error.message}</p>`;
        });
}

function displayRestaurants(restaurants) {
    const list = document.getElementById('restaurant-list');
    list.innerHTML = ''; // Clear previous entries
    if (!restaurants || restaurants.length === 0) {
        list.innerHTML = '<p>No restaurants data available</p>';
        return;
    }
    if (Array.isArray(restaurants)) {
        for (let i = 0; i < restaurants.length; i++) {
            const div = document.createElement('div');
            div.className = 'restaurant';
            div.innerHTML = generateRestaurantHTML(restaurants[i]);
            list.appendChild(div);
        }
    } else {
        list.innerHTML = '<p>No valid restaurant data available</p>';
    }
}

function generateRestaurantHTML(restaurant) {
    return `<h2>${restaurant.Name}</h2>
            <p>Cuisines: ${restaurant.Cuisines}</p>
            <p>Rating: ${restaurant.Rating} Stars</p>
            <p>Address: ${restaurant.Address || 'No address provided'}</p>`;
}