import './App.css';
import { useState } from 'react'
import { 
  useNavigate, 
  BrowserRouter as Router,
  Routes,
  Route,
  Link } from 'react-router-dom';
import { DiscoverPage } from "./components/DiscoverPage.js"
import { Landing } from "./components/landing.js"
const App = () => {
  return (
    <Router>
      <Routes>
        <Route  path="/" element={<Landing />} />
          
        <Route  path="/discover" element={<DiscoverPage />}/>
          
     </Routes>
    </Router>
  );
};

export default App;
