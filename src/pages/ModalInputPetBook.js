import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import add from './../img/Vector (1).png'
import './modalPetInfo.css'
import Axios from 'axios'
import {connect} from 'react-redux'

const ModalExample = (props) => {
    // const {
    //     buttonLabel,
    //     className
    // } = props;

    const [modal, setModal] = useState(false);
    const [specyId, setSpecyId] = useState('')

    const handlerSpecyId = (e) => {
        setSpecyId(e.target.value)
    }

    const [gender, setGender] = useState('')
    const handlerGender = (e) => {
        setGender(e.target.value)
    }

    const [name, setName] = useState('')
    const handlerName = e => {
        setName(e.target.value)
    }

    const history = useHistory()
    const params = useParams().id

    const handleSubmit = e => {
        name === '' ? alert ('enter your pet name first') :
        specyId === '' ? alert('choose your kind of pet') : ''

        const bodyData = {
            name,
            petSpecyId: specyId,
            gender
        }
        console.log(bodyData)
        Axios(`https://api.vetclinic.my.id/pet`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }, data: JSON.stringify(bodyData)
        })
            .then(() => {
                history.push(`/book-clinic/${props.param}`)
                props.addNewPet()
                toggle()
            })
            .catch (err => {
                err.message === 'Request failed with status code 409' ? alert('try another pet name, it has been used') : ''
            })
    }

    const toggle = () => setModal(!modal);

    return (
        <div>
            <div className="modal-pet">
                <img src={add} onClick={toggle} alt="" />
                <Modal isOpen={modal} toggle={toggle} className='modal-pet'>
                    <ModalHeader className='modal-header-pet' toggle={toggle}>
                        <h1>Pet Information Input</h1>
                    </ModalHeader>
                    <ModalBody className='form-pet'>
                        <form action="yoi" onSubmit={e => handleSubmit(e)}>
                            <label htmlFor="namaHewan">Your Pet's name</label><br />
                            <input type="text" placeholder='Nama Hewan Peliharaan' onChange={e => handlerName(e, 'value')} /><br />
                            <label htmlFor="PilihHewan">Your pet's species</label><br />

                            <select className="pets-dropdown" name="pets" onChange={e => handlerSpecyId(e, 'value')}>
                                <option value="invalid">Choose Kind of Pet</option>
                                <option value="648928bb-3b8a-11eb-a4ce-06058d744160">Dog</option>
                                <option value="64895775-3b8a-11eb-a4ce-06058d744160">Cat</option>
                                <option value="648958b7-3b8a-11eb-a4ce-06058d744160">Rabbit</option>
                                <option value="64895924-3b8a-11eb-a4ce-06058d744160">Hamster</option>
                            </select> <br />
                            <label htmlFor="gender">Choose Your Pet's Gender</label><br />
                            <select className="pets-dropdown" id="pets" name="pets" onChange={e => handlerGender(e, 'value')}>
                                <option value="Choose">Choose Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select> <br />
                        </form>
                    </ModalBody>
                    <ModalFooter className='modal-footer-pet'>
                        <button onClick={handleSubmit} className='action-pet btn-block'>Add Pet</button>
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
        addNewPet: () => dispatch({type: "ADD_DOCTOR"})
    }
}

export default connect (stateProps, dispatchProps) (ModalExample);
