import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardText,
  CardBody,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import "./DoctorApproval.css";
import axios from "axios";

const DoctorApproval = () => {
  const [userVetenariesId, setUserVetenariesId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [approvalLists, setApprovalLists] = useState([]);
  const [bookingId, setBookingId] = useState("");
  const [isSuccessfull, setIsSuccessfull] = useState(false);
  const toggle = () => setModal(!modal);

  const toggleApprove = () => {
    setModal(!modal);
  };

  const toggleIsSuccessfull = (e) => {
    e.preventDefault();
    const url = `${process.env.REACT_APP_API_URL}/vetenary/booking/success/${bookingId}`;
    const body = {
      isSuccessfull: 1,
    };
    const auth = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    setModal(!modal);

    setIsLoading(true);
    axios.patch(url, body, auth);
    getData();
    setIsLoading(false);
  };

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
      console.log(res.data[0].userVetenaries[0].id);
    });
  };

  // console.log(userVetenariesId);

  const getData = () => {
    const url = `${process.env.REACT_APP_API_URL
      }/vetenary/booking/?id=${localStorage.getItem("userVetenariesId")}`;
    const auth = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    axios
      .get(url, auth)
      .then((res) => {
        console.log(res.data[0].vetenariesTimes);
        setApprovalLists(res.data[0].vetenariesTimes);
      })
      .catch((err) => console.log(err));
  };

  return (
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
          <div className="cover-doc">
            <div tabIndex="1" className="card w-100 appointment-card-title mb-2" style={{position: 'relative', left:'15px', maxWidth:'99.4%', top:'15px', marginBottom:'15px'}}>
              <CardBody>
                <CardText>
                  <Row className="justify-content-around text-center" style={{position:'relative', left:'-17px'}}>
                    <Col>
                      <div ><strong>Date</strong></div>
                    </Col>

                    <Col className="d-flex align-items-center justify-content-center">
                      <div className="name-of-clinic-clinic-title" style={{ left: '9px' }}>Customer</div>
                    </Col>
                    <Col className="d-flex align-items-center justify-content-center">
                      <div className="clinic-name-clinic-title" style={{position:'relative', left: '120px'}}>Time</div>
                    </Col>
                    <Col className="d-flex align-items-center justify-content-center">
                      <div className="appointment-time-clinic-title" style={{ position: 'relative', left: '180px' }}>Status</div>
                    </Col>
                    <Col
                      sm="3"
                      className="d-flex align-items-center justify-content-center"> <strong style={{ position: 'relative', left: '15px' }}></strong>

                    </Col>
                  </Row>
                </CardText>
              </CardBody>
            </div>
            {approvalLists.map((approvalList) => {
              if (approvalList.bookings[0])
                return (
                  <div
                    tabIndex="1"
                    className="card appointment-card-user"
                    key={approvalList.id}
                  >
                    <CardBody className='appointmentCards-doctor'>
                      <Row className="justify-content-around text-center">
                        <Col>
                          <div className="approval-date d-flex align-items-center justify-content-center">
                           <strong> {approvalList.operationalDay}</strong>
                          </div>
                        </Col>
                        <Col sm="2" className="d-flex align-items-center">
                          <div className="approval-name" style={{ position: 'relative', left: '-70px' }}>
                            {approvalList.bookings[0]
                              ? approvalList.bookings[0].user.fullname
                              : "not found"}
                          </div>
                        </Col>
                        {/* <Col className="d-flex align-items-center justify-content-center">
                      <div className="approval-pet-counts">
                        {approvalList.pets} pets
                      </div>
                    </Col> */}
                        <Col className="d-flex align-items-center justify-content-center">
                          <div className="approval-time">
                            {approvalList.startTime}-{approvalList.endTime}
                          </div>
                        </Col>
                        <Col
                          sm="3"
                          className="d-flex align-items-center justify-content-center status-doctor" 
                        >
                          {approvalList.bookings[0].isSuccessfull ? (
                            <p className="btn btn-success">Done</p>
                          ) : approvalList.bookings[0].status ? (
                            approvalList.bookings[0].status === "approve" ? (
                              <p
                                className="btn btn-warning"
                                onClick={(event) => {
                                  toggleApprove();
                                  setBookingId(approvalList.bookings[0].id);
                                  console.log(approvalList.bookings[0].id);
                                }}
                              >
                                {approvalList.bookings[0].status}
                              </p>
                            ) : (
                                <p className="btn btn-danger">
                                  {approvalList.bookings[0].status}
                                </p>
                              )
                          ) : (
                                <p className="btn btn-secondary">Under Review</p>
                              )}
                        </Col>
                      </Row>
                    </CardBody>
                  </div>
                );
            })}
          </div>

        )}
      <Modal isOpen={modal} toggle={toggle} className="doctor-modal-placement">
        <ModalBody className="text-center">
          Are you sure want to finish the appointment?
        </ModalBody>
        <ModalFooter className="justify-content-center">
          <Button color="light" onClick={toggle} className="px-5 mx-3">
            Cancel
          </Button>
          <Button
            color="warning"
            onClick={toggleIsSuccessfull}
            className="px-5 mx-3"
          >
            Finish
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default DoctorApproval;
