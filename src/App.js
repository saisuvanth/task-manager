/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { auth } from './firebase';

function App() {
  const navigate = useNavigate();
  const [uid, setUid] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user && user.emailVerified) {
        setUid(user.uid);
        navigate('/');
      } else {
        navigate('/login');
      }
    })
  }, [])

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home uid={uid} />} />
        <Route path="/login" element={<Login />} />
        <Route path='/register' element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
