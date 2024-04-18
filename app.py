from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
from requests.exceptions import JSONDecodeError, RequestException

app = Flask(__name__)
CORS(app, resources={r"/restaurants/*": {"origins": "https://tilosmsh.github.io"}})

@app.route('/restaurants/<postcode>')
def get_restaurants(postcode):
    headers = {
        'User-Agent': 'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
    }
    url = f'https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/{postcode}'
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()  # This will raise an HTTPError for bad responses (4XX, 5XX)
    except RequestException as e:
        print("Request failed:", e)
        return jsonify({"error": "Failed to fetch data from API"}), 500

    try:
        data = response.json()
    except JSONDecodeError:
        print("Failed to decode JSON from response:", response.text)
        return jsonify({"error": "Invalid JSON in response"}), 500

    restaurants = data.get('restaurants', [])

    # Filter words
    non_cuisines = {"Low Delivery Fee", "Deals", "Freebies"}


    print('Restaurants: ')
    print(restaurants)
    results = []
    for restaurant in restaurants[:10]:  # Limit to first 10 entries
        address = restaurant.get('address', {})
        formatted_address = f"{address.get('firstLine', 'No address provided')}, {address.get('city', 'City not provided')}, {address.get('postalCode', 'Postal code not provided')}"
        results.append({
            "Name": restaurant['name'],
            "Cuisines": ', '.join([cuisine['name'] for cuisine in restaurant.get('cuisines', []) if cuisine['name'] not in non_cuisines]),
            "Rating": restaurant.get('rating', {}).get('starRating', 'N/A'),
            "Address": formatted_address
        })
    print('Results: ')
    print(results)

    results = jsonify(results)
    print('jsonified results: ')
    print(results)
    return results

if __name__ == '__main__':
    app.run(debug=True)
