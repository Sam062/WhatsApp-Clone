import ChatIcon from '@mui/icons-material/Chat';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';
import React, { useEffect } from 'react';
import '../Styles/Sidebar.css';
import { BASE_URL } from '../UrlUtils';
import SidebarChat from './SidebarChat';


function Sidebar({ rooms, setRooms, roomAdded, setRoomAdded, activeRoom, setActiveRoom, msg }) {
    const user = JSON.parse(sessionStorage.getItem("user"));

    useEffect(() => {
        axios.get(`${BASE_URL}/rooms`)
            .then(resp => {
                console.log(resp.data);
                setRooms(resp.data);
            }).catch(err => {
                console.log(err);
            })
    }, [roomAdded, msg])

    return (
        <div className='sidebar'>
            {/* Sidebar header */}
            <div className='sidebar_header'>
                <Avatar src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${user && user.avatar}`} />
                <h4 style={{ marginLeft: '-4rem', fontWeight: 600 }}>
                    {user && user.username}
                </h4>
                <div className='sidebar_headerRight'>
                    <IconButton disabled>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton disabled>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            {/* sidebar Search */}
            <div className='sidebar_search'>
                <div className='sidebar_searchContainer'>
                    <SearchIcon />
                    <input placeholder='Search or start new chat' type='text' />
                </div>
            </div>

            {/* sidebar Chats */}
            <div className='sidebar_chats'>
                {/* Add New Chat */}
                <SidebarChat addNewChat rooms={rooms} setRooms={setRooms} roomAdded={roomAdded} setRoomAdded={setRoomAdded} activeRoom={activeRoom} setActiveRoom={setActiveRoom} />

                {/* Available Room list */}
                {
                    rooms && rooms.map((room, index) => {
                        return <SidebarChat key={room.roomId + index} room={room} rooms={rooms} setRooms={setRooms} roomAdded={roomAdded} setRoomAdded={setRoomAdded} activeRoom={activeRoom} setActiveRoom={setActiveRoom} />
                    })
                }
            </div>
        </div>
    )
}

export default Sidebar