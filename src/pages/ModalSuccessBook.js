import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './modalSuccessBook.css'
import mantap from './../img/Vector (3).png'
import Axios from 'axios';

const ModalExample = (props) => {
    const {
        buttonLabel,
        className
    } = props;

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const handlerClick = () => {

        const urlBooking = "https://api.vetclinic.my.id/booking"
        const bodyDataBook = {
            userVetenariesId: localStorage.getItem('vetId'),
            clinicId: localStorage.getItem('clinicIdForBooking'),
            petId: localStorage.getItem('petId'),
            operationalDay: localStorage.getItem('hariKunjungan'),
            startTime: localStorage.getItem('waktuKunjungan').slice(0,5),
            endTime: localStorage.getItem('waktuKunjungan').slice(6,11),
            userId:localStorage.getItem('id')
        }   
        console.log(bodyDataBook)


        Axios(urlBooking, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }, data: JSON.stringify(bodyDataBook)
        })
            .then((res) => {
                console.log(res)
                toggle()
                localStorage.removeItem('namaHewan1')
                localStorage.removeItem('namaHewan2')
                localStorage.removeItem('namaHewan3')
                localStorage.removeItem('namaHewan4')
                localStorage.removeItem('namaDokter')
                localStorage.removeItem('waktuKunjungan')
                localStorage.removeItem('hariKunjungan')
            })

    }

    return (
        <div className='modal-success'>
            <button className='finish-booking' onClick={handlerClick}>Finish</button>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalBody className='wow'>
                    <img src={mantap} alt="mantap" /><br />
                    <h1>Booking Success</h1>
                </ModalBody>
            </Modal>
        </div>
    );
}

export default ModalExample;