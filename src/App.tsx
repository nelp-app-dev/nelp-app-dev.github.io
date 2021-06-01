import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Loading } from './features/Loading/Loading';
import { RangeInput } from './features/RangeInput/RangeInput';
import { apiUrl, bellCenterPosition } from './config.json';
import { Hotel, HotelMarker } from './features/HotelMarker/HotelMarker';
import { LatLngTuple } from 'leaflet';
import queryString from 'query-string';
import axios, { CancelTokenSource } from 'axios';

let cancelTokenSource: CancelTokenSource;

export const App = () => {
  const [filters, setFilters] = useState({
    latitude: 45.5017,
    longitude: -73.5673,
    radius: 1000,
    rooms: 1,
    limit: 10,
    page: 1,
    checkin: '2021-06-10',
    checkout: '2021-06-12',
    language: 'en',
    currency: 'CAD',
    country: 'CA',
    min_price: localStorage.getItem('min_price') || 50,
    max_price: localStorage.getItem('max_price') || 300,
  });
  const [hotels, setHotels] = useState([] as Hotel[]);
  const [loading, setLoading] = useState(true);
  // const [values, setValues] = useState(JSON.parse(localStorage.getItem('values') || '[50, 300]'));

  useEffect(() => {
    setLoading(true);
    cancelTokenSource && cancelTokenSource.cancel();
    const CancelToken = axios.CancelToken;
    cancelTokenSource = CancelToken.source();

    axios
      .get(apiUrl + '?' + queryString.stringify(filters), {
        cancelToken: cancelTokenSource.token,
      })
      .then(({ data }) => {
        setLoading(false);
        setHotels(data.results);
      });
  }, [filters, setHotels]);

  return (
    <div>
      <Loading loading={loading} />
      <RangeInput
        min_price={+filters.min_price}
        max_price={+filters.max_price}
        setValues={(values: any) => {
          localStorage.setItem('min_price', JSON.stringify(values[0]));
          localStorage.setItem('max_price', JSON.stringify(values[1]));
          setFilters({
            ...filters,
            min_price: values[0],
            max_price: values[1],
          });
        }}
      />
      <MapContainer
        center={bellCenterPosition as LatLngTuple}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: '100vh' }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={bellCenterPosition as LatLngTuple}>
          <Popup>
            <h3>Bell Center</h3>
          </Popup>
        </Marker>
        {hotels.map((hotel) => (
          <HotelMarker key={hotel.id} hotel={hotel} />
        ))}
      </MapContainer>
    </div>
  );
};
