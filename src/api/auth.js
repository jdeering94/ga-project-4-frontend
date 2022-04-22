import axios from 'axios';
import { baseUrl } from '../helpers/config';

export const loginUser = async (credentials) => {
  const options = {
    method: 'POST',
    url: `${baseUrl}/authentication/login/`,
    data: credentials,
  };

  const { data } = await axios.request(options);
  if (data.token) {
    window.sessionStorage.setItem('token', data.token);
  } else {
    window.sessionStorage.removeItem('token');
  }
  console.log(data);
  return data.message;
};

export const registerUser = async (credentials) => {
  const options = {
    method: 'POST',
    url: `${baseUrl}/authentication/register/`,
    data: credentials,
  };

  const { data } = await axios.request(options);
  console.log(data);
  return data.message;
};

export const removeToken = () => {
  window.sessionStorage.removeItem('token');
};

export const removeUserId = () => {
  window.sessionStorage.removeItem('userId');
};
