import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import './ModalDoctor.css';
import { connect } from 'react-redux'
import Axios from 'axios'


const ModalDoctor = (props) => {
  const history = useHistory()
  const [modal, setModal] = useState(false);

  const add =
    'https://ik.imagekit.io/zvqf9loqe2/VET/Vector__1__wVzNtBzycat.svg';

  const toggle = () => {
    setModal(!modal);
  }
  const [username, setUsername] = useState('')
  const handleUsername = (e) => {
    setUsername(e.target.value)
  }
  const [email, setEmail] = useState('')
  const handleEmail = (e) => {
    setEmail(e.target.value)
  }
  const [password, setPassword] = useState('')
  const handlePassword = (e) => {
    setPassword(e.target.value)
  }
  const [fullname, setFullname] = useState('')
  const handleFullname = (e) => {
    setFullname(e.target.value)
  }
  const handlesubmitDoctor = () => {
    const url = 'https://api.vetclinic.my.id/admin/vetenary'
    const bodyData = {
      fullname,
      username,
      email,
      password
    }
    Axios(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }, data: JSON.stringify(bodyData)
    })
      .then(() => {
        history.push('/managedoctor/manage-doctor')
        props.addNewDoctor()
        console.log(props.doctor)
        toggle()
      })

  }


  return (
    <div>
      <div className="round-corner modal-add-doctor">
        <img src={add} onClick={toggle} alt="" />
        <Modal isOpen={modal} toggle={toggle} className='modal-add-doctor'>
          <ModalHeader className='modal-header-add-doctor' toggle={toggle}>
            <h3>New Veterinarian Input</h3>
          </ModalHeader>
          <ModalBody className="form-dokter">
            {/* <form className='form-add-doctor'> */}
            <label>Fullname</label>
            <br />
            <Input className='input-new'
              type="telephone"
              placeholder="Fullname"
              style={{ width: '400px' }}
              onChange={e => handleFullname(e, 'value')}
            />
            <br />
            <br />
            <label>Username</label>
            <br />
            <Input className='input-new'
              type="text"
              placeholder="Username"
              style={{ width: '400px' }}
              onChange={e => handleUsername(e, 'value')}
            />
            <br />
            <br />
            <label style={{ marginLeft: '-340px' }}>E-mail</label>
            <br />
            <Input
              type="email"
              className='input-new'
              placeholder="Email"
              style={{ width: '400px' }}
              onChange={e => handleEmail(e, 'value')}
            />
            <br />
            <br />
            <label>Password</label>
            <br />
            <Input
              className='input-new'
              type="password"
              placeholder="Password"
              style={{ width: '400px' }}
              onChange={e => handlePassword(e, 'value')}
            />
            <br />
            <br />
            {/* </form> */}
          </ModalBody>
          <ModalFooter className='modal-footer-add-doctor'>
            <button onClick={e => handlesubmitDoctor(e, 'value')}>Simpan</button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
};

const stateToProps = (globalState) => {
  return {
    doctor: globalState.doctor
  }
}

const dispatchToProps = (dispatch) => {
  return {
    addNewDoctor: () => dispatch({ type: "ADD_DOCTOR" }),
  };
};

export default connect(stateToProps, dispatchToProps)(ModalDoctor);
