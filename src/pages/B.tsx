import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, Tooltip } from 'react-leaflet';
import { Loading } from '../features/Loading/Loading';
import { RangeInput } from '../features/RangeInput/RangeInput';

interface Hotel {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  min_rates: { price: number };
}

const apiUrl =
  'https://api.stay22.com/v2/booking?latitude=45.5017&longitude=-73.5673&radius=1000&checkin=2021-06-10&checkout=2021-06-12&minprice=0&maxprice=1200&language=en&currency=CAD&guests=A,A&rooms=1&limit=3&page=1&country=CA';

const LoactionMarker = ({ hotel }: { hotel: Hotel }) => {
  const [expand, setExpand] = useState(false);

  return (
    <Marker
      position={[hotel.latitude, hotel.longitude]}
      eventHandlers={{
        mouseover: () => setExpand(true),
        mouseout: () => setExpand(false),
      }}
    >
      <Tooltip direction="left" offset={[-20, 0]} opacity={1} permanent>
        ${hotel.min_rates.price.toFixed(2)}
      </Tooltip>
      <Popup>
        <h3 style={{ textAlign: 'center' }}>{hotel.name}</h3>
      </Popup>
    </Marker>
  );
};

let cachedHotels = [] as Hotel[];

export const B = () => {
  const [hotels, setHotels] = useState([] as Hotel[]);
  const [loading, setLoading] = useState(true);
  const [values, setValues] = useState([50, 300]);

  const renderHotels = () => {
    let reRender = false;

    const inRangeHotels = cachedHotels.filter(
      (hotel) => hotel.min_rates.price >= values[0] && hotel.min_rates.price <= values[1],
    );

    reRender =
      hotels
        .map((h) => h.id)
        .sort()
        .join(',') !==
      inRangeHotels
        .map((h) => h.id)
        .sort()
        .join(',');

    reRender && setHotels(inRangeHotels);
  };

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        cachedHotels = data.results;
        renderHotels();
      });
  }, []);

  useEffect(renderHotels, [values, hotels]);

  return (
    <div>
      <Loading loading={loading} />
      <RangeInput values={values} setValues={setValues} />
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
          <Popup>Bell Center</Popup>
        </Marker>
        {hotels.map((hotel) => (
          <LoactionMarker key={hotel.id} hotel={hotel} />
        ))}
      </MapContainer>
    </div>
  );
};
