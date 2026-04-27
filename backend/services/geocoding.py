import requests
from functools import lru_cache

@lru_cache(maxsize=1000)
def get_coordinates(postcode):
    """
    Fetches coordinates for a given postcode from postcodes.io.
    Returns {"lat": lat, "lon": lon} if valid and inside London.
    Returns None otherwise.
    """
    try:
        # Validate and clean postcode
        clean_postcode = postcode.strip().replace(" ", "")
        
        # 5 second timeout for basic resilience
        response = requests.get(f"https://api.postcodes.io/postcodes/{clean_postcode}", timeout=5)
        
        if response.status_code == 200:
            data = response.json().get("result", {})
            
            # Ensure the postcode falls within Greater London
            # postcodes.io maps Greater London postcodes with region='London'
            if data.get("region") != "London":
                return None
                
            return {
                "lat": data.get("latitude"),
                "lon": data.get("longitude")
            }
        return None
    except requests.exceptions.RequestException:
        # On timeout or network error, return None to trigger 404/400 fallback
        return None
