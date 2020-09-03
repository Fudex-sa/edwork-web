import axios from 'axios';

const serverConfig = {
  // baseURL: 'http://192.168.100.6:8888/api',
  baseURL: 'https://api.fursatak.app/api',
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