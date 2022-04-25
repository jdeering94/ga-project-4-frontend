import axios from 'axios';
import { baseUrl } from '../helpers/config';

export const getSingleContext = async (songId, filmId) => {
  const options = {
    method: 'GET',
    url: `${baseUrl}/song-to-film/context-detail/?songId=${songId}&filmId=${filmId}`,
  };

  const { data } = await axios.request(options);
  return data;
};
export const getAllContextsForSong = async (songId) => {
  const options = {
    method: 'GET',
    url: `${baseUrl}/song-to-film/song-contexts/?songId=${songId}`,
  };

  const { data } = await axios.request(options);
  return data;
};
export const getAllContextsForFilm = async (filmId) => {
  const options = {
    method: 'GET',
    url: `${baseUrl}/song-to-film/film-contexts/?filmId=${filmId}`,
  };

  const { data } = await axios.request(options);
  return data;
};

export const createContext = async (contextData) => {
  const options = {
    method: 'POST',
    url: `${baseUrl}/song-to-film/contexts/`,
    data: contextData,
  };

  const { data } = await axios.request(options);
  return data;
};

export const createContextRating = async (reviewData) => {
  const options = {
    method: 'POST',
    url: `${baseUrl}/reviews/create/`,
    data: reviewData,
    headers: {
      authorization: `Bearer ${window.sessionStorage.getItem('token')}`,
    },
  };

  const { data } = await axios.request(options);
  return data;
};
