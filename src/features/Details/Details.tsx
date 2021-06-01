import { useEffect, useState } from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar/src/simplebar.css';
import './Details.css';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

const Slideshow = ({ images }: { images: string[] }) => {
  return (
    <div className="slide-container">
      <Fade>
        {images.map((image, index) => (
          <div key={`image-${index}`} className="each-slide" style={{ position: 'relative' }}>
            <div className="image-container">
              <img src={image} alt={`${index}`} />
            </div>
          </div>
        ))}
      </Fade>
    </div>
  );
};

export const Details = ({ details, onClose }: any) => {
  const [animate, setAnimate] = useState(false);

  const close = () => {
    setAnimate(false);
    setTimeout(onClose, 300);
  };

  useEffect(() => {
    setAnimate(details.id ? true : false);
  }, [details.id]);

  if (!details.id) return null;

  return (
    <div className={`details${animate ? ' details-shown' : ''}`}>
      <div onClick={close} className="details-overlay" />
      <div className="details-content">
        <div onClick={close} className="close">
          ⨯
        </div>
        <SimpleBar style={{ maxHeight: '100vh' }}>
          <h1 className="heading" style={{ fontSize: '1.7em', padding: '20px' }}>
            {details.name}
          </h1>
          <div style={{ height: '250px', position: 'relative' }}>
            <div className="ribbon">
              <div className="price">$45</div>
              <div className="label">per night</div>
            </div>
            <Slideshow images={details.images} />
          </div>
          <div
            style={{
              padding: '20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#eee',
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
            <p style={{ margin: '0 0 20px' }}>
              {[
                details.address.street,
                details.address.city,
                details.address.country,
                details.address.postal,
              ].join(', ')}
            </p>
            {details.amenities.map((amenity: string) => (
              <span
                key={amenity}
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
