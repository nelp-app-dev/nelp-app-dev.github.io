import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, Tooltip } from 'react-leaflet';
import { Loading } from '../features/Loading/Loading';

interface Hotel {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  min_rates: { price: number };
}

const apiUrl =
  'https://api.stay22.com/v2/booking?latitude=45.5017&longitude=-73.5673&radius=1000&checkin=2021-06-10&checkout=2021-06-12&minprice=0&maxprice=1200&language=en&currency=CAD&guests=A,A&rooms=1&limit=3&page=1&country=CA';

export const B = () => {
  const [hotels, setHotels] = useState([] as Hotel[]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setHotels(data.results);
      });
  }, []);

  return (
    <div>
      <Loading loading={loading} />
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
        {hotels.map((hotel) => (
          <Marker key={hotel.id} position={[hotel.latitude, hotel.longitude]}>
            <Tooltip direction="top" offset={[-16, -15]} opacity={1} permanent>
              ${hotel.min_rates.price.toFixed(2)}
            </Tooltip>
            <Popup>
              <div style={{ textAlign: 'center' }}>
                <h2>{hotel.name}</h2>
                <p>Price:</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
