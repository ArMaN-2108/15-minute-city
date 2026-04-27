import requests
import json

lat, lon = 51.518887, -0.078479 # E1 6AN
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

headers = {
    "User-Agent": "15MinCityScorecard/1.0",
    "Accept": "application/json"
}

print(f"Testing Overpass for {lat}, {lon}...")
response = requests.post(overpass_url, data={'data': overpass_query}, headers=headers)
print(f"Status Code: {response.status_code}")
try:
    data = response.json()
    elements = data.get("elements", [])
    print(f"Elements found: {len(elements)}")
    if elements:
        print("First 3 elements:")
        for el in elements[:3]:
            print(f" - {el.get('tags', {}).get('name')} ({el.get('tags', {}).get('shop') or el.get('tags', {}).get('amenity')})")
except Exception as e:
    print(f"Error parsing JSON: {e}")
    print(response.text[:500])
