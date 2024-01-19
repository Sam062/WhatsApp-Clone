import ChatIcon from '@mui/icons-material/Chat';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Avatar, IconButton } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../Styles/Chat.css';
import { BASE_URL } from '../UrlUtils';

function Chat({ activeRoom, msg, setMsg }) {
    const [input, setInput] = useState('');
    const [newMsg, setNewMsg] = useState(false);
    const user = JSON.parse(sessionStorage.getItem("user"));

    useEffect(() => {
        if (activeRoom && activeRoom.roomId) {
            axios.get(`${BASE_URL}/messagesforroom/${activeRoom.roomId}`)
                .then(resp => {
                    console.log('messagesforroom resp: ', resp.data);
                    setMsg(resp.data);
                }).catch(err => {
                    console.log("messagesforroom resp: ", err);
                })
        }
    }, [newMsg, activeRoom]);

    const sendMessage = (e) => {
        e.preventDefault();

        axios.post(`${BASE_URL}/addmsgtoroom/${activeRoom.roomId}`, {
            msgFrom: user.username,
            msg: input
        }).then(resp => {
            console.log('addmsgtoroom RESP: ', resp.data);
            setNewMsg(prev => !prev);
        }).catch(err => {
            console.log('addmsgtoroom RESP: ', err);
        })

        // after sending msg, cleanup
        setInput("");
    }

    return (
        activeRoom && activeRoom.roomName ?
            <div className='chat'>
                <div className='chat_header'>
                    <Avatar src={activeRoom && activeRoom.avatar} />
                    <div className='chat_headerInfo'>
                        <h3>{activeRoom.roomName}</h3>
                        <p>{activeRoom.lastSeen && `Created: ${activeRoom && activeRoom.lastSeen}`}</p>
                    </div>
                    <div className='chat_headerRight'>
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
                <div className='chat_body'>
                    {
                        msg && msg.length > 0 && msg.map(msg => {
                            return <p key={msg.msgId}
                                className={`chat_message ${(user && user.username) === (msg && msg.msgFrom) && "chat_reciever"}`}>
                                <span className='chat_name'>
                                    {msg.msgFrom}
                                </span>
                                {msg.msg}
                                <span className='chat_timestamp'>
                                    {msg.timestamp && msg.timestamp.substring(0, 16)}
                                </span>
                            </p>
                        })
                    }
                </div>
                <div className='chat_footer'>
                    <InsertEmoticonIcon />
                    <form>
                        <input type='text' value={input} onChange={(e) => setInput(e.target.value)}
                            placeholder='Type a message'
                        />

                        <button onClick={sendMessage}>Send a message</button>
                    </form>
                    <MicIcon />
                </div>
            </div>
            : <div className='chat'>
                <div className='chat_body'>
                    <h1 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Click on the rooms to chat</h1>
                </div>
            </div>
    )
}

export default Chat