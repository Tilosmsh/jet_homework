document.addEventListener('DOMContentLoaded', function() {
    fetchRestaurants(); // Fetch initially with default postcode
});

function fetchRestaurants() {
    const postcode = document.getElementById('postcodeInput').value;
    fetch(`https://jet-hommework.ew.r.appspot.com/restaurants/${postcode}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch data: ' + response.statusText); // Handle non-OK responses
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Add this to check what data you are actually receiving
            if (Array.isArray(data)) { // Assuming the API directly returns an array of restaurants
                displayRestaurants(data);
            } else if (data && data.restaurants) { // If data contains a property `restaurants`
                displayRestaurants(data.restaurants);
            } else {
                throw new Error("No restaurants data available");
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById('restaurant-list').innerHTML = `<p>Error fetching data: ${error.message}</p>`;
        });
}

function displayRestaurants(restaurants) {
    const list = document.getElementById('restaurant-list');
    list.innerHTML = ''; // Clear previous entries
    restaurants.forEach(restaurant => {
        const div = document.createElement('div');
        div.className = 'restaurant';
        div.innerHTML = `<h2>${restaurant.name}</h2>  // Ensure property names match those in the response
                         <p>Cuisines: ${restaurant.cuisines.map(cuisine => cuisine.name).join(', ')}</p>  // Assuming 'cuisines' is an array of objects
                         <p>Rating: ${restaurant.rating.starRating} Stars (${restaurant.rating.count} reviews)</p> // Assuming nested 'rating' object
                         <p>Address: ${restaurant.address.firstLine}, ${restaurant.address.city}</p>`; // Properly accessing the address object
        list.appendChild(div);
    });
}
