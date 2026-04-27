from flask import Flask, jsonify
from flask_cors import CORS

from services.geocoding import get_coordinates
from services.amenities import get_amenities_for_centroid
from utils.scoring import build_response

app = Flask(__name__)
# Enable CORS for all routes (stateless backend)
CORS(app)

@app.route('/score/<postcode>', methods=['GET'])
def score_postcode(postcode):
    try:
        # 1. Geocoding & Validation
        # The geocoding service is responsible for determining if the postcode is valid
        # and checking if it falls within the Greater London boundary.
        centroid = get_coordinates(postcode)
        
        if not centroid:
            return jsonify({
                "error": "Postcode not found or outside Greater London boundary."
            }), 404
            
        # 2. Amenities Retrieval
        # Fetches from TfL Unified API and OSM Overpass API
        # with basic in-memory caching and timeouts built-in.
        amenities_by_category = get_amenities_for_centroid(centroid['lat'], centroid['lon'])
        
        # 3. Scoring Engine
        # Calculates distances, applies the distance decay, 
        # and aggregates scores via Weighted Sum Model (WSM).
        response_data = build_response(postcode.upper(), centroid, amenities_by_category)
        
        return jsonify(response_data), 200

    except Exception as e:
        # Catch unexpected issues (e.g. API timeouts that bubbled up)
        return jsonify({
            "error": f"An error occurred while processing the request: {str(e)}"
        }), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
