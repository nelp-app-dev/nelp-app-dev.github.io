import './HotelMarker.css';
import { Marker, Tooltip } from 'react-leaflet';
import { Routing } from '../Routing/Routing';

export interface Hotel {
  id?: string;
  name?: string;
  latitude?: number;
  longitude?: number;
  min_rates?: { price?: number };
  images: string[];
  amenities: string[];
  review_count: number;
  num_stars: number;
  rating: number;
}

export const HotelMarker = ({ hotel, setDetails, selected }: any) => {
  return (
    <Marker
      eventHandlers={{
        click: () => {
          setDetails(hotel);
        },
      }}
      position={[hotel.latitude, hotel.longitude]}
    >
      {selected && (
        <Routing hotel={hotel} setDetailsRoute={(route: any) => setDetails({ ...hotel, route })} />
      )}

      <Tooltip direction="left" offset={[-20, 0]} opacity={1} permanent>
        <div
          style={{
            fontWeight: selected ? 700 : 'lighter',
            fontSize: selected ? '15px' : 'inherit',
          }}
        >
          ${hotel.min_rates.price.toFixed(2)}
        </div>
      </Tooltip>
    </Marker>
  );
};
