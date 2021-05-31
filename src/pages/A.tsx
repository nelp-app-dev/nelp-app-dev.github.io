import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

export const A = () => {
  return (
    <div>
      <MapContainer
        center={[45.50076, -73.633767]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: '100vh' }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[45.50076, -73.633767]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};
