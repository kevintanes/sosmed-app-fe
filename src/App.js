import logo from './logo.svg';
import './App.css';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Navbar from './Components/Navbar';
import { Route, Routes } from "react-router-dom";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { LoginAction, mwKeepLogin } from './Action/authAction';
import React from 'react';
import { API_URL } from "./helper"
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';
import OtherProfile from './Pages/OtherProfile';
import Verify from './Pages/Verify';

function App(props) {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    dispatch(mwKeepLogin());
    //untu menonaktifkan loading setelah 2 detik
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [])

  return (
    <div>
      <Navbar loading={loading} />
      <Routes>
        {
          role ?
            null :
            <>
              <Route path='/' element={<Login loading={loading} />} />
              <Route path='/regis' element={<Register loading={loading} />} />
            </>
        }
        <Route path='/home' element={<Home />} />
        <Route path='/other/:id' element={<OtherProfile />} />
        <Route path='*' element={<NotFound />} />
        <Route path='/verification/:token' element={<Verify />} />
      </Routes>
    </div>
  );
}

export default App;
