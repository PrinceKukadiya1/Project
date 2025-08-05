import './App.scss'
import Home from './pages/home/Home'
import Watch from './pages/watch/Watch'
import Register from './pages/register/Register'
import Login from './pages/login/Login'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from 'react'
import { AuthContext } from './authContext/AuthContext'
import New from './pages/new/New';
import MyList from './pages/myList/MyList';
import Details from './pages/details/Details'



function App() {
  const { user } = useContext(AuthContext);

  return (

    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={user ? <Home /> : <Register />} />
        <Route exact path="/register" element={!user ? <Register /> : <Home />} />
        <Route exact path="/login" element={!user ? <Login /> : <Home />} />



        {user && (
          <>
            <Route path="/movies" element={<Home type="movie" />} />
            <Route path="/series" element={<Home type="serie" />} />
            <Route path="/watch" element={<Watch />} />
            <Route path="/new" element={<New />} />
            <Route path="/my-list" element={<MyList />} />
            <Route path="/details/:id" element={<Details />} />


          </>
        )}

      </Routes>
    </BrowserRouter>

  )
}

export default App
