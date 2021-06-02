import { useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer, Tooltip } from 'react-leaflet';
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
  const [range, setRange] = useState({
    minprice: localStorage.getItem('minprice') || 50,
    maxprice: localStorage.getItem('maxprice') || 300,
  });

  const [filters, setFilters] = useState({
    ...config.filters,
    checkin: formatDate(TODAY),
    checkout: formatDate(TWO_DAY_FROM_NOW),
  });

  const [hotels, setHotels] = useState([] as Hotel[]);
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState({} as Hotel);

  useEffect(() => {
    setLoading(true);
    api.get(filters).then((data) => {
      setLoading(false);
      setHotels(
        data.results.filter(
          (h: Hotel) =>
            h.min_rates.price <= +range.maxprice && h.min_rates.price >= +range.minprice,
        ),
      );
    });
  }, [filters, setHotels, range]);

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
          boxShadow: 'rgb(0 0 0 / 70%) 0px 0px 25px 0px',
        }}
      >
        <div className="heading">Checkin - Checkout</div>
        <span style={{ fontSize: '11px' }}>
          {filters.checkin} - {filters.checkout}
        </span>
      </div>
      <ReactTooltip />
      {!details.id && (
        <RangeInput
          minprice={range.minprice}
          maxprice={range.maxprice}
          setValues={(values: any) => {
            setRange({
              minprice: values[0],
              maxprice: values[1],
            });

            localStorage.setItem('minprice', JSON.stringify(values[0]));
            localStorage.setItem('maxprice', JSON.stringify(values[1]));
            setFilters(filters);
          }}
        />
      )}
      <MapContainer center={CENTER} zoom={13} scrollWheelZoom={false} style={{ height: '100vh' }}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={CENTER}>
          <Tooltip direction="left" offset={[-20, 0]} opacity={1} permanent>
            <div>Bell Center</div>
          </Tooltip>
        </Marker>
        {(details.id ? hotels.filter((hotel) => hotel.id === details.id) : hotels).map((hotel) => (
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
