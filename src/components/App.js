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
    </Routes>
    <Footer />
  </BrowserRouter>
);

export default App;
