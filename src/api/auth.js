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

export const getCurrentUserById = async (userId) => {
  const options = {
    method: 'GET',
    url: `/api/users/currentUser/${userId}`,
    headers: {
      authorization: `Bearer ${window.sessionStorage.getItem('token')}`,
    },
  };

  const { data } = await axios.request(options);
  return data;
};

export const getAllUsers = async () => {
  const options = {
    method: 'GET',
    url: 'api/users',
    headers: {
      authorization: `Bearer ${window.sessionStorage.getItem('token')}`,
    },
  };

  const { data } = await axios.request(options);
  return data;
};

export const deleteUser = async (userId) => {
  const options = {
    method: 'DELETE',
    url: `api/users/${userId}`,
    headers: {
      authorization: `Bearer ${window.sessionStorage.getItem('token')}`,
    },
  };

  const { data } = await axios.request(options);
  return data;
};

export const removeToken = () => {
  window.sessionStorage.removeItem('token');
};

export const removeUserId = () => {
  window.sessionStorage.removeItem('userId');
};
