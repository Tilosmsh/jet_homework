from flask import Flask, jsonify, request
import requests
from requests.exceptions import JSONDecodeError

app = Flask(__name__)

@app.route('/restaurants/<postcode>')
def get_restaurants(postcode):
    headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
    }
    url = f'https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/{postcode}'
    response = requests.get(url, headers=headers)
    print('API response: ')
    print(response)
    try:
        data = response.json()
    except JSONDecodeError:
        print("Failed to decode JSON from response:")
        print(response.text)
        return None  # Or handle appropriately
    print("Status Code:", response.status_code)
    print("Response Content:", response.text)

    
    restaurants = data.get('restaurants', [])
    print('Restaurants: ')
    print(restaurants)
    results = []
    for restaurant in restaurants[:10]:  # Limit to first 10 entries
        print('Restaurant: ')
        print(restaurant)
        results.append({
            "Name": restaurant['name'],
            "Cuisines": ', '.join(restaurant['cuisines']),
            "Rating": restaurant.get('rating', {}).get('ratingValue', 'N/A'),
            "Address": restaurant.get('address', {}).get('full', 'No address provided')
        })
    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)
