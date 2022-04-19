import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import '../styles/style.scss';

const App = () => (
  <BrowserRouter>
    {/* <Navbar /> */}
    <Routes>
      <Route path="/" element={<h1>Welcome to Song to Film!</h1>} />
    </Routes>
  </BrowserRouter>
);

export default App;
