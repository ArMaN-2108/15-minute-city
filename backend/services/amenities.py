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
    overpass_query = f"""
    [out:json][timeout:15];
    (
      node["shop"~"supermarket|convenience|grocery"](around:1250, {lat}, {lon});
      node["amenity"~"hospital|clinic|doctors|pharmacy"](around:1250, {lat}, {lon});
      node["amenity"~"school|kindergarten|college|university"](around:1250, {lat}, {lon});
      node["leisure"~"park|garden"](around:1250, {lat}, {lon});
      way["leisure"~"park|garden"](around:1250, {lat}, {lon});
    );
    out center;
    """
    
    try:
        osm_resp = requests.post(overpass_url, data={'data': overpass_query}, headers=headers, timeout=15)
        if osm_resp.status_code == 200:
            data = osm_resp.json()
            elements = data.get("elements", [])
            print(f"DEBUG: OSM Elements Found: {len(elements)}")
            for element in elements:
                tags = element.get("tags", {})
                el_lat = element.get("lat") or element.get("center", {}).get("lat")
                el_lon = element.get("lon") or element.get("center", {}).get("lon")
                
                if el_lat is None or el_lon is None:
                    continue
                    
                name = tags.get("name", tags.get("shop", tags.get("amenity", tags.get("leisure", "Unknown Amenity"))))
                am = {"name": name, "lat": el_lat, "lon": el_lon}
                
                if tags.get("shop") in ["supermarket", "convenience", "grocery"]:
                    amenities["groceries"].append(am)
                elif tags.get("amenity") in ["hospital", "clinic", "doctors", "pharmacy"]:
                    amenities["healthcare"].append(am)
                elif tags.get("amenity") in ["school", "kindergarten", "college", "university"]:
                    amenities["education"].append(am)
                elif tags.get("leisure") in ["park", "garden"]:
                    amenities["parks"].append(am)
            
            print(f"DEBUG: Groceries: {len(amenities['groceries'])}, Health: {len(amenities['healthcare'])}, Education: {len(amenities['education'])}, Parks: {len(amenities['parks'])}")
    except requests.exceptions.RequestException as e:
        print(f"DEBUG: OSM Error: {e}")
        pass 
        
    return amenities
