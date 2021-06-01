import { Marker, Popup, Tooltip } from 'react-leaflet';

export interface Hotel {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  min_rates: { price: number };
}

export const HotelMarker = ({ hotel }: { hotel: Hotel }) => {
  return (
    <Marker position={[hotel.latitude, hotel.longitude]}>
      <Tooltip direction="left" offset={[-20, 0]} opacity={1} permanent>
        ${hotel.min_rates.price.toFixed(2)}
      </Tooltip>
      <Popup>
        <h3>{hotel.name}</h3>
      </Popup>
    </Marker>
  );
};
