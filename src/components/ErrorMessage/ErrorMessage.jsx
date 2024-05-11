import { useEffect } from 'react';
import toast from 'react-hot-toast';

const ErrorMessage = ({ message }) => {
  useEffect(() => {
    if (message) {
      toast.error('Whoops. Something went wrong! Please try reloading this page!');
    }
  }, [message]);

  return null;
};

export default ErrorMessage;