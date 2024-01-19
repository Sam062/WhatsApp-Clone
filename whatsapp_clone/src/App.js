import { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import PrivateRoute from './Components/PrivateRoute';

function App() {
  const [rooms, setRooms] = useState([]);
  const [roomAdded, setRoomAdded] = useState(false);

  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path='/chats' element={<Dashboard rooms={rooms} setRooms={setRooms} roomAdded={roomAdded} setRoomAdded={setRoomAdded} />} />
        </Route>
        <Route path='/' element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
