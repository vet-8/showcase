import React, { useState, useEffect } from "react";
import { Container, Row, Col, CardText, CardBody } from "reactstrap";
import "./UserApp.css";
import Axios from "axios";
import ClinicName from "./ClinicName";
import ModalDeleteApp from "./ModalDeleteApp";
import { connect } from 'react-redux'

const UserApp = (props) => {
  const [isLoading, setIsLoading] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    setIsLoading(true)
    const url = `https://api.vetclinic.my.id/booking/${localStorage.getItem('id')}`;
    Axios(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        console.log('ini dari booking')
        console.log(res.data)
        setAppointments(res.data)
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))

  }, [props.appointment]);

  const handleRemove = e => {
    const url = `https://api.vetclinic.my.id/booking/`;
    Axios(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(() => {
        setTrigger
      })
  }


  return (
    <>
      <Container>
        {isLoading ?
          <div style={{ position: 'relative', top: '-100px' }}>
            <div className="spinner" >
              <div className="bounce1"></div>
              <div className="bounce2"></div>
              <div className="bounce3"></div>
            </div>
          </div>
          : appointments.length < 1 ?
            <h3>You do not have any appointment yet.</h3> :

            <div>
              <div tabIndex="1" className="card w-100 appointment-card-title mb-2">
                <CardBody>
                  <CardText>
                    <Row className="justify-content-around text-center">
                      <Col>
                        <div ><strong>Date</strong></div>
                      </Col>

                      <Col className="d-flex align-items-center justify-content-center">
                        <div className="name-of-clinic-clinic-title" style={{left: '-48px'}}>Clinic</div>
                      </Col>
                      <Col className="d-flex align-items-center justify-content-center">
                        <div className="clinic-name-clinic-title">Time</div>
                      </Col>
                      <Col className="d-flex align-items-center justify-content-center">
                        <div className="appointment-time-clinic-title" style={{position: 'relative', left: '90px'}}>Status</div>
                      </Col>
                      <Col
                        sm="3"
                        className="d-flex align-items-center justify-content-center"> <strong style={{ position: 'relative', left: '15px' }}></strong>

                      </Col>
                    </Row>
                  </CardText>
                </CardBody>
              </div>
              {appointments.map(appointment =>
                <div
                  tabIndex="1"
                  className="card appointment-card-user"

                >
                  <CardBody className='appointmentCards'>
                    <Row className="d-flex align-items-center">
                      <Col>
                        <div className="appointment-date d-flex align-items-center justify-content-center">
                          {appointment.vetenariesTime.operationalDay}
                        </div>
                      </Col>

                      <Col className="d-flex align-items-center ">
                        <div className="name-of-clinic">
                          <ClinicName id={appointment.clinicId} />
                        </div>
                      </Col>
                      <Col className="d-flex align-items-center justify-content-center">
                        <div className="appointment-time">
                          {appointment.vetenariesTime.startTime}
                        </div>
                      </Col>
                      <Col
                        sm="3"
                        className="d-flex align-items-center justify-content-center"
                      >
                        {appointment.status === null ?
                          <span
                            className="btn btn-warning status-app-user"
                            style={{
                              borderRadius: "25px",
                              backgroundColor: "#FDCB5A",
                              minWidth: '130px'
                            }}
                          >
                            Waiting
                      </span>
                          :
                          appointment.status === 'approve' ?
                            <span
                              className="btn btn-warning  status-app-user"
                              style={{
                                borderRadius: "25px",
                                backgroundColor: "#ABDBA7",
                                color: '#22A017',
                                border: '0px',
                                minWidth: '130px'
                              }}
                            >
                              Approved
                        </span> :

                            (
                              <span
                                className="btn btn-danger  status-app-user"
                                style={{
                                  borderRadius: "25px",
                                  backgroundColor: "#BA454B, 42%",
                                  minWidth: '130px'
                                }}
                              >
                                Disapprove
                              </span>
                            )}
                      </Col>
                      <Col className='remover-user-app'>
                        <ModalDeleteApp id={appointment.id} />
                      </Col>
                    </Row>
                  </CardBody>
                </div>

              )
              }
            </div>

        }
      </Container>
    </>
  );
};

const stateProps = globalState => {
  return {
    appointment: globalState.doctor
  }
}

export default connect(stateProps)(UserApp);
