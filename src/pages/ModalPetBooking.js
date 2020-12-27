import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import add from './../img/Vector (1).png'
import './modalPetInfo.css'
import Axios from 'axios'
import { connect } from 'react-redux'

const ModalExample = (props) => {
    const {
        buttonLabel,
        className
    } = props;

    const [modal, setModal] = useState(false);
    const [pets, setPets] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [name, setName] = useState('')

    useEffect(() => {
        console.log(props.trigger)
        setIsLoading(true)
        Axios(`https://api.vetclinic.my.id/pet/${localStorage.getItem('id')}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                console.log(res.data)
                setPets(res.data)
                setIsLoading(false)
            })
    }, [props.doctor])

    const history = useHistory()
    const params = useParams().id

    const handleSubmit = e => {

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
                history.push('/foruser/edit-profile')
                toggle()
            })
    }

    const toggle = () => setModal(!modal);

    return (
        <div>
            <div className="modal-pet">
                <img src={add} onClick={toggle} alt="" />
                <Modal isOpen={modal} toggle={toggle} className='modal-pet'>
                    <ModalHeader className='modal-header-pet' toggle={toggle}>
                        <h1>Which Pet You Would Like to Check?</h1>
                    </ModalHeader>
                    <ModalBody className='form-pet form-pet-booking'>
                        <form action="yoi" onSubmit={e => handleSubmit(e)}>
                            <select className="pets-dropdown" name="pets" onChange={e => handlerSpecyId(e, 'value')}>
                                <option value="invalid">Choose Kind of Pet</option>
                                {pets.map(pet =>
                                    <option value={pet.id}>{pet.name}</option>
                                )}

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

export default connect(stateProps)(ModalExample);