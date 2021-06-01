import { useEffect, useState } from 'react';
import { Hotel } from '../HotelMarker/HotelMarker';
import './Details.css';

export const Details = ({ details }: { details: Hotel }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(details.id ? true : false);
  }, [details.id]);

  if (!details.id) return null;

  return (
    <div className={`details${animate ? ' details-shown' : ''}`}>
      <h1 className="heading" style={{ fontSize: '1.7em', padding: '20px' }}>
        {details.name}
      </h1>
      <div style={{ height: '250px' }}>
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
          9.4
        </span>
        <span>
          <strong>177</strong> reviews
        </span>{' '}
        <span>
          <strong>4-star</strong> hotel
        </span>
      </div>
    </div>
  );
};
