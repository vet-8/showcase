import React, { useState } from "react";
import Header from "../layout/Header";
import { Switch, Route, NavLink, useRouteMatch } from "react-router-dom";
import "./Dokter.css";
import { Container, Row, Col } from "reactstrap";
import DoctorLeftSide from "../components/DoctorLeftSide";
import DoctorApproval from "../components/DoctorApproval";
import BookFromPatient from "../components/BookFromPatient";
import EditDoctorRight from "../components/EditDoctorRight";
import { checkIsDoctor } from "../Helper";
import Footer from "./../layout/Footer";

const Dokter = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [submenu, setSubmenu] = useState('approval')
  let { path, url } = useRouteMatch();
  console.log(path);

  const [editProfile, setEditProfile] = useState(false);

  const handleEditProfile = () => {
    setEditProfile(!editProfile);
  };

  //ada komponen book from patient default
  //ada komponen approval clicked
  console.log(localStorage.getItem("pictureUrl"));

  if (checkIsDoctor()) {
    return (
      <>
        <Header />
        <div className="dokter-background">
          <br />
          <br />
          <br />
          <br />
          <br />
          <Container fluid={true}>
            <Row>
              <Col sm="4">
                <DoctorLeftSide whatNow={editProfile} handleEditProfile={handleEditProfile} />
              </Col>
              <Col sm="8">
                <div className="dokter-right-box">
                  {editProfile && (
                    <Switch>
                      <Route path={`${path}/edit-profile`}>
                        <EditDoctorRight />
                      </Route>
                    </Switch>
                  )}
                  {!editProfile && (
                    <>
                      <Row>
                        <Row className="mt-4 ml-4">
                          <button className={`submenu-clinic ${submenu === 'approval' ? 'submenu-clinic-active' : ''}`} onClick={() => setSubmenu('approval')}> Approval </button>
                          <button className={`submenu-clinic ${submenu === 'book' ? 'submenu-clinic-active' : ''}`} onClick={() => setSubmenu('book')}> Book from Patients</button>
                        </Row>
                      </Row>
                      <Row className="mb-4">
                        <Row className="mb-4">
                          {submenu === 'approval' ? <DoctorApproval /> : <BookFromPatient />}
                        </Row>
                      </Row>
                    </>
                  )}


                </div>
              </Col>
            </Row>
          </Container>{" "}
          <br />
          <br />
          <br />
          <br />
          <Footer />
        </div>
      </>
    );
  } else {
    return (
      <>
        <Header />
        <br />
        <br />
        <br />
        <br />
        <br />
        <h1>only for doctors</h1>
      </>
    );
  }
};

export default Dokter;
