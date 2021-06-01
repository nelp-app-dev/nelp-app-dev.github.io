import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Loading } from './features/Loading/Loading';
import { RangeInput } from './features/RangeInput/RangeInput';
import { apiUrl, bellCenterPosition } from './config.json';
import { Hotel, HotelMarker } from './features/HotelMarker/HotelMarker';
import { LatLngTuple } from 'leaflet';
import queryString from 'query-string';
import axios, { CancelTokenSource } from 'axios';
import ReactTooltip from 'react-tooltip';
import { Details } from './features/Details/Details';

function formatDate(date: Date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('/');
}

let cancelTokenSource: CancelTokenSource;

const TODAY = new Date();
const TWO_DAY_FROM_NOW = new Date(TODAY.getTime() + 60 * 60 * 48 * 1000);

export const App = () => {
  const [filters, setFilters] = useState({
    latitude: 45.50076,
    longitude: -73.633767,
    checkin: formatDate(TODAY),
    checkout: formatDate(TWO_DAY_FROM_NOW),
    radius: 10000,
    rooms: 1,
    limit: 50,
    page: 1,
    language: 'en',
    currency: 'CAD',
    country: 'CA',
    min_price: localStorage.getItem('min_price') || 50,
    max_price: localStorage.getItem('max_price') || 300,
  });
  const [hotels, setHotels] = useState([] as Hotel[]);
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState({} as Hotel);
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
    <div style={{ position: 'relative' }}>
      <Loading loading={loading} />
      <Details details={details} onClose={() => setDetails({} as Hotel)} />
      <div
        style={{
          position: 'absolute',
          zIndex: 1000,
          width: '100%',
        }}
      >
        <div
          style={{
            backgroundColor: '#fff',
            padding: '20px',
            width: '300px',
            margin: '20px auto',
            fontWeight: 200,
            textAlign: 'center',
            fontSize: '14px',
          }}
        >
          <div>
            <div className="heading">Checkin - Checkout</div>
            <span style={{ fontSize: '11px' }}>
              {filters.checkin} - {filters.checkout}
            </span>
          </div>
        </div>
      </div>
      <ReactTooltip />
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
