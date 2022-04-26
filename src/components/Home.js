import React from 'react';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Card, CardMedia, CardActionArea } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getAllSongs } from '../api/songs';
import { Link } from 'react-router-dom';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

const Home = () => {
  const [songs, setSongs] = React.useState(null);
  const [selectedSong, setSelectedSong] = React.useState(null);

  const navigate = useNavigate();

  React.useEffect(() => {
    const getData = async () => {
      const songs = await getAllSongs();
      setSongs(
        songs.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
      );
    };
    getData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate(`/songs/${selectedSong.id}`);
  };

  if (!songs) return <h1>Loading/...</h1>;

  return (
    <>
      <Container maxWidth="sm">
        <Box
          component="form"
          sx={{
            maxWidth: '100%',
            width: '100%',
          }}
          noValidate
          onSubmit={handleSubmit}
          className="my-10"
        >
          <Autocomplete
            freeSolo
            id="tags-outlined"
            options={songs}
            getOptionLabel={(song) => song.name}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Search For Songs"
                placeholder="Available Songs..."
              />
            )}
            onChange={(_event, songChoice) => {
              setSelectedSong(songChoice);
            }}
            className="my-10"
          />

          <Splide
            aria-labelledby="Songs Such As"
            options={{
              rewind: true,
              width: 800,
              gap: '1rem',
              perPage: 3,
              interval: 4000,
              autoplay: true,
              perMove: 1,
              type: 'loop',
            }}
          >
            {songs.map((song) => (
              <SplideSlide key={song.id}>
                <Link to={`/songs/${song.id}`}>
                  <img src={song.album.image} alt={song.name} />
                </Link>
              </SplideSlide>
            ))}
          </Splide>
        </Box>
      </Container>
    </>
  );
};

export default Home;
