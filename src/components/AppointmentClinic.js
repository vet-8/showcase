import Axios from 'axios';
import { data } from 'jquery';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, CardText, CardBody } from 'reactstrap';
import './AppointmentClinic.css';
import DetailClinicApp from './DetailClinicApp'

const AppointmentClinic = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([])
  useEffect(() => {
    setIsLoading(true)
    Axios(`https://api.vetclinic.my.id/admin/booking/?id=${localStorage.getItem('clinicid')}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        setData(res.data[0].userVetenaries)
        setIsLoading(false)
        console.log(res.data[0].userVetenaries)
      })
  }, [])
  return (
    <>
      {isLoading &&
        <div style={{ position: 'relative', top: '-100px', left: '400px' }}>
          <div className="spinner" >
            <div className="bounce1"></div>
            <div className="bounce2"></div>
            <div className="bounce3"></div>
          </div>
        </div>}
      <Container>
        <div tabIndex="1" className="card w-100 appointment-card-title mb-2">
          <CardBody>
            <CardText>
              <Row className="justify-content-around text-center">
                <Col>
                  <div ><strong>Date</strong>
                    
                  </div>
                </Col>

                <Col className="d-flex align-items-center justify-content-center">
                  <div className="name-of-clinic-clinic-title">Veterinarian</div>
                </Col>
                <Col className="d-flex align-items-center justify-content-center">
                  <div className="clinic-name-clinic-title">Customer</div>
                </Col>
                <Col className="d-flex align-items-center justify-content-center">
                  <div className="appointment-time-clinic-title">Time</div>
                </Col>
                <Col
                  sm="3"
                  className="d-flex align-items-center justify-content-center"> <strong style={{position:'relative', left: '15px'}}>Contact</strong> 
                  
                </Col>
              </Row>
            </CardText>
          </CardBody>
        </div>
        {data && data.map((data, index) =>
          <DetailClinicApp vetName={data.user.fullname} index={index} />
        )}

        {/* <div tabIndex="1" className="card w-100 appointment-card mb-2">
          <CardBody>
            <CardText>
              <Row className="justify-content-around text-center">
                <Col>
                  <div className="appointment-date d-flex align-items-center">
                    12 OKT
                  </div>
                </Col>

                <Col className="d-flex align-items-center justify-content-center">
                  <div className="name-of-clinic">drh. Ivan Adrianto</div>
                </Col>
                <Col className="d-flex align-items-center justify-content-center">
                  <div className="clinic-name">Ivan Kasella</div>
                </Col>
                <Col className="d-flex align-items-center justify-content-center">
                  <div className="appointment-time">19.20</div>
                </Col>
                <Col
                  sm="3"
                  className="d-flex align-items-center justify-content-center">
                  <span>
                    <img src="https://ik.imagekit.io/zvqf9loqe2/VET/eva_message-square-fill_BKxk6qNCntU.svg" />
                  </span>
                </Col>
              </Row>
            </CardText>
          </CardBody>
        </div>
        <div tabIndex="1" className="card w-100 appointment-card mb-2">
          <CardBody>
            <CardText>
              <Row className="justify-content-around text-center">
                <Col>
                  <div className="appointment-date d-flex align-items-center">
                    12 OKT
                  </div>
                </Col>

                <Col className="d-flex align-items-center justify-content-center">
                  <div className="name-of-clinic">drh. Ivan Adrianto</div>
                </Col>
                <Col className="d-flex align-items-center justify-content-center">
                  <div className="clinic-name">Ivan Kasella</div>
                </Col>
                <Col className="d-flex align-items-center justify-content-center">
                  <div className="appointment-time">19.20</div>
                </Col>
                <Col
                  sm="3"
                  className="d-flex align-items-center justify-content-center">
                  <span>
                    <img src="https://ik.imagekit.io/zvqf9loqe2/VET/eva_message-square-fill_BKxk6qNCntU.svg" />
                  </span>
                </Col>
              </Row>
            </CardText>
          </CardBody>
        </div>
        <div tabIndex="1" className="card w-100 appointment-card mb-2">
          <CardBody>
            <CardText>
              <Row className="justify-content-around text-center">
                <Col>
                  <div className="appointment-date d-flex align-items-center">
                    12 OKT
                  </div>
                </Col>

                <Col className="d-flex align-items-center justify-content-center">
                  <div className="name-of-clinic">drh. Ivan Adrianto</div>
                </Col>
                <Col className="d-flex align-items-center justify-content-center">
                  <div className="clinic-name">Ivan Kasella</div>
                </Col>
                <Col className="d-flex align-items-center justify-content-center">
                  <div className="appointment-time">19.20</div>
                </Col>
                <Col
                  sm="3"
                  className="d-flex align-items-center justify-content-center">
                  <span>
                    <img src="https://ik.imagekit.io/zvqf9loqe2/VET/eva_message-square-fill_BKxk6qNCntU.svg" />
                  </span>
                </Col>
              </Row>
            </CardText>
          </CardBody>
        </div> */}
      </Container>
    </>
  );
};

export default AppointmentClinic;
