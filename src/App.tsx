import { useState } from 'react';
import FileUpload from './components/FileUpload';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import './styles/global.scss'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SprintList from './pages/SprintList';
import Sprint from './pages/Sprint';

function App() {
  const [add, setAdd] = useState(false);

  const example_sprint = {
      sprint_id: 3,
      sprint_name: "whatever",
      sprint_status: "completed",
      sprint_start_date: "17.09.2022",
      sprint_end_date: "18.03.2023",
      entity_ids: [32324, 23232],
  };

  return (
    <>
      <Router basename="/agile-hack">
        <Navbar setAdd={setAdd}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sprints" element={<SprintList />} />
          <Route path="/sprints/:id" element={<Sprint sprint={example_sprint}/>} /> 
          <Route path="*" element={<Home />} />
        </Routes>
        {add && <FileUpload setAdd={setAdd}/>}
        <Footer />
      </Router>
    </>
  )
}

export default App
