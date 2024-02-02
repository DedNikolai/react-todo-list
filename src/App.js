import TodoList from './pages/TodoList';
import {Routes, Route} from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import AuthProvider from './components/AuthProvider';
import Profile from './pages/Profile';


function App() {
  return (
    <AuthProvider>
      <Routes>
          <Route path='/' element={<Layout />}>
              <Route index element={<ProtectedRoute><TodoList /></ProtectedRoute> }/>
              <Route path='profile' element={<ProtectedRoute><Profile /></ProtectedRoute> }/>
              <Route path='login' element={<Login />}/>
              <Route path='register' element={<Register />}/>
          </Route> 
      </Routes>
    </AuthProvider>
  );
}

export default App;
