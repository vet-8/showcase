import React, { useState, useEffect } from "react";
import { Container, Row, Col, CardBody, CardText } from "reactstrap";
import "./UserHis.css";
import Axios from "axios";
import HistoryData from './HistoryData'
import { useHistory } from "react-router-dom";
import ClinicName from "./ClinicName";

const UserHis = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userHistories, setUserHistories] = useState([]);
  const [errorMsg, setErrorMsg] = useState('')
  const historyRouter = useHistory()

  useEffect(() => {
    setIsLoading(true)
    const url = `https://api.vetclinic.my.id/booking/history/${localStorage.getItem('id')}`;
    Axios(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then((res) => {
        console.log(res.data)
        setUserHistories(res.data);
        setIsLoading(false)
      })
      .catch(() => {
        setErrorMsg('You have no any booking history yet')
        setIsLoading(false)
      })
  }, []);

  console.log(userHistories);

  return (
    <div>
      {isLoading ?
        <div style={{ position: 'relative', top: '-100px', left: '400px' }}>
          <div className="spinner" >
            <div className="bounce1"></div>
            <div className="bounce2"></div>
            <div className="bounce3"></div>
          </div>
        </div> :
        <Container style={{ paddingBottom: '100px' }}>
          <CardBody style={{backgroundColor:'#FACB5A'}}>
            <CardText>
              <Row className="justify-content-around text-center">
                <Col>
                  <div ><strong></strong></div>
                </Col>
                <Col className="d-flex align-items-center justify-content-center">
                  <div className="name-of-clinic-clinic-title" style={{ left: '0px' }}>Clinic</div>
                </Col>
                <Col className="d-flex align-items-center justify-content-center">
                  <div className="clinic-name-clinic-title" style={{position:'relative', left:'0px'}}>Date</div>
                </Col>
                <Col className="d-flex align-items-center justify-content-center">
                  <div className="appointment-time-clinic-title" style={{ position: 'relative', left: '-7px' }}>Status</div>
                </Col>
                <Col
                  sm="3"
                  className="d-flex align-items-center justify-content-center"> <strong style={{ position: 'relative', left: '15px' }}></strong>

                </Col>
              </Row>
            </CardText>
          </CardBody>
          {userHistories.length === 0 ?
            <h2 className='d-flex justify-content-center align-items-center'>You have no any booking history yet.</h2> :
            userHistories.map(history =>
              <div tabIndex="1" className="card history-card-user">
                <CardBody className='body-history' >
                  <Row className="text-center align-items-center">
                    <Col>
                      <HistoryData id={history.clinicId} />
                    </Col>
                    <Col className="d-flex align-items-center justify-content-center">
                      <div className="clinic-name">
                        <ClinicName id={history.clinicId} />
                      </div>
                    </Col>
                    <Col className="d-flex align-items-center justify-content-center">
                      <div className="clinic-date">{history.vetenariesTime.operationalDay}</div>
                    </Col>
                    <Col className="d-flex align-items-center justify-content-center">
                      <div className="history-time" style={{ position: 'relative', left: '20px' }}>Finished</div>
                    </Col>
                    <Col sm="4">
                      <span
                        className="mr-1 btn btn-warning history-button"
                        onClick={() => historyRouter.push(`/book-clinic/${history.clinicId}`)}
                      >
                        Book Again
                </span>
                    </Col>
                  </Row>
                </CardBody>
              </div>
            )
          }
        </Container>
      }

    </div>
  );
};

export default UserHis;
