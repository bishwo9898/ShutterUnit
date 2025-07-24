import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './components/HomePage';
import WeddingPage from './components/WeddingPage';
import Portraits from './components/Portraits';
import ContactPage from './components/ContactPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/weddings" element={<WeddingPage />} />
        <Route path="/portraits" element={<Portraits />} />
        <Route path="/contact" element={<ContactPage />} />
        {/* You can add these pages when you're ready */}
        {/* <Route path="/portraits" element={<PortraitsPage />} /> */}
        {/* <Route path="/contact" element={<ContactPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
