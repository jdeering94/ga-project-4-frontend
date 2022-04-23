import axios from 'axios';
import { baseUrl } from '../helpers/config';

export const getAllArtists = async () => {
  const options = {
    method: 'GET',
    url: `${baseUrl}/song-to-film/artist-list/`,
  };

  const { data } = await axios.request(options);
  return data;
};

export const createArtist = async (artistData) => {
  const options = {
    method: 'POST',
    url: `${baseUrl}/song-to-film/artist-list/`,
    data: artistData,
  };

  const { data } = await axios.request(options);
  return data;
};
