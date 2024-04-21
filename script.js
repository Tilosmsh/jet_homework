document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', fetchRestaurants); // Setup event listener correctly
});

function fetchRestaurants() {
    const postcode = document.getElementById('postcodeInput').value;
    const postcodeRegex = /^[A-Z]{1,2}[0-9][0-9A-Z]?\s?[0-9][A-Z]{2}$/i; // Validate UK postcodes
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
            displayRestaurants(data);  // Assuming data is the array of restaurants
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

    restaurants.forEach(restaurant => {
        const div = document.createElement('div');
        div.className = 'restaurant';
        div.innerHTML = generateRestaurantHTML(restaurant);
        list.appendChild(div);
    });
}

function generateRestaurantHTML(restaurant) {
    return `
        <div class="restaurant-logo">
            <img src="${restaurant.LogoUrl}" alt="${restaurant.Name} Logo">
        </div>
        <h2>${restaurant.Name}</h2>
        <p>Cuisines: ${restaurant.Cuisines}</p>
        <p>Rating: ${restaurant.Rating} Stars</p>
        <p>Address: ${restaurant.Address || 'No address provided'}</p>`;
}
