import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
// import Chip from '@mui/material/Chip';
import { getAllFilms } from '../../api/films';
import { getAllAlbums } from '../../api/albums';
import { createSong } from '../../api/songs';
import { useNavigate } from 'react-router-dom';
import { getAllArtists } from '../../api/artists';

const Song = () => {
  const [films, setFilms] = React.useState(null);
  const [albums, setAlbums] = React.useState(null);
  const [artists, setArtists] = React.useState(null);
  const [songName, setSongName] = React.useState('');
  const [selectedArtist, setSelectedArtist] = React.useState(null);
  const [selectedAlbum, setSelectedAlbum] = React.useState(null);
  const [year, setYear] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [spotifyLink, setSpotifyLink] = React.useState('');

  const navigate = useNavigate();

  React.useEffect(() => {
    const getData = async () => {
      const artists = await getAllArtists();
      setArtists(
        artists.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
      );
      const albums = await getAllAlbums();
      setAlbums(
        albums.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
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

  const handleSongNameChange = (e) => {
    setSongName(e.target.value);
  };
  const handleYearChange = (e) => {
    setYear(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleSpotifyLinkChange = (e) => {
    setSpotifyLink(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(
      songName,
      selectedAlbum.id,
      selectedArtist.id,
      year,
      description,
      spotifyLink
    );
    await createSong({
      name: songName,
      album: selectedAlbum.id,
      artist: selectedArtist.id,
      year: year,
      description: description,
      spotify_link: spotifyLink,
    });
    navigate('/browse/songs');
  };

  if (!films) return <h1>Loading...</h1>;

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Add Song</h1>

          <Box
            component="form"
            sx={{
              maxWidth: '100%',
            }}
            noValidate
            onSubmit={handleSubmit}
          >
            <TextField
              fullWidth
              id="fullWidth"
              label="Song Name"
              variant="outlined"
              type="text"
              value={songName}
              onChange={handleSongNameChange}
            />
            <Autocomplete
              disablePortal
              id="album"
              options={albums}
              getOptionLabel={(album) => album.name}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Album" />}
              onChange={(_event, albumChoice) => {
                setSelectedAlbum(albumChoice);
              }}
            />
            <Autocomplete
              disablePortal
              id="artist"
              options={artists}
              getOptionLabel={(artists) => artists.name}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Artist" />}
              onChange={(_event, artistChoice) => {
                setSelectedArtist(artistChoice);
              }}
            />
            <TextField
              fullWidth
              id="outlined-basic"
              label="Release Year"
              variant="outlined"
              type="number"
              value={year}
              onChange={handleYearChange}
            />
            <TextField
              fullWidth
              id="outlined-basic"
              label="Description"
              variant="outlined"
              type="textarea"
              value={description}
              onChange={handleDescriptionChange}
            />
            <TextField
              fullWidth
              id="outlined-basic"
              label="Spotify Link"
              variant="outlined"
              type="text"
              value={spotifyLink}
              onChange={handleSpotifyLinkChange}
            />

            {/* <Autocomplete
              multiple
              id="tags-outlined"
              options={films}
              getOptionLabel={(film) => film.title}
              // defaultValue={[top100Films[13]]}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Appears In"
                  placeholder="Films Song Appears In"
                />
              )}
              onChange={(_event, filmChoice) => {
                const idArray = filmChoice.map((item) => item.id);
                setSelectedFilms(idArray);
              }}
            /> */}

            <input
              type="submit"
              className="w-full text-center py-3 rounded bg-black text-white hover:bg-blue-600 focus:outline-none my-1"
              value="Add Song"
            />
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Song;
