import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Navbar from './Navbar';
import ArtistList from './ArtistList';
import FilmList from './FilmList';
import SongList from './SongList';
import Footer from './Footer';

import '../styles/style.scss';
import Login from './authentication/login';
import Register from './authentication/register';
import ShowSong from './ShowSong';
import ShowFilm from './ShowFilm';
import Profile from './Profile';
import Song from './create/Song';
import Artist from './create/Artist';
import Album from './create/Album';
import Film from './create/Film';
import Context from './create/Context';

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/browse/artists" element={<ArtistList />} />
      <Route path="/browse/films" element={<FilmList />} />
      <Route path="/browse/songs" element={<SongList />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/songs/:songId" element={<ShowSong />} />
      <Route path="/films/:filmId" element={<ShowFilm />} />
      <Route path="/users/profile/" element={<Profile />} />
      <Route path="/create/song/" element={<Song />} />
      <Route path="/create/artist/" element={<Artist />} />
      <Route path="/create/album/" element={<Album />} />
      <Route path="/create/film/" element={<Film />} />
      <Route path="/create/context/" element={<Context />} />
    </Routes>
    <Footer />
  </BrowserRouter>
);

export default App;
