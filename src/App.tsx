import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Authorization from './pages/Authorization';
import Home from './pages/Home';
import './styles/_global.scss'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <>
      <Router basename="/agile-hack">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Authorization />} />
          <Route path="*" element={<Home />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
