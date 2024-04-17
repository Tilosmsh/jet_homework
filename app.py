# from flask import Flask, jsonify, request
# import requests
# from requests.exceptions import JSONDecodeError

# app = Flask(__name__)

# @app.route('/restaurants/<postcode>')
# def get_restaurants(postcode):
#     headers = {
#     'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
#     }
#     url = f'https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/{postcode}'
#     response = requests.get(url, headers=headers)
#     print('API response: ')
#     print(response)
#     try:
#         data = response.json()
#     except JSONDecodeError:
#         print("Failed to decode JSON from response:")
#         print(response.text)
#         return None  # Or handle appropriately
#     print("Status Code:", response.status_code)
#     print("Response Content:", response.text)

    
#     restaurants = data.get('restaurants', [])
#     print('Restaurants: ')
#     print(restaurants)
#     results = []
#     for restaurant in restaurants[:10]:  # Limit to first 10 entries
#         results.append({
#             "Name": restaurant['name'],
#             "Cuisines": ', '.join(restaurant['cuisines']),
#             "Rating": restaurant.get('rating', {}).get('ratingValue', 'N/A'),
#             "Address": restaurant.get('address', {}).get('full', 'No address provided')
#         })

#     print('Results before jsonify: ')
#     print(results)
#     results = jsonify(results)
#     print('Results after jsonify: ')
#     print(results)
#     return results

# if __name__ == '__main__':
#     app.run(debug=True)
from flask import Flask, jsonify, request
import requests
from requests.exceptions import JSONDecodeError, RequestException

app = Flask(__name__)

@app.route('/restaurants/<postcode>')
def get_restaurants(postcode):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
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
    results = []
    for restaurant in restaurants[:10]:  # Limit to first 10 entries
        results.append({
            "Name": restaurant['name'],
            "Cuisines": ', '.join([cuisine['name'] for cuisine in restaurant.get('cuisines', [])]),
            "Rating": restaurant.get('rating', {}).get('starRating', 'N/A'),
            "Address": restaurant.get('address', {}).get('full', 'No address provided')
        })

    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)
