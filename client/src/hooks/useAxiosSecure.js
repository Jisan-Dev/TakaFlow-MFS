import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const axiosSecure = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  useEffect(() => {
    axiosSecure.interceptors.response.use(
      (res) => {
        return res;
      },
      async (error) => {
        console.log('error tracked in the interceptor', error.response);

        if (error.response.status === 401 || error.response.status === 403) {
          navigate('/login', { replace: true });
        }
      }
    );
  }, []);

  return axiosSecure;
};

export default useAxiosSecure;