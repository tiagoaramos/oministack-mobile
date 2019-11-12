import axios from 'axios';
import { AsyncStorage } from 'react-native';

const api = axios.create({
  baseURL: 'http://192.168.0.69:3333',
});

AsyncStorage.getItem('accessToken').then(accessToken => {
  if (accessToken) {
    api.defaults.headers.common['Authorization'] = `Bearer $accessToken`
  }
})

export default api;