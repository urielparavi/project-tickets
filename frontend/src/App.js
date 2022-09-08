import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import NewPresent from './pages/NewPresent';
import Register from './pages/Register';
import Present from './pages/Present';
import Presents from './pages/Presents';

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/new-present' element={<PrivateRoute />} >
              <Route path='/new-present' element={<NewPresent />} />
            </Route>
            <Route path='/presents' element={<PrivateRoute />} >
              <Route path='/presents' element={<Presents />} />
            </Route>
            <Route path='/present/:presentId' element={<PrivateRoute />} >
              <Route path='/present/:presentId' element={<Present />} />
            </Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
