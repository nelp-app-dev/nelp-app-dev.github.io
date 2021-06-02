import { Range, getTrackBackground } from 'react-range';

const STEP = 20;
const MIN = 0;
const MAX = 1000;

export const RangeInput = ({ minprice, maxprice, setValues }: any) => {
  return (
    <div
      style={{
        position: 'absolute',
        width: '100%',
        bottom: '20px',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: '#fff',
          padding: '5px 20px',
          width: '400px',
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          margin: '0 auto',
          boxShadow: 'rgb(0 0 0 / 70%) 0px 0px 25px 0px',
        }}
      >
        <Range
          values={[minprice, maxprice]}
          step={STEP}
          min={MIN}
          max={MAX}
          onChange={(values) => setValues(values)}
          renderTrack={({ props, children }) => (
            <div
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              style={{
                ...props.style,
                height: '36px',
                display: 'flex',
                width: '100%',
              }}
            >
              <div
                ref={props.ref}
                style={{
                  height: '5px',
                  width: '100%',
                  background: getTrackBackground({
                    values: [minprice, maxprice],
                    colors: ['#ccc', '#548BF4', '#ccc'],
                    min: MIN,
                    max: MAX,
                  }),
                  alignSelf: 'center',
                }}
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ index, props, isDragged }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: '25px',
                width: '25px',
                borderRadius: '100%',
                backgroundColor: '#FFF',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '0px 2px 6px #AAA',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '-28px',
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  fontFamily: 'Arial,Helvetica Neue,Helvetica,sans-serif',
                  padding: '4px',
                  borderRadius: '100%',
                  backgroundColor: '#548BF4',
                }}
              >
                ${index === 0 ? minprice : maxprice}
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
};
