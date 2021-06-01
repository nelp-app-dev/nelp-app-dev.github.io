import L, { DivIcon, Icon } from 'leaflet';
import './HotelMarker.css';
import { Marker, Popup, Tooltip } from 'react-leaflet';
import blackPin from '../../images/black-pin.svg';

export interface Hotel {
  id?: string;
  name?: string;
  latitude?: number;
  longitude?: number;
  min_rates?: { price?: number };
  images: string[];
}

const icon = new L.Icon({
  iconUrl: blackPin,
  iconSize: [30, 70],
  className: 'pin',
});

export const HotelMarker = ({ hotel, setDetails }: any) => {
  return (
    <Marker
      eventHandlers={{
        click: () => {
          setDetails(hotel);
        },
      }}
      position={[hotel.latitude, hotel.longitude]}
      icon={icon}
    >
      <Tooltip direction="left" offset={[-15, 0]} opacity={1} permanent>
        ${hotel.min_rates.price.toFixed(2)}
      </Tooltip>
    </Marker>
  );
};
