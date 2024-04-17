from flask import Flask, jsonify, request
import requests

app = Flask(__name__)

@app.route('/restaurants/<postcode>')
def get_restaurants(postcode):
    url = f'https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/{postcode}'
    response = requests.get(url)
    data = response.json()
    restaurants = data.get('restaurants', [])

    results = []
    for restaurant in restaurants[:10]:  # Limit to first 10 entries
        results.append({
            "Name": restaurant['name'],
            "Cuisines": ', '.join(restaurant['cuisines']),
            "Rating": restaurant.get('rating', {}).get('ratingValue', 'N/A'),
            "Address": restaurant.get('address', {}).get('full', 'No address provided')
        })
    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)
