import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";
import chatIcon from './../../icons/Vector (4).png'
import Navbar from './../../../../layout/Header'
import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import searchIcon from './../../../../img/search.svg'
import profil from './../../../../img/image 4.png'
import Footer from './../../../../layout/Footer'

import './Chat.css';

const ENDPOINT = 'http://192.168.43.102:5000/';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name)
    localStorage.setItem('namaKontakUser', name)

    socket.emit('join', { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
      console.log(users)
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  return (
    <div>
      <div className="navbar-chat">
        <Navbar />
      </div>
      <br /><br />
      <div className="container kiriContainer">
        <div className="d-flex">
          <img className='msgIcon' src={chatIcon} alt="chatIcon" />
          <h1>Contact Clinics</h1>
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-4 chatHistory">
            <div className="d-flex ">
              <img className='search-family' src={searchIcon} alt="" />
              <input type="text" placeholder='Search chat' />
            </div>
            <div className="chatlist-dummy d-flex">
              <img className='profil-chat' src={profil} alt="profil" />
              <div className="dummychat">
                <h4>Groovy Vet Care</h4>
                <p> </p>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-8">
            <div className="containerChat">
              <InfoBar users={users} name={name} />
              <Messages messages={messages} name={name} />
              <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
            <TextContainer users={users} />
          </div>
        </div>
      </div>
      <div className="footer-chat">
        <Footer />
      </div>
    </div>
  );
}

export default Chat;
