import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import add from './../img/Vector (4).png'
import './modalPetInfo.css'
import Axios from 'axios'
import { connect } from 'react-redux'
import firebase from 'firebase'

const ModalExample = (props) => {
    // const {
    //     buttonLabel,
    //     className
    // } = props;
    console.log(props.email)

    const [modal, setModal] = useState(false);
    const [specyId, setSpecyId] = useState('')
    const [message, setMessage] = useState('')
    const [username, setUsername] = useState('')
    const [gender, setGender] = useState('')
    const [email, setEmail] = useState('')
    const [chatsInit, setChatsInit] = useState('')
    const [friends, setFriends] = useState('')


    const history = useHistory()

    useEffect(() => {
        firebase.auth().onAuthStateChanged(async _usr => {
            await firebase
                .firestore()
                .collection('chats')
                .where('users', 'array-contains', _usr.email)
                .onSnapshot(async res => {
                    const chats = res.docs.map(_doc => _doc.data());
                    await 
                        setEmail(_usr.email),
                        setChatsInit(chatsInit),
                        setFriends([])
                    
                })

        });
    }, [])

    // const createChat = () => {
    //     this.props.newChatSubmitFn({
    //         sendTo: username,
    //         message: message
    //     });
    // }

    const buildDocKey = (friend) => [localStorage.getItem('email'), friend].sort().join(':');
    const toggle = () => setModal(!modal);


    const semlebew = () => {
        createChat({
            sendTo: props.email,
            message: message
        })
        toggle()
    }

    const handlerNewChat = async (e) => {
        e.preventDefault();
        chatAlreadyExist = await chatExists();
        chatAlreadyExist ? goToChat() : createChat({
            sendTo: props.email,
            message: message
        });
    }
    const createChat = async (chatObj) => {
        const docKey = buildDocKey(chatObj.sendTo);
        await
            firebase
                .firestore()
                .collection('chats')
                .doc(docKey)
                .set({
                    messages: [{
                        message: message,
                        sender: localStorage.getItem('email')
                    }],
                    users: [props.email, chatObj.sendTo],
                    receiverHasRead: false
                })
        // this.selectChat(this.state.chats.length - 1);
    }

    const chatExists = async () => {
        const docKey = buildDocKey();
        const chat = await
            firebase
                .firestore()
                .collection('chats')
                .doc(docKey)
                .get();
        console.log(chat.exists);
        return chat.exists;
    }

    const goToChat = async (docKey, msg) => {
        const usersInChat = docKey.split(':');
        const chat = chatsInit.find(_chat => usersInChat.every(_user => _chat.users.includes(_user)));
        // this.setState({ newChatFormVisible: false });
        // await this.selectChat(chatsInit.indexOf(chat));
        submitMessage(msg);
    }

    const submitMessage = (msg) => {
        const docKey = buildDocKey(chatsInit[this.state.selectedChat]
          .users
          .filter(_usr => _usr !== this.state.email)[0])
        firebase
          .firestore()
          .collection('chats')
          .doc(docKey)
          .update({
            messages: firebase.firestore.FieldValue.arrayUnion({
              sender: this.state.email,
              message: msg,
              timestamp: Date.now()
            }),
            receiverHasRead: false
          });
      }

    // const goToChat = () => this.props.goToChatFn(buildDocKey(), message);

    // const buildDocKey = () => [firebase.auth().currentUser.email, username].sort().join(':');



    return (
        <div>
            <div className="modal-pet">
                <div className="d-flex align-items-center justify-content-center" onClick={() => history.push('/chat-dashboard/new-chat')} >
                    <h4>Chat Clinic Admin</h4>
                    <img src={add} onClick={() => history.push('/chat-dashboard/new-chat')} alt="" />
                </div>
                <Modal isOpen={modal} toggle={toggle} className='modal-pet'>
                    <ModalHeader className='modal-header-pet' toggle={toggle}>
                        <h1>{`Send Message to ${props.clinicName}`}</h1>
                    </ModalHeader>
                    <ModalBody className='form-pet' style={{ height: '200px' }}>
                        <form action="yoi" onSubmit={e => handleSubmit(e)}>
                            {/* <label htmlFor="email">Your Friend's Email</label><br />
                            <input type="text" placeholder='Input clinic email' onChange={e => setUsername(e.target.value)} /><br /> */}
                            <label htmlFor="message">Your Message</label><br />
                            <textarea type="text-area" placeholder='enter your message here' onChange={e => setMessage(e.target.value)} className="form-control" id="exampleFormControlTextarea1" rows="3" style={{ width: '200%' }} />
                        </form>
                    </ModalBody>
                    <ModalFooter className='modal-footer-pet'>
                        <button onClick={handlerNewChat} className='action-pet btn-block'>Send</button>
                    </ModalFooter>
                </Modal>
            </div>
        </div>
    );
}

const stateProps = (globalState) => {
    return {
        doctor: globalState.doctor
    }
}

const dispatchProps = (dispatch) => {
    return {
        addNewPet: () => dispatch({ type: "ADD_DOCTOR" })
    }
}

export default connect(stateProps, dispatchProps)(ModalExample);
