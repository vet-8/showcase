import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  CardBody,
  CardText,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import "./BookFromPatient.css";
import "../pages/EditUser.css";
import axios from "axios";

const BookFromPatient = () => {
  const [userVetenariesId, setUserVetenariesId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [modalAccept, setModalAccept] = useState(false);
  const [modalDecline, setModalDecline] = useState(false);
  const [bookFromPatients, setBookFromPatients] = useState([]);
  const [patientId, setPatientId] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    getUserVetenariesId();
    getData();
    setIsLoading(false);
  }, []);

  const getUserVetenariesId = () => {
    const url = `${process.env.REACT_APP_API_URL
      }/vetenary/profile/${localStorage.getItem("id")}`;
    const auth = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    axios.get(url, auth).then((res) => {
      localStorage.setItem(
        "userVetenariesId",
        res.data[0].userVetenaries[0].id
      );
      // console.log(res.data[0].userVetenaries[0].id);
    });
  };

  const getData = () => {
    const url = `${process.env.REACT_APP_API_URL
      }/vetenary/booking/?id=${localStorage.getItem("userVetenariesId")}`;
    const auth = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    axios.get(url, auth).then((res) => {
      // console.log(res.data);
      setBookFromPatients(res.data[0].vetenariesTimes);
      // console.log(res.data[0].vetenariesTimes);
    });
  };

  const toggleAccept = () => {
    setModalAccept(!modalAccept);
  };

  const toggleDecline = () => {
    setModalDecline(!modalDecline);
  };

  const modalAcceptClickAccept = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const url = `${process.env.REACT_APP_API_URL}/vetenary/booking/approval/${patientId}`;
    const body = {
      status: "approve",
    };
    const auth = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    axios.patch(url, body, auth).then((res) => {
      // console.log(res.data);
      getData();
      setIsLoading(false);
      toggleAccept();
    });
  };

  // console.log(localStorage.getItem("token"));

  const modalAcceptClickCancel = () => {
    toggleAccept();
  };

  const modalDeclineClickYes = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const url = `${process.env.REACT_APP_API_URL}/vetenary/booking/approval/${patientId}`;
    const body = {
      status: "decline",
    };
    const auth = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    axios.patch(url, body, auth).then((res) => {
      // console.log(res.data);
      getData();
      setIsLoading(false);
      toggleAccept();
    });
  };

  const modalDeclineClickCancel = () => {
    toggleDecline();
  };

  return (
    <>
      <Container>
        {isLoading ? (
          <div>
            <div className="spinner">
              <div className="bounce1"></div>
              <div className="bounce2"></div>
              <div className="bounce3"></div>
            </div>
          </div>
        ) : (
            <div className='cover-doc'>
              <div tabIndex="1" className="card w-100 appointment-card-title mb-2" style={{ position: 'relative', left: '15px', maxWidth: '99.4%', top: '15px', marginBottom: '15px' }}>
                <CardBody>
                  <CardText>
                    <Row className="justify-content-around text-center" style={{ position: 'relative', left: '-17px' }}>
                      <Col>
                        <div ><strong>Date</strong></div>
                      </Col>

                      <Col className="d-flex align-items-center justify-content-center">
                        <div className="name-of-clinic-clinic-title" style={{ left: '9px' }}>Customer</div>
                      </Col>
                      <Col className="d-flex align-items-center justify-content-center">
                        <div className="clinic-name-clinic-title" style={{ position: 'relative', left: '80px' }}>Time</div>
                      </Col>
                      <Col className="d-flex align-items-center justify-content-center">
                        <div className="appointment-time-clinic-title" style={{ position: 'relative', left: '165px' }}>Action</div>
                      </Col>
                      <Col
                        sm="3"
                        className="d-flex align-items-center justify-content-center"> <strong style={{ position: 'relative', left: '15px' }}></strong>

                      </Col>
                    </Row>
                  </CardText>
                </CardBody>
              </div>
              {
                bookFromPatients.map((BookFromPatientList) => {
                  if (
                    BookFromPatientList.bookings[0] &&
                    !BookFromPatientList.bookings[0].status
                  )
                    // console.log(BookFromPatientList);
                    return (
                      <div
                        tabIndex="1"
                        className="card appointment-card-user"
                        key={BookFromPatientList.id}
                      >
                        <CardBody className='appointmentCards-doctor'>
                          <Row className="d-flex align-items-center">
                            <Col>
                              <div className="appointment-date  d-flex align-items-center">
                                {BookFromPatientList.operationalDay}
                              </div>
                            </Col>
                            <Col sm="2" className="d-flex align-items-center">
                              <div className="approval-name" style={{position:'relative', left:'-50px'}}>
                                {BookFromPatientList.bookings[0]
                                  ? BookFromPatientList.bookings[0].user.fullname
                                  : "not found"}
                              </div>
                            </Col>
                            {/* <Col className="d-flex align-items-center justify-content-center">
                          <div className="approval-pet-counts">
                            {BookFromPatientList.pets}
                          </div>
                        </Col> */}
                            <Col className="d-flex align-items-center justify-content-center">
                              <div className="approval-time">
                                {BookFromPatientList.startTime}-
                              {BookFromPatientList.endTime}
                              </div>
                            </Col>
                            <Col sm="4" style={{position:'relative', left:'50px'}}>
                              <span
                                className="mr-1 btn btn-approve"
                                onClick={() => {
                                  setModalAccept(!modalAccept);
                                  setPatientId(BookFromPatientList.bookings[0].id);
                                  // console.log(patientId);
                                  // toggleAccept;
                                }}
                              >
                                Approve
                            </span>
                              <span
                                className="ml-1 btn btn-decline"
                                onClick={toggleDecline}
                              >
                                Decline
                            </span>
                            </Col>
                          </Row>
                        </CardBody>
                      </div>
                    );
                })
              }
            </div>

          )}
        <Modal
          isOpen={modalAccept}
          toggle={toggleAccept}
          className="doctor-modal-placement"
        // onClick={() => console.log(BookFromPatientList.id)}
        >
          <ModalBody>Are you sure want to accept?</ModalBody>

          <ModalFooter className="justify-content-center">
            <Button
              color="light"
              onClick={modalAcceptClickCancel}
              className="px-5 mx-3"
            >
              Cancel
            </Button>
            <Button
              color="warning"
              onClick={modalAcceptClickAccept}
              className="px-5 mx-3"
            >
              Accept
            </Button>
          </ModalFooter>
        </Modal>
        {/* modal decline start */}
        <Modal
          isOpen={modalDecline}
          toggle={toggleDecline}
          className="doctor-modal-placement"
        >
          <ModalBody>Are you sure want to Decline?</ModalBody>

          <ModalFooter className="justify-content-center">
            <Button
              color="light"
              onClick={modalDeclineClickCancel}
              className="px-5 mx-3"
            >
              Cancel
            </Button>
            <Button
              color="warning"
              onClick={modalDeclineClickYes}
              className="px-5 mx-3"
            >
              Yes
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    </>
  );
};

export default BookFromPatient;
