import React from 'react';
import profil from './../../../icons/Ellipse 10.png';
import versa from './../../../icons/image 5.png'

import './Message.css';

import ReactEmoji from 'react-emoji';

const Message = ({ message: { text, user }, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
          {/* <p className="sentText pr-10">{trimmedName}</p> */}
          <div className="messageBox fromUs">
            <h5 className="messageText colorWhite">{ReactEmoji.emojify(text)}</h5>
          </div>
          <img src={profil} alt="profil" />
        </div>
      )
      : (
        <div className="messageContainer justifyStart">
          <div className="bungkus-versa">
            <img className='versaIcon' src={versa} alt="profil" />
          </div>
          <div className="messageBox backgroundLight">
            <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
          </div>
          {/* <p className="sentText pl-10 ">{user}</p> */}

        </div>
      )
  );
}

export default Message;