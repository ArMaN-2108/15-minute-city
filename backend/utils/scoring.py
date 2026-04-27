import math

# Equity weights for the Weighted Sum Model (WSM)
WEIGHTS = {
    "transport": 0.30,
    "groceries": 0.25,
    "healthcare": 0.20,
    "education": 0.15,
    "parks": 0.10
}

def haversine_distance(lat1, lon1, lat2, lon2):
    """
    Calculate the great circle distance between two points 
    on the earth (specified in decimal degrees).
    Returns distance in kilometers.
    """
    # Convert decimal degrees to radians 
    lon1, lat1, lon2, lat2 = map(math.radians, [lon1, lat1, lon2, lat2])

    # Haversine formula 
    dlon = lon2 - lon1 
    dlat = lat2 - lat1 
    a = math.sin(dlat/2)**2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon/2)**2
    c = 2 * math.asin(math.sqrt(a)) 
    r = 6371 # Radius of earth in kilometers
    return c * r

def calculate_amenity_score(distance):
    """
    Apply distance decay formula: Score = max(0, 1 - (distance / 1.25)) * 10
    """
    return max(0.0, 1.0 - (distance / 1.25)) * 10.0

def process_category(centroid, amenities):
    """
    Process a list of amenities for a category.
    - Filters amenities further than 1.25km.
    - Calculates the distance decay score.
    - The category score is determined by the closest valid amenity (max score).
    """
    lat1, lon1 = centroid['lat'], centroid['lon']
    
    valid_amenities = []
    max_score = 0.0
    
    for am in amenities:
        dist = haversine_distance(lat1, lon1, am['lat'], am['lon'])
        if dist <= 1.25:
            score = calculate_amenity_score(dist)
            # Add to valid list for frontend mapping
            valid_amenities.append({
                **am,
                'distance_km': round(dist, 3),
                'score': round(score, 2)
            })
            if score > max_score:
                max_score = score
                
    return {
        "score": round(max_score, 1),
        "amenities_found": len(valid_amenities),
        "amenities_list": valid_amenities  # Provided to React for Leaflet mapping
    }

def calculate_overall_index(categories_data):
    """
    Aggregate the category sub-scores using a Weighted Sum Model (WSM).
    Returns a score out of 100.
    """
    overall_score = 0.0
    for cat, data in categories_data.items():
        weight = WEIGHTS.get(cat, 0)
        # category score is out of 10.
        overall_score += data['score'] * weight
        
    # overall_score is max 10. Multiply by 10 for a 0-100 scale.
    return round(overall_score * 10, 1)

def build_response(postcode, centroid, amenities_by_category):
    """
    Constructs the final JSON payload according to the spec.
    """
    categories = {}
    for cat in WEIGHTS.keys():
        categories[cat] = process_category(centroid, amenities_by_category.get(cat, []))
        
    overall_score = calculate_overall_index(categories)
    
    return {
        "postcode": postcode,
        "coordinates": centroid,
        "overall_score": overall_score,
        "categories": categories
    }
