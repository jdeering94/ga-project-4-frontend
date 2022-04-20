import axios from 'axios';

export const getAllArtists = async () => {
  const options = {
    method: 'GET',
    url: 'http://localhost:8000/song-to-film/artist-list/',
  };

  const { data } = await axios.request(options);
  return data;
};
