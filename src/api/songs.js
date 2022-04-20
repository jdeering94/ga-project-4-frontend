import axios from 'axios';

export const getAllSongs = async () => {
  const options = {
    method: 'GET',
    url: 'http://localhost:8000/song-to-film/song-list/',
  };

  const { data } = await axios.request(options);
  return data;
};
