import logo from './logo.svg';
import './App.css';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Navbar from './Components/Navbar';
import { Route, Routes, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { LoginAction, mwKeepLogin } from './Action/authAction';
import React from 'react';
import { API_URL } from "./helper"
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';
import OtherProfile from './Pages/OtherProfile';
import Verify from './Pages/Verify';
import ForgetPassword from './Pages/ForgetPassword';
import ResetPassword from './Pages/ResetPassword';
import MyProfile from './Pages/MyProfile';

function App(props) {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  const [loading, setLoading] = React.useState(true)
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(mwKeepLogin());
    //untu menonaktifkan loading setelah 2 detik
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [])

  React.useEffect(() => {
    if(role){
      navigate("/home");
    };
  }, [role])

  return (
    <div>
      <Navbar loading={loading} />
      <Routes>
        {
          role ?
            null :
            <>
              <Route path='/' element={<Login loading={loading} />} />
              <Route path='/register' element={<Register loading={loading} />} />
            </>
        }
        <Route path='/home' element={<Home loading={loading} />} />
        <Route path='/:username' element={<OtherProfile />} />
        <Route path='/profile' element={<MyProfile />} />
        <Route path='*' element={<NotFound />} />
        <Route path='/verification/:token' element={<Verify />} />
        <Route path='/forgetpassword' element={<ForgetPassword />} />
        <Route path='/resetpassword/:token' element={<ResetPassword />} />
      </Routes>
    </div>
  );
}

export default App;
