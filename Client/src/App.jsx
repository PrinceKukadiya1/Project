import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './authContext/AuthContext';

// Pages
import Home from './pages/home/Home';
import Watch from './pages/watch/Watch';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import New from './pages/new/New';
import MyList from './pages/myList/MyList';
import Details from './pages/details/Details';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Register />} />
        <Route path="/register" element={!user ? <Register /> : <Home />} />
        <Route path="/login" element={!user ? <Login /> : <Home />} />
        
        {/* Private Routes */}
        {user && (
          <>
            <Route path="/movies" element={<Home type="movie" />} />
            <Route path="/series" element={<Home type="series" />} />
            <Route path="/watch" element={<Watch />} />
            <Route path="/new" element={<New />} />
            <Route path="/my-list" element={<MyList />} />
            <Route path="/details/:id" element={<Details />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
