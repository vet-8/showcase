import React, { useEffect, useState } from 'react';
import './ManageDoc.css';
import ModalDoctor from './ModalDoctor';
import axios from 'axios'
import { Modal } from 'reactstrap';
import ModalDeleteDoc from './ModalDeleteDoc';
import { connect } from "react-redux";
import defaultDoc from './../img/vet.png'


const ManageDoc = (props) => {
  const anjing =
    'https://ik.imagekit.io/zvqf9loqe2/VET/Ellipse_10_tm2bFcdD2lB.svg';

  const [data, setData] = useState([])
  const [idDel, setIdDel] = useState('')
  useEffect(() => {
    axios(`https://api.vetclinic.my.id/admin/vetenary/?id=${localStorage.getItem('clinicid')}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        setData(res.data[0].userVetenaries)
        console.log(res.data[0].userVetenaries)
      })

    axios(`https://api.vetclinic.my.id/admin/vetenary/?id=${localStorage.getItem('clinicid')}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        setIdDel(res.data[0])
      })
    console.log(props.doctor)
  }, [props.doctor])



  const deleteDoctor = (e) => {
    axios(`https://5fc6be8cf3c77600165d7887.mockapi.io/managedoc/${e.target.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        setData([...data.filter(datax => datax.id !== e.target.id)])
      })
  }

  return (
    <>
      <div>
        <div className="row">
          <div className="roundedCli text-center col-2" style={{ marginLeft: '40px' }}>
            <div>
              <ModalDoctor />
              <br />
            </div>
            <p>Add New Doctor</p>
          </div>
          {data && data.map(data =>
            <div className="col-2 card-doctor">
              <div className="text-center">
                <div>
                  <ModalDeleteDoc id={data.id} username={data.user.fullname} />
                </div>

                <img id={data.user.id} onClick={e => deleteDoctor(e, 'id')}
                  src={defaultDoc}
                  style={{ paddingTop: '15px', height: '100px' }}
                />

                <div className="container">
                  <p style={{ paddingTop: '20px', color: '#1A3150' }}>
                    <b>{data.user.fullname}</b>
                  </p>
                </div>
              </div>
            </div>)
          }

        </div>


      </div>


    </>
  );
};


const stateToProps = (globalState) => {
  return {
    doctor: globalState.doctor
  };
};

export default connect(stateToProps)(ManageDoc);
