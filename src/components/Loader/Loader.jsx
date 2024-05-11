import {RotatingLines} from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className="loader">
      <RotatingLines type="TailSpin" color="#00BFFF" height={80} width={80} />
    </div>
  );
};

export default Loader;