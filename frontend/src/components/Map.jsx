import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet's default icon path issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom Icon for Centroid (Black for contrast)
const centroidIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Category Icons Mapping
const categoryIcons = {
  transport: new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  }),
  groceries: new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  }),
  healthcare: new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  }),
  education: new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  }),
  parks: new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  })
};

// Component to recenter map when coordinates change
function ChangeView({ center, selectedAmenity }) {
  const map = useMap();
  useEffect(() => {
    map.invalidateSize();
    if (selectedAmenity) {
      map.flyTo([selectedAmenity.lat, selectedAmenity.lon], 16, { duration: 1.5 });
    } else {
      map.flyTo(center, 15, { duration: 1 });
    }
  }, [center, selectedAmenity, map]);
  return null;
}

const Map = ({ coordinates, categories, selectedCategory, selectedAmenity }) => {
  const center = [coordinates.lat, coordinates.lon];
  
  // Extract all amenities from categories
  const allAmenities = [];
  Object.keys(categories).forEach(catKey => {
    const list = categories[catKey].amenities_list || [];
    list.forEach(am => {
      // Logic for filtering:
      // 1. If an individual amenity is selected, only show that specific one.
      // 2. Otherwise, if a category is selected, only show that category.
      // 3. Otherwise, show everything.
      
      let shouldShow = true;
      if (selectedAmenity) {
        shouldShow = am.lat === selectedAmenity.lat && am.lon === selectedAmenity.lon;
      } else if (selectedCategory) {
        shouldShow = catKey === selectedCategory;
      }
      
      if (shouldShow) {
        allAmenities.push({ ...am, category: catKey });
      }
    });
  });

  return (
    <div style={{ height: '100%', minHeight: '400px', width: '100%', borderRadius: 'var(--radius-2xl)', overflow: 'hidden' }}>
      <MapContainer center={center} zoom={15} style={{ height: '100%', width: '100%' }}>
        <ChangeView center={center} selectedAmenity={selectedAmenity} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Postcode Centroid Marker */}
        <Marker position={center} icon={centroidIcon}>
          <Popup>
            <strong style={{ fontFamily: 'Inter' }}>Your Postcode</strong>
          </Popup>
        </Marker>
        
        {/* Amenity Markers */}
        {allAmenities.map((am, index) => (
          <Marker 
            key={`${am.category}-${index}`} 
            position={[am.lat, am.lon]} 
            icon={categoryIcons[am.category] || categoryIcons.transport}
          >
            <Popup>
              <div style={{ fontFamily: 'Inter' }}>
                <strong style={{ color: 'var(--primary)' }}>{am.name}</strong><br/>
                <span style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', opacity: 0.7 }}>
                  {am.category}
                </span><br/>
                <span style={{ fontSize: '11px' }}>
                  Distance: {am.distance_km ? (am.distance_km * 1000).toFixed(0) : '0'}m
                </span>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
