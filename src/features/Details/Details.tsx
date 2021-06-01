import { useEffect, useState } from 'react';
import { Hotel } from '../HotelMarker/HotelMarker';
import SimpleBar from 'simplebar-react';
import 'simplebar/src/simplebar.css';
import './Details.css';

export const Details = ({ details, onClose }: any) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(details.id ? true : false);
  }, [details.id]);

  if (!details.id) return null;

  return (
    <div className={`details${animate ? ' details-shown' : ''}`}>
      <div
        onClick={() => {
          setAnimate(false);
          setTimeout(onClose, 300);
        }}
        className="details-overlay"
      />
      <div className="details-content">
        <SimpleBar style={{ maxHeight: '100vh' }}>
          <h1 className="heading" style={{ fontSize: '1.7em', padding: '20px' }}>
            {details.name}
          </h1>
          <div style={{ height: '250px', position: 'relative' }}>
            <div className="ribbon">
              <div className="price">$45</div>
              <div className="label">per night</div>
            </div>
            <img src={details.images[0]} alt={details.name} />
          </div>
          <div
            style={{
              padding: '20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid #eee',
            }}
          >
            <span
              style={{
                backgroundColor: '#333',
                color: '#fff',
                display: 'inline-block',
                padding: '5px 10px',
              }}
            >
              {details.rating}
            </span>
            <span>
              <strong>{details.review_count}</strong> reviews
            </span>{' '}
            <span>
              <strong>{details.num_stars}-star</strong> hotel
            </span>
          </div>
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <h3 className="heading" style={{ margin: '0 0 20px' }}>
              Amenities
            </h3>
            {details.amenities.map((amenity: string) => (
              <span
                style={{
                  display: 'inline-block',
                  padding: '3px 8px',
                  backgroundColor: '#eee',
                  borderRadius: '6px',
                  margin: '3px',
                }}
              >
                {amenity.replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase())}
              </span>
            ))}
          </div>
        </SimpleBar>
      </div>
    </div>
  );
};
