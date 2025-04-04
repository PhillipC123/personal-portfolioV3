import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import About from './About';
import Portfolio from './Portfolio';
import Skills from './Skills';
import ErrorPage from './ErrorPage';
import Header from './Header';
import Footer from './Footer';
import Contact from './Contact';
import Messages from './Messages';

function App() {
  return (
    <Router>
      <div>
        <Header/>
        <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/portfolio" element={<Portfolio/>}/>
          <Route path="/skills" element={<Skills/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/messages" element={<Messages/>}/>
          <Route path="*" element={<ErrorPage/>}/>
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;