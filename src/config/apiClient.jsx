import axios from 'axios';

import store from '../store/store';
store.subscribe(listener)

let token = '';

function select(state) {
  return state.userReducer.token
}

function listener() {
  let tokendata = select(store.getState())
  token = tokendata;
}

const apiClient = axios.create({
    // baseURL: 'http://127.0.0.1:8000/',
    headers: {
        "Content-type": "application/json; charset=UTF-8",
    },
});


apiClient.interceptors.request.use(function (config) {
  config.headers['Authorization'] = `Token ${token}`;
  return config;
})

export default apiClient;