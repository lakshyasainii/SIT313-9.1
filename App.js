import { Routes, Route } from 'react-router-dom';
import './App.css';
import Signup from './Signup';
import Login from './Login';
import NavFooter from './NavFooter';
import Welcome from './Welcome';

function App() {
  return (
    <Routes>
      <Route path='/' element={<NavFooter />} >
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/Welcome' element={<Welcome />} />
      </Route>
    </Routes>
  );
}
export default App;