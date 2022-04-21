import axios from 'axios';
import { baseUrl } from '../helpers/config';

export const getAllSongs = async () => {
  const options = {
    method: 'GET',
    url: `${baseUrl}/song-to-film/song-list/`,
  };

  const { data } = await axios.request(options);
  return data;
};
export const getSongById = async (songId) => {
  const options = {
    method: 'GET',
    url: `${baseUrl}/song-to-film/song-detail/${songId}`,
  };

  const { data } = await axios.request(options);
  return data;
};
