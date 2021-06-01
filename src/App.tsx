import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Loading } from './features/Loading/Loading';
import { RangeInput } from './features/RangeInput/RangeInput';
import { apiUrl, bellCenterPosition } from './config.json';
import { Hotel, HotelMarker } from './features/HotelMarker/HotelMarker';
import { LatLngTuple } from 'leaflet';

export const App = () => {
  const [hotels, setHotels] = useState({ all: [] as Hotel[], filtered: [] as Hotel[] });
  const [loading, setLoading] = useState(true);
  const [values, setValues] = useState(JSON.parse(localStorage.getItem('values') || '[50, 300]'));

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setHotels({
          all: data.results,
          filtered: [],
        });
      });
  }, [setHotels]);

  useEffect(() => {
    let reRender = false;

    const inRangeHotels = hotels.all.filter(
      (hotel) => hotel.min_rates.price >= values[0] && hotel.min_rates.price <= values[1],
    );

    reRender =
      hotels.filtered
        .map((h) => h.id)
        .sort()
        .join(',') !==
      inRangeHotels
        .map((h) => h.id)
        .sort()
        .join(',');

    reRender &&
      setHotels({
        ...hotels,
        filtered: inRangeHotels,
      });
  }, [values, hotels]);

  return (
    <div>
      <Loading loading={loading} />
      <RangeInput
        values={values}
        setValues={(values: any) => {
          localStorage.setItem('values', JSON.stringify(values));
          setValues(values);
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
            <h3 style={{ textAlign: 'center' }}>Bell Center</h3>
          </Popup>
        </Marker>
        {hotels.filtered.map((hotel) => (
          <HotelMarker key={hotel.id} hotel={hotel} />
        ))}
      </MapContainer>
    </div>
  );
};
