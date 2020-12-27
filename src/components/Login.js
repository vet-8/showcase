import React, { useState } from "react";
import {
  Card,
  CardBody,
  Input,
  FormGroup,
  Button,
  Form,
  Navbar,
  Nav,
  NavItem,
  NavLink,
  Collapse,
  NavbarToggler,
} from "reactstrap";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { checkLogin } from "../Helper";
import "../components/Login.css";
import anjing from "./../image-dog/ANJING.png";
import firebase from 'firebase'

const Login = () => {
  let history = useHistory();

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isWrongLogin, setIsWrongLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(showPassword ? false : true);
  };

  const handleLogin = async (e) => {
    setIsLoading(true)
    e.preventDefault();

    await firebase
      .auth()
      .signInWithEmailAndPassword(username, password)
      .then(() => {

        const url = "https://api.vetclinic.my.id/auth/login";
        const data = {
          credential: username,
          password: password,
        };
        axios
          .post(url, data)
          .then((ress) => {
            localStorage.setItem("id", ress.data.id);
            localStorage.setItem("username", ress.data.username);
            localStorage.setItem("fullname", ress.data.fullname);
            localStorage.setItem("email", ress.data.email);
            localStorage.setItem("password", ress.data.password);
            localStorage.setItem("phoneNumber", ress.data.phoneNumber);
            localStorage.setItem("gender", ress.data.gender);
            localStorage.setItem("pictureurl", ress.data.pictureUrl);
            localStorage.setItem("role", ress.data.role);
            localStorage.setItem("clinicid", ress.data.clinicId);
            localStorage.setItem("token", ress.data.token);


            console.log(ress.data);
            history.push("/");


          })
      }, err => {
        setIsLoading(false)
        console.log('Error logging in: ', err);
      })

      .catch(() => {
        setIsLoading(false)
        setIsWrongLogin(true);
      });
  };

  const handleLogout = () => {
    Cookies.remove("token");
    history.push("/");
  };

  const renderBtn = () => {
    // if (!checkLogin()) {
    return (
      <div>
        <div className="login-header">
          <Navbar light expand="md" className="pt-0">
            <NavbarToggler onClick={toggle} className="ml-auto" />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="ml-auto font-weight-bold" navbar>
                <NavItem>
                  <Link to='/'>
                    <NavLink className="login-text ml-2">
                      Home
                    </NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link to='/dokter'>
                    <NavLink className="login-text ml-2">
                      Doctor
                    </NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link to='/klinik'>
                    <NavLink className="login-tex ml-2">
                      Search Clinic
                    </NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link to='/register'>
                    <NavLink
                      href="/register"
                      className="btn btn-warning border-0 pr-3 pl-3 ml-2"
                    >
                      Registration
                    </NavLink>
                  </Link>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
        <div className="vh-100 d-flex align-items-center justify-content-center">
          <div className="dog">
            <img className='dog-login' src={anjing} alt="dog-icon" width="88%"></img>
            <img
              src="https://ik.imagekit.io/tk1apipynn/final-assets/Group_6_vqzZkWHlEfjD.svg"
              alt=""
              className="vet"
            ></img>
          </div>

          <Card
            className="box-login"
            style={{ width: "50%", borderColor: "#FFFFFF" }}
          >
            <div className='register-formulir'>
              <h2 className='login-title'>Welcome Back</h2>
              <h6 className="text-regist-login">Login Here to Start Your Journey</h6>

              <Form onSubmit={handleLogin}>
                <FormGroup className="form form-register">
                  <Input
                    style={{ position: 'relative', left: '-6px', marginBottom:'10px' }}
                    className="kolom-regist"
                    type="email"
                    name="username"
                    background-color="#FFFFFF"
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Email"
                    
                  />
                  <img
                    src="https://ik.imagekit.io/tk1apipynn/final-assets/Vector_email_PR13Z2PVg3ku.svg"
                    alt=""
                    className="username"
                    style={{position:'relative', top: '-53px'}}
                  />
                </FormGroup>
                <FormGroup className="form form-register">
                  <Input
                    style={{ position: 'relative', left: '-6px' }}
                    className="kolom-regist"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    background-color="#FFFFFF"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />
                  <img
                    src="https://ik.imagekit.io/tk1apipynn/final-assets/Vector_password_zGv3zGC5kVG.svg"
                    alt=""
                    className="username"
                  />
                  <img
                    onClick={togglePasswordVisibility}
                    src={
                      showPassword === false
                        ? "https://ik.imagekit.io/tk1apipynn/final-assets/password_iV1kjFGTvtiP.svg"
                        : "https://ik.imagekit.io/tk1apipynn/final-assets/show-password_4jRzaKtqG.svg"
                    }
                    alt=""
                    className="pw-icon-login"
                  />
                </FormGroup>
                {isWrongLogin === true ? (
                  <h6 className="error-text">
                    Your username or password is wrong, please try again...
                  </h6>
                ) : (
                    ""
                  )}
                {isLoading === true ?
                  <div style={{ marginTop: '-200px', marginLeft:'-600px' }}>
                    <div class="spinner">
                      <div class="bounce1"></div>
                      <div class="bounce2"></div>
                      <div class="bounce3"></div>
                    </div>
                  </div> :
                  <Button className="btn btn-block-register" background-color="#FDCB5A">Login</Button>
                }

                <h6 className="text-regist-bawah">
                  Don't have an account? Please
                    <Link to="/register" className="signup">
                    {" "}
                      Sign Up
                    </Link>
                </h6>
              </Form>
            </div>


          </Card>
        </div>
      </div>
    );
    // } else {
    //   return (
    //     <button className="btn btn-block" onClick={handleLogout}>
    //       LOGOUT
    //     </button>
    //   );
    // }
  };
  return <>{renderBtn()}</>;
};

export default Login;
