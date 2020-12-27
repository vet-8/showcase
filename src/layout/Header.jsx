import React, { useState } from "react";
import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import logo from "./header-logo.svg";
import "./Header.css";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { checkLogin } from "../Helper";
import { Link, useHistory } from "react-router-dom";

const Header = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();

  // const toggleIsOpen = () => setIsOpen(!isOpen);

  const toggle = () => {
    setDropdownOpen((prevState) => !prevState);
    setIsOpen(!isOpen);
  };

  const handleUserClick = () => {
    localStorage.getItem('role') === 'admin' ? history.push('/managedoctor') :
      localStorage.getItem('role') === 'doctor' ? history.push('/dokter') :
        history.push("/foruser/appointments");
  };

  const handleUserEdit = () => {

    history.push("/userhistory");
  };

  const handleLogout = () => {
    localStorage.clear();
    history.push("/");
  };

  console.log(localStorage.getItem("phoneNumber"));

  const checkUser = () => {
    if (!checkLogin()) {
      return (
        <>
          <Link to="/register" className="text-white btn">
            <h5 className="mb-0 ml-3" style={{ fontWeight: "bold" }}>
              Register
            </h5>
          </Link>

          <Link
            to="/login"
            className="nav-link btn btn-warning ml-2"
            style={{ borderRadius: "20px" }}
          >
            LOGIN
          </Link>
        </>
      );
    } else {
      return (
        <>
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle nav caret className="text-white">
              <h5 style={{ display: "inline" }}>
                <AccountCircleIcon className="mr-2" />
                Hi, {localStorage.getItem("username")}
              </h5>
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem onClick={handleUserClick}>
                {localStorage.getItem("fullname")}
              </DropdownItem>
              <DropdownItem
                style={{ color: "rgba(0,0,0,0.5)" }}
                onClick={handleUserEdit}
              >
                {localStorage.getItem("phoneNumber") !== "null"
                  ? localStorage.getItem("phoneNumber")
                  : "no.HP kosong"}
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={handleLogout}>
                <ExitToAppIcon />
                Logout
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </>
      );
    }
  };

  return (
    <>
      <Container fluid={true} className="fixed-top header-background ">
        <Navbar dark expand="md">
          <NavbarBrand >
            <Link
              to="/"
              className="text-white"
              style={{ textDecoration: "none" }}>
              <img src={logo} alt="" />
              <span className="logo-text ml-4">VET</span>
            </Link>
          </NavbarBrand>
          <NavbarToggler onClick={toggle} className="text-white" />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link
                  to="/chat-dashboard"
                  className="text-white"
                  style={{ textDecoration: "none" }}
                >
                  <h5 className="mb-0 ml-3">Chat Clinics</h5>
                </Link>
              </NavItem>
              <NavItem>
                <Link
                  to="/dokter/"
                  className="text-white"
                  style={{ textDecoration: "none" }}
                >
                  <h5 className="mb-0 ml-3">For Doctors</h5>
                </Link>
              </NavItem>
              <NavItem>
                <Link
                  to="/klinik/"
                  className="text-white"
                  style={{ textDecoration: "none" }}
                >
                  <h5 className="mb-0 ml-3">Find Clinics</h5>
                </Link>
              </NavItem>
            </Nav>
            {checkUser()}
          </Collapse>
        </Navbar>
      </Container>
    </>
  );
};

export default Header;
