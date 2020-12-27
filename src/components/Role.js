import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Col,
  Row,
  Button,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  Collapse,
} from "reactstrap";
import anjing from "./../image-dog/ANJING.png";
import "./../components/Role.css";

const Role = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [isAdmin, setIsAdmin] = useState('');

  const toggle = () => setIsOpen(!isOpen);

  const handleClinicClick = () => {
    setIsAdmin('admin')
    localStorage.setItem("role", "admin");
  };

  const handlePatientClick = () => {
    setIsAdmin('user')
    localStorage.setItem("role", "user");
  };


  console.log(localStorage.getItem("role"));

  return (
    <div>
      {/* Navbar start */}
      <div className="role-header">
        <Navbar light expand="md" className="pt-0">
          <NavbarToggler onClick={toggle} className="'ml-auto" />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto font-weight-bold" navbar>
              <NavItem>
                <Link to='/'>
                  <NavLink className="role-text ml-2">
                    Home
                  </NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link to='/doctor'>
                  <NavLink className="role-text ml-2">
                    Doctor
                  </NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link to='/klinik'>
                  <NavLink className="role-text ml-2">
                    Search Clinic
                  </NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link to='/login'>
                  <NavLink
                    clasName="btn btn-warning border-0 pr-3 pl-3 ml-2"
                    style={{ backgroundColor: "#FDCB5A", color: "#1A3150", borderRadius: "5px" }}
                  >
                    Login
                  </NavLink>
                </Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        {/* Navbar Ends */}
      </div>
      <div className="row">
        <div className="vh-100 d-flex align-items-center justify-content-center">
          <div className="dog col-lg-4 col-sm-12 col-md-6">
            <img src={anjing} alt="dog" className='dog-pict'></img>
            <img
              src="https://ik.imagekit.io/tk1apipynn/final-assets/Group_6_vqzZkWHlEfjD.svg"
              alt=""
              className="vet"
            ></img>
          </div>
          <div className="col-lg-8 col-md-12 col-sm-12">
            <div>
              <h2 className="font-role">Choose Your Role</h2>
              <p className="text-role">
                Register Yourself To Use Our Application
              </p>
            </div>
            <Row
              className="role justify-content-around align-items-center"
              style={{ textAlign: "center" }}
            >
              <Col lg="3" sm='12'>
                <button
                  value="clinic"
                  className="clinic-icon"
                  onClick={handleClinicClick}
                  style={{ backgroundColor: "#FFFFFF" }}
                >
                  <img
                    className="mt-4 mb-2 pict-role"
                    src={isAdmin == 'admin' ? "https://ik.imagekit.io/tk1apipynn/final-assets/clinic-bedawarna_Y_3Np9-ZlF5.svg" : "https://ik.imagekit.io/tk1apipynn/final-assets/clinic_7dDujoFpD-WS.svg"}
                    alt="clinic"
                  ></img>
                </button>
                <h2 className="mid-icon-text" id="text-clinic">Clinic</h2>
              </Col>
              <Col lg="3" sm='12'>
                <button
                  value="patient"
                  className="clinic-icon"
                  onClick={handlePatientClick}
                >
                  <img
                    className="mt-4 mb-2t pict-role2 "
                    src={isAdmin == 'user' ? "https://ik.imagekit.io/tk1apipynn/final-assets/patient-bedawarna_as5HKIjymi2.svg" : "https://ik.imagekit.io/tk1apipynn/final-assets/patient_Y9CFBHaEyugg.svg"}
                    alt="patient"
                  ></img>
                </button>
                <h2 className="mid-icon-text" id="text-patient">Patient</h2>
              </Col>
            </Row>
            <div className="next d-flex justify-content-center">
              {/* <Button className="btn btn-block-register" style={{ color: "#1A3150" }}> */}
              <Link to="/register/input" className="regist-btn btn btn-block-register">
                Next
              </Link>
              {/* </Button> */}
            </div>
            <h6 className="text-role-bawah" style={{ textAlign: "center" }}>
              Already have an account?Please
              <Link to="/login" className="signin">
                {" "}
                Sign in
              </Link>
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Role;
