import './Loading.css';

export const Loading = (props: any) => {
  return props.loading ? (
    <div className="loading-container">
      <div className="loading" />
    </div>
  ) : null;
};
