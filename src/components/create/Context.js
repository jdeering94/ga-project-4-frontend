import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import { getAllSongs } from '../../api/songs';
import { getAllFilms } from '../../api/films';
import { createContext } from '../../api/contexts';
import { useNavigate } from 'react-router-dom';

const Context = () => {
  const [songs, setSongs] = React.useState(null);
  const [films, setFilms] = React.useState(null);
  const [selectedSong, setSelectedSong] = React.useState(null);
  const [selectedFilm, setSelectedFilm] = React.useState(null);
  const [usage, setUsage] = React.useState('');

  const navigate = useNavigate();

  React.useEffect(() => {
    const getData = async () => {
      const songs = await getAllSongs();
      setSongs(
        songs.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
      );
      const films = await getAllFilms();
      setFilms(
        films.sort((a, b) =>
          a.title > b.title ? 1 : b.title > a.title ? -1 : 0
        )
      );
    };
    getData();
  }, []);

  const handleUsageChange = (e) => {
    setUsage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createContext({
      song: selectedSong.id,
      film: selectedFilm.id,
      usage: usage,
    });
    navigate(`/songs/${selectedSong.id}`);
  };

  if (!films) return <h1>Loading...</h1>;

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Add Context</h1>

          <Box
            component="form"
            sx={{
              maxWidth: '100%',
            }}
            noValidate
            onSubmit={handleSubmit}
          >
            <Autocomplete
              disablePortal
              id="song"
              options={songs}
              getOptionLabel={(song) => song.name}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Song" />}
              onChange={(_event, songChoice) => {
                setSelectedSong(songChoice);
              }}
            />
            <Autocomplete
              disablePortal
              id="film"
              options={films}
              getOptionLabel={(films) => films.title}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Film" />}
              onChange={(_event, filmChoice) => {
                setSelectedFilm(filmChoice);
              }}
            />

            <TextField
              fullWidth
              id="fullWidth"
              label="Usage"
              variant="outlined"
              type="text"
              value={usage}
              onChange={handleUsageChange}
            />
            <input
              type="submit"
              className="w-full text-center py-3 rounded bg-black text-white hover:bg-blue-600 focus:outline-none my-1"
              value="Add Context"
            />
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Context;
