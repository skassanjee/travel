import Nav from './Components/Nav/Nav';
import {Link, Routes, Route} from 'react-router-dom'
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import './App.css'

function App() {
  return (
    <div>
      <Nav />
      <Routes>
      <Route exact path="/" element={<Home />} />
          <Route exact path="/auth" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
