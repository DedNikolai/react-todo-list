import React, {Fragment, useEffect} from 'react';
import TodoList from './pages/TodoList';
import {Routes, Route} from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './pages/Profile';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { authMe } from './store/slice/user';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = window.localStorage.getItem('auth-token');
    if (token) {
      dispatch(authMe())
    }
  }, []);

  return (
    <Fragment>
      <ToastContainer position="top-center" />
      <Routes>
          <Route path='/' element={<Layout />}>
              <Route index element={<ProtectedRoute><TodoList /></ProtectedRoute> }/>
              <Route path='profile' element={<ProtectedRoute><Profile /></ProtectedRoute> }/>
              <Route path='login' element={<Login />}/>
              <Route path='register' element={<Register />}/>
          </Route> 
      </Routes>
    </Fragment>
  );
}

export default App;
