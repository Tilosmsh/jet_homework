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
    restaurants.forEach(restaurant => {
        const div = document.createElement('div');
        div.className = 'restaurant';
        div.innerHTML = `<h2>${restaurant.Name}</h2>
                         <p>Cuisines: ${restaurant.Cuisines}</p>
                         <p>Rating: ${restaurant.Rating} Stars</p>
                         <p>Address: ${restaurant.Address}</p>`; // Make sure property names are correctly capitalized as per your log
        list.appendChild(div);
    });
}
