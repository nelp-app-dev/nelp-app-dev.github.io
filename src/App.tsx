import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Loading } from './features/Loading/Loading';
import { RangeInput } from './features/RangeInput/RangeInput';
import { Hotel, HotelMarker } from './features/HotelMarker/HotelMarker';
import { LatLngTuple } from 'leaflet';
import ReactTooltip from 'react-tooltip';
import { Details } from './features/Details/Details';
import { formatDate, TODAY, TWO_DAY_FROM_NOW } from './utils/date';
import config from './config.json';
import { api } from './utils/axios';

const CENTER = [config.filters.latitude, config.filters.longitude] as LatLngTuple;

export const App = () => {
  const [filters, setFilters] = useState({
    ...config.filters,
    checkin: formatDate(TODAY),
    checkout: formatDate(TWO_DAY_FROM_NOW),
    minprice: localStorage.getItem('minprice') || config.filters.minprice,
    maxprice: localStorage.getItem('maxprice') || config.filters.maxprice,
  });
  const [hotels, setHotels] = useState([] as Hotel[]);
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState({} as Hotel);

  useEffect(() => {
    setLoading(true);
    api.get(filters).then((data) => {
      setLoading(false);
      setHotels(data.results);
    });
  }, [filters, setHotels]);

  return (
    <div style={{ position: 'relative' }}>
      <Loading loading={loading} />
      <Details details={details} onClose={() => setDetails({} as Hotel)} />
      <div
        style={{
          position: 'absolute',
          zIndex: 1000,
          backgroundColor: '#fff',
          padding: '20px',
          left: '50%',
          margin: '20px auto',
          marginLeft: '-150px',
          width: '300px',
          fontWeight: 200,
          textAlign: 'center',
          fontSize: '14px',
        }}
      >
        <div className="heading">Checkin - Checkout</div>
        <span style={{ fontSize: '11px' }}>
          {filters.checkin} - {filters.checkout}
        </span>
      </div>
      <ReactTooltip />
      <RangeInput
        minprice={+filters.minprice}
        maxprice={+filters.maxprice}
        setValues={(values: any) => {
          localStorage.setItem('minprice', JSON.stringify(values[0]));
          localStorage.setItem('maxprice', JSON.stringify(values[1]));
          setFilters({
            ...filters,
            minprice: values[0],
            maxprice: values[1],
          });
        }}
      />
      <MapContainer center={CENTER} zoom={13} scrollWheelZoom={false} style={{ height: '100vh' }}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={CENTER}>
          <Popup offset={[0, -10]}>
            <h3>Bell Center</h3>
          </Popup>
        </Marker>
        {hotels.map((hotel) => (
          <HotelMarker
            key={hotel.id}
            hotel={hotel}
            selected={hotel.id === details.id}
            setDetails={setDetails}
          />
        ))}
      </MapContainer>
    </div>
  );
};
