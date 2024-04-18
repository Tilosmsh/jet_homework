let map;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', fetchRestaurants);
});

function fetchRestaurants() {
    const postcode = document.getElementById('postcodeInput').value;
    // Assume you have a function to convert postcode to coordinates
    convertPostcodeToCoords(postcode, function(coords) {
        map.setCenter(coords);
        map.setZoom(13);  // Zoom closer for urban areas
    });

    // Your existing fetch logic here
    // After fetching data:
    .then(data => {
        displayRestaurants(data);  
        displayRestaurantMarkers(data);
    })
    // Error handling remains the same
}

function displayRestaurantMarkers(restaurants) {
    restaurants.forEach(restaurant => {
        const marker = new google.maps.Marker({
            position: { lat: restaurant.location.latitude, lng: restaurant.location.longitude },
            map: map,
            title: restaurant.name
        });
    });
}

// Ensure you have a way to get coordinates from postcodes
function convertPostcodeToCoords(postcode, callback) {
    // You would use an API or some service here to get coordinates
    // For demo, use a placeholder
    callback({ lat: 51.509865, lng: -0.118092 });
}
