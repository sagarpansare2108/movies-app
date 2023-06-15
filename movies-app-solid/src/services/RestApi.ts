import Axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;

const config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "text/plain",
  },
};

export const RestAPI = Axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: false,
  httpsAgent: config
});

RestAPI.interceptors.request.use(
  (config) => {
    const params = config.params ?? {};
    config.params = {
      ...params,
      api_key: API_KEY
    };
    return config;
  },
  (error) => {
    console.log(error);
    Promise.reject(error);
  }
);

export function handleErrorResponse(error: any) {
  const data: any = (error && error.response && error.response.data) || null;
  const status = (data && data.status_code) || -1;
  const message =
    data && data.status_message
      ? data.status_message
      : data?.errors?.[0] || 'Something went wrong, please try again.';
  throw { status, message };
}
