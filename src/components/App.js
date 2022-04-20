import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Navbar from './Navbar';
import ArtistList from './ArtistList';
import FilmList from './FilmList';

import '../styles/style.scss';

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/browse/artists" element={<ArtistList />} />
      <Route path="/browse/films" element={<FilmList />} />
    </Routes>
  </BrowserRouter>
);

export default App;
