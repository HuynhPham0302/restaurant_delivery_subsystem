import axios, { AxiosInstance } from 'axios';
import Cookie from 'js-cookie';
import qs from 'qs';

export type TResponse<T> = {
  status: string;
  status_code: number;
  message: string;
  metadata: T;
};

class CreateAxiosInstance {
  instance: AxiosInstance;

  constructor() {
    const axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_BACKEND_URL + '/v1/api/',
      headers: {
        'Content-Type': 'application/json',
      },
      paramsSerializer: (params) => qs.stringify(params, { encodeValuesOnly: true }),
    });

    axiosInstance.interceptors.request.use((config) => {
      const token = Cookie.get('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    axiosInstance.interceptors.response.use(
      (response) => response.data,
      (error) => {
        return Promise.reject(error);
      },
    );

    this.instance = axiosInstance;
  }
}

const HTTP = new CreateAxiosInstance().instance;

export default HTTP;
