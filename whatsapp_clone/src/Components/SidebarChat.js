import { Avatar } from '@mui/material';
import axios from 'axios';
import React from 'react';
import '../Styles/SidebarChat.css';
import { BASE_URL } from '../UrlUtils';

function SidebarChat({ addNewChat, room, rooms, setRoomAdded, setActiveRoom }) {
    const createNewChat = () => {
        let roomName = prompt('Enter chat name: ');
        if (roomName && !roomName.trim().length <= 0) {
            if (rooms && rooms.some(input => input.roomName.toLowerCase() === roomName.toLowerCase())) {
            } else {
                setRoomAdded(prev => !prev);
                axios.post(`${BASE_URL}/createnewroom`,
                    {
                        roomName,
                        avatar: `https://api.dicebear.com/7.x/pixel-art/svg?seed=${roomName}`
                    })
                    .then(resp => {
                        console.log('createnewroom RESP: ', resp.data);
                        setRoomAdded(prev => !prev);
                        setActiveRoom(resp.data);
                    }).catch(err => {
                        console.log('createnewroom RESP: ', err);
                    })
            }
        }
    };

    const processActiveRoom = (room) => {
        setActiveRoom(room);
    }

    return !addNewChat ? (
        <div className='sidebarChat' onClick={() => processActiveRoom(room)}>
            <Avatar src={room.avatar} />
            <div className='sidebarChat_info'>
                <h2>{room.roomName}</h2>
                <p>
                    {
                        rooms.filter(obj => obj.roomName === room.roomName)[0].messageList[room.messageList.length - 1] && rooms.filter(obj => obj.roomName === room.roomName)[0].messageList[room.messageList.length - 1].msg
                    }
                </p>
            </div>
        </div>
    ) : (
        <div className='sidebarChat' onClick={createNewChat}>
            <h2>Add new Chat</h2>
        </div>
    )
}

export default SidebarChat