document.addEventListener('DOMContentLoaded', function() {
    const postcode = 'EC4M7RF'; // Example postcode
    fetch(`http://localhost:5000/restaurants/${postcode}`)  // Adjust URL based on where your Flask app is hosted
        .then(response => response.json())
        .then(data => displayRestaurants(data))
        .catch(error => console.error('Error fetching data:', error));
});
