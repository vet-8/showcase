import React from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import Axios from 'axios'
import './ModalDeleteDoc.css'
import { connect } from 'react-redux'


const ModalDeleteDoc = (props) => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const history = useHistory()


    const deleteDoctor = () => {
        console.log(props.id)
        console.log(localStorage.getItem('token'))
        const bodyData = {
            id: props.id
        }
        const url = 'https://api.vetclinic.my.id/admin/vetenary'
        Axios(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }, data: JSON.stringify(bodyData)
        })
            .then(() => {
                history.push('/managedoctor/manage-doctor')
                props.deleteVet()
                toggle()
            })
    }

    return (
        <div>
            <img className='deleteDoc' src="https://ik.imagekit.io/zvqf9loqe2/VET/Vector__5__hJPCC-fLDIp.svg" style={{ paddingTop: '1rem', paddingLeft: '8rem' }} onClick={toggle} />
            <Modal isOpen={modal} toggle={toggle} className="doctor-modal-delete">
                <ModalBody className="text-center">{`Are you sure to delete ${props.username} from your clinic?`}</ModalBody>
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
        deleteVet: () => dispatch({ type: "ADD_DOCTOR" })
    }
}

export default connect(stateToProps, dispatcher)(ModalDeleteDoc);