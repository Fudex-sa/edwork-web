import axios from 'axios';

const serverConfig = {
   baseURL: 'http://localhost:8888/api',
  //baseURL: 'https://api.fursatak.app/api',
  responseType: 'json',
  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json',
  },
  validateStatus: function (status) {
    return status <= 500;
  },
};

export const server = axios.create(serverConfig);
