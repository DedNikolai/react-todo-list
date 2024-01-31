import TodoList from './pages/TodoList/TodoList';
import {Routes, Route} from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';


function App() {
  return (
    <Routes>
        <Route path='/' element={<Layout />}>
            <Route index element={<TodoList />}/>
            <Route path='login' element={<Login />}/>
            <Route path='register' element={<Register />}/>
        </Route> 
    </Routes>
  );
}

export default App;
