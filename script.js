
document.addEventListener('DOMContentLoaded', function() {
    const postcode = 'EC4M 7RF'; // Example postcode
    fetch(`https://jet-hommework.ew.r.appspot.com/restaurants/${postcode}`)
        .then(response => response.json())
        .then(data => displayRestaurants(data))
        .catch(error => console.error('Error fetching data:', error));
});

function displayRestaurants(restaurants) {
    const list = document.getElementById('restaurant-list');
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
