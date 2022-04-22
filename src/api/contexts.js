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
