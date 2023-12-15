import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Navbarr from './components/Navbarr';
import Listing from './Pages/Listing';
import Home from './Pages/Home';

function App() {

  return (
    <div>
      <Navbarr />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/book/list' element={<Listing />} />
      </Routes>
   </div>
  )
}

export default App
