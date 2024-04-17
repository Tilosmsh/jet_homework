document.addEventListener('DOMContentLoaded', function() {
    fetchRestaurants(); // Fetch initially with default postcode
});

function fetchRestaurants() {
    const postcode = document.getElementById('postcodeInput').value;
    fetch(`https://jet-hommework.ew.r.appspot.com/restaurants/${postcode}`)
        .then(response => response.json())
        .then(data => displayRestaurants(data))
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
        div.innerHTML = `<h2>${restaurant.Name}</h2>
                         <p>Cuisines: ${restaurant.Cuisines}</p>
                         <p>Rating: ${restaurant.Rating}</p>
                         <p>Address: ${restaurant.Address}</p>`;
        list.appendChild(div);
    });
}
