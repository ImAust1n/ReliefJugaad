import { MapContainer, TileLayer, ZoomControl, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import React, { CSSProperties, useEffect } from 'react';
import L from 'leaflet';

import { useDisasterStore } from '../store/useDisasterStore';
import { statesMap } from '../lib/utils';
// Fix for default marker icons in React Leaflet

export default function Map(props) {
  const {disasters} = useDisasterStore();

  const locations = disasters.map((item) => ({
      id: item._id,
      state: item.state,
      coordinates: [statesMap.states.find(state => state.name === item.state)?.latitude || 0, statesMap.states.find(state => state.name === item.state)?.longitude || 0],
      type: item.type,
    }));
  return (
    <MapContainer
      center={[20.5937, 78.9629]}
      zoom={4.3}
      zoomControl={true}
      style={{ height: props.height, width: '100%' }}
      className="rounded-lg shadow-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ZoomControl position="bottomright" />
      
      {locations.map((location) => (
        <Marker 
          key={location.id}
          position={location.coordinates}
        >
          <Popup>
            <div className="">
              <h3 className="font-bold text-l">{location.type}</h3>
              <p className="text-gray-600">{location.state}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}