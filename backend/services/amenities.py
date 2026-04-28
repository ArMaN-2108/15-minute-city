import requests
# from functools import lru_cache

# @lru_cache(maxsize=1000)
def get_amenities_for_centroid(lat, lon):
    """
    Fetches nearby amenities for a given coordinate.
    Uses TfL Unified API for transport and OSM Overpass for other categories.
    """
    amenities = {
        "transport": [],
        "groceries": [],
        "healthcare": [],
        "education": [],
        "parks": []
    }
    
    headers = {
        "User-Agent": "15MinCityScorecard/1.0 (https://arman.com)",
        "Accept": "application/json"
    }
    
    # 1. Fetch Transport from TfL Unified API (1000m radius max)
    try:
        tfl_url = f"https://api.tfl.gov.uk/StopPoint?lat={lat}&lon={lon}&stopTypes=NaptanMetroStation,NaptanRailStation,NaptanPublicBusCoachTram&radius=1000"
        tfl_resp = requests.get(tfl_url, headers=headers, timeout=5)
        if tfl_resp.status_code == 200:
            data = tfl_resp.json()
            for stop in data.get("stopPoints", []):
                amenities["transport"].append({
                    "name": stop.get("commonName", "Transport Stop"),
                    "lat": stop.get("lat"),
                    "lon": stop.get("lon")
                })
    except requests.exceptions.RequestException:
        pass 
        
    # 2. Fetch others from OpenStreetMap Overpass API
    overpass_url = "https://overpass-api.de/api/interpreter"
    # Using nwr (node, way, relation) to capture areas (like parks/schools) as well as points.
    overpass_query = f"""
    [out:json][timeout:25];
    (
      nwr["shop"~"supermarket|convenience|grocery|bakery|butcher|greengrocer"](around:1250, {lat}, {lon});
      nwr["amenity"~"hospital|clinic|doctors|pharmacy|dentist|optician"](around:1250, {lat}, {lon});
      nwr["amenity"~"school|kindergarten|college|university|library"](around:1250, {lat}, {lon});
      nwr["leisure"~"park|garden|playground|nature_reserve|recreation_ground"](around:1250, {lat}, {lon});
      nwr["landuse"~"grass|recreation_ground"](around:1250, {lat}, {lon});
    );
    out center;
    """
    
    try:
        osm_resp = requests.post(overpass_url, data={'data': overpass_query}, headers=headers, timeout=25)
        if osm_resp.status_code == 200:
            data = osm_resp.json()
            elements = data.get("elements", [])
            import logging
            logging.info(f"DEBUG: OSM Elements Found: {len(elements)}")
            
            # Categories for sorting
            grocery_tags = ["supermarket", "convenience", "grocery", "bakery", "butcher", "greengrocer"]
            health_tags = ["hospital", "clinic", "doctors", "pharmacy", "dentist", "optician"]
            edu_tags = ["school", "kindergarten", "college", "university", "library"]
            park_tags = ["park", "garden", "playground", "nature_reserve", "recreation_ground"]

            for element in elements:
                tags = element.get("tags", {})
                el_lat = element.get("lat") or element.get("center", {}).get("lat")
                el_lon = element.get("lon") or element.get("center", {}).get("lon")
                
                if el_lat is None or el_lon is None:
                    continue
                    
                name = tags.get("name", tags.get("shop", tags.get("amenity", tags.get("leisure", tags.get("landuse", "Unknown Amenity")))))
                am = {"name": name, "lat": el_lat, "lon": el_lon}
                
                # Check category based on tags
                shop = tags.get("shop")
                amenity = tags.get("amenity")
                leisure = tags.get("leisure")
                landuse = tags.get("landuse")

                if shop in grocery_tags:
                    amenities["groceries"].append(am)
                elif amenity in health_tags:
                    amenities["healthcare"].append(am)
                elif amenity in edu_tags:
                    amenities["education"].append(am)
                elif leisure in park_tags or landuse in ["grass", "recreation_ground"]:
                    amenities["parks"].append(am)
            
            logging.info(f"DEBUG: Groceries: {len(amenities['groceries'])}, Health: {len(amenities['healthcare'])}, Education: {len(amenities['education'])}, Parks: {len(amenities['parks'])}")
    except requests.exceptions.RequestException as e:
        logging.error(f"DEBUG: OSM Error: {e}")
        pass 
        
    return amenities
