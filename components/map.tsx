'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Location } from '@/types';
import 'leaflet/dist/leaflet.css';


interface MapProps {
  locations: Location[];
}

export default function Map({ locations }: MapProps) {
  const center = locations[0]
    ? [locations[0].latitude, locations[0].longitude]
    : [44.4268, 26.1025]; // București default

  return (
    <MapContainer
      center={center as [number, number]}
      zoom={13}
      scrollWheelZoom={true}
      className="w-full h-full rounded-lg"
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.map((location) => (
        <Marker
          key={location.id}
          position={[location.latitude, location.longitude]}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-semibold">{location.name}</h3>
              <p className="text-sm">{location.address}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
