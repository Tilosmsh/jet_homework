document.addEventListener('DOMContentLoaded', function() {
    fetchRestaurants(); // Fetch initially with default postcode
});

function fetchRestaurants() {
    const postcode = document.getElementById('postcodeInput').value;
    fetch(`https://jet-hommework.ew.r.appspot.com/restaurants/${postcode}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch data: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log("Data received:", data);
            if (!data || !Array.isArray(data)) {
                throw new Error("Received data is not an array");
            }
            displayRestaurants(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById('restaurant-list').innerHTML = `<p>Error fetching data: ${error.message}</p>`;
        });
}

function displayRestaurants(restaurants) {
    const list = document.getElementById('restaurant-list');
    list.innerHTML = ''; // Clear previous entries
    if (!restaurants) {
        list.innerHTML = '<p>No restaurants data available</p>';
        return;
    }
    restaurants.forEach(restaurant => {
        const div = document.createElement('div');
        div.className = 'restaurant';
        div.innerHTML = `<h2>${restaurant.name}</h2>
                         <p>Cuisines: ${restaurant.cuisines.map(cuisine => cuisine.name).join(', ')}</p>
                         <p>Rating: ${restaurant.rating.starRating} Stars (${restaurant.rating.count} reviews)</p>
                         <p>Address: ${restaurant.address.firstLine}, ${restaurant.address.city}</p>`;
        list.appendChild(div);
    });
}
