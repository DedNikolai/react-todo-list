import React, {Fragment, useEffect} from 'react';
import TodoList from './pages/Todos';
import {Routes, Route} from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './pages/Profile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

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
