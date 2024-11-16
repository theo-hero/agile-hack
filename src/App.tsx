import { useState } from 'react';
import FileUpload from './components/FileUpload';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import './styles/global.scss'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SprintList from './pages/SprintList';

function App() {
  const [add, setAdd] = useState(false);

  return (
    <>
      <Router basename="/agile-hack">
        <Navbar setAdd={setAdd}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sprints" element={<SprintList />} />
          {/* <Route path="/teams" element={<Teams />} /> */}
          <Route path="*" element={<Home />} />
        </Routes>
        {add && <FileUpload setAdd={setAdd}/>}
        <Footer />
      </Router>
    </>
  )
}

export default App
