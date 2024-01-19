import React, { useState } from 'react';
import '../App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';

function Dashboard({ rooms, setRooms, roomAdded, setRoomAdded }) {
    const [msg, setMsg] = useState([]);
    const [activeRoom, setActiveRoom] = useState({});

    return (
        <div className="App">
            <div className='app_body'>
                <Sidebar rooms={rooms} setRooms={setRooms} roomAdded={roomAdded} setRoomAdded={setRoomAdded} activeRoom={activeRoom} setActiveRoom={setActiveRoom} msg={msg} />

                <Chat activeRoom={activeRoom} msg={msg} setMsg={setMsg} />
            </div>
        </div>
    )
}

export default Dashboard