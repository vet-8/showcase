import React from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import Axios from 'axios'
import './ModalDeleteDoc.css'
import { connect } from 'react-redux'
import remover from './../img/garbage-can.svg'


const ModalDeleteApp = (props) => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const history = useHistory()


    const deleteDoctor = () => {
        const bodyData = {
            id: props.id
        }
        console.log(props.id)
        

        const url = 'https://api.vetclinic.my.id/booking'
        Axios(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }, data: JSON.stringify(bodyData)
        })
            .then(() => {
                history.push('/foruser/appointments')
                props.deleteAppointment()
                toggle()
            })
    }

    return (
        <div>
           <img src={remover} alt="remove!" onClick={toggle}/>
            <Modal isOpen={modal} toggle={toggle} className="doctor-modal-delete" style={{position: 'relative', top: '-120px'}}>
                <ModalBody className="text-center">{`Are you sure to delete the appointment?`}</ModalBody>
                <ModalFooter>
                    <Button className='btn-delete-doc' onClick={deleteDoctor}>Delete</Button>
                    <Button className='btn-cancel-delete-doc' onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

const stateToProps = (globalState) => {
    return {
        doctor: globalState.doctor
    }
}

const dispatcher = (dispatch) => {
    return {
        deleteAppointment: () => dispatch({ type: "ADD_DOCTOR" })
    }
}

export default connect(stateToProps, dispatcher)(ModalDeleteApp);