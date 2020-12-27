import React, { useState } from 'react';
import {
    Card,
    CardBody,
    Input,
    FormGroup,
    Button,
    Form,
    Nav,
    NavLink,
    Navbar,
    NavItem,
    Collapse,
    NavbarToggler
} from 'reactstrap';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import './Register.css'
import anjing from './../image-dog/ANJING.png'
import firebase from 'firebase'


const Register = () => {
    let history = useHistory();

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const [fullName, setFullName] = useState();
    const [userName, setUserName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [isWrongRegister, setIsWrongRegister] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword(showPassword ? false : true);
    }

    const handleRegister = (e) => {
        e.preventDefault();
        setIsLoading(true)
        let url = 'https://api.vetclinic.my.id/auth/register'
        const data = {
            fullname: fullName,
            username: userName,
            email: email,
            password: password,
            role: localStorage.getItem('role'),
        };

        if (localStorage.getItem('role') === 'admin') {
            url = 'https://api.vetclinic.my.id/auth/admin/register'
        } else if (localStorage.getItem('role') === 'user') {
            url = 'https://api.vetclinic.my.id/auth/register'
        }



        axios.post(url, data)
            .then((ress) => {
                if (localStorage.getItem('role') === 'user') {
                    localStorage.setItem('id', ress.data.id)
                    localStorage.setItem('username', ress.data.username)
                    localStorage.setItem('fullname', ress.data.fullname)
                    localStorage.setItem('email', ress.data.email)
                    localStorage.setItem('password', ress.data.password)
                    localStorage.setItem('phoneNumber', ress.data.phoneNumber)
                    localStorage.setItem('gender', ress.data.gender)
                    localStorage.setItem('pictureurl', ress.data.pictureUrl)
                    localStorage.setItem('role', ress.data.role)
                    localStorage.setItem('clinicid', ress.data.clinicId)
                    localStorage.setItem('token', ress.data.token)
                    history.push('/')
                } else if (localStorage.getItem('role') === 'admin') {
                    localStorage.setItem('id', ress.data.userAdmins.id)
                    localStorage.setItem('username', ress.data.user.username)
                    localStorage.setItem('fullname', ress.data.user.fullname)
                    localStorage.setItem('email', ress.data.user.email)
                    localStorage.setItem('password', ress.data.user.password)
                    localStorage.setItem('phoneNumber', ress.data.user.phoneNumber)
                    localStorage.setItem('gender', ress.data.user.gender)
                    localStorage.setItem('pictureurl', ress.data.user.pictureUrl)
                    localStorage.setItem('role', ress.data.user.role)
                    localStorage.setItem('clinicid', ress.data.user.clinicId)
                    localStorage.setItem('token', ress.data.user.token)
                    history.push('/forclinic/edit-profile')
                } else {
                    history.push('/forclinic/edit-profile')
                }
                firebase
                    .auth()
                    .createUserWithEmailAndPassword(email, password)
                    .then(authRes => {
                        const userObj = {
                            email: authRes.user.email,
                            fullname: fullName,
                            friends: [],
                            messages: [],
                            role: localStorage.getItem('role')
                        };

                        firebase
                            .firestore()
                            .collection('users')
                            .doc(email)
                            .set(userObj)
                            .then(() => {
                            }, dbErr => {
                                console.log('Failed to add user to the database: ', dbErr);
                            });
                    }, authErr => {
                        console.log('Failed to create user: ', authErr);
                    });
            })
            .catch(
                () => { 
                    setIsLoading(false)
                    setIsWrongRegister(true) }
            )
    };

    return (
        <div>
            <div className="regist-header">
                <Navbar light expand="md" className="pt-0">
                    <NavbarToggler onClick={toggle} className="ml-auto" />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="ml-auto font-weight-bold" navbar>
                            <NavItem>
                                <Link to='/'>
                                    <NavLink className="regist-text ml-2">
                                        Home
                                    </NavLink>
                                </Link>
                            </NavItem>
                            <NavItem>
                                <Link to='/dokter'>
                                    <NavLink className="regist-text ml-2">
                                        Doctor
                                    </NavLink>
                                </Link>
                            </NavItem>
                            <NavItem>
                                <Link to='/klinik'>
                                    <NavLink className="regist-tex ml-2">
                                        Search Clinic
                                    </NavLink>
                                </Link>
                            </NavItem>
                            <NavItem>
                                <Link to='/login'>
                                    <NavLink
                                        className="btn btn-warning border-0 pr-3 pl-3 ml-2"
                                        style={{ backgroundColor: "#FDCB5A", color: "#1A3150" }}>
                                        Login
                                    </NavLink>
                                </Link>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
            <div className="vh-100 d-flex align-items-center justify-content-center">
                <div className="dog">
                    <img src={anjing}
                        alt="dog-icon"
                        style={{ width: '90%' }}
                        className='dog-login'>
                    </img>
                    <img src='https://ik.imagekit.io/tk1apipynn/final-assets/Group_6_vqzZkWHlEfjD.svg'
                        alt=''
                        className="vet"></img>
                </div>
                <Card className="box-regist" style={{ width: '50%', borderColor: "#FFFFFF" }}>
                    <div className='register-formulir'>
                        <h2>Make a New Account</h2>
                        <h6 className="text-regist">Register Yourself To Use Our Application</h6>
                        <Form onSubmit={handleRegister}>
                            <FormGroup>
                                <Input
                                    className="kolom-regist"
                                    type="text"
                                    name="fullname"
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder="Full Name"
                                />
                                <img
                                    src="https://ik.imagekit.io/tk1apipynn/final-assets/username_BBdsAt8mIxd.svg"
                                    alt=""
                                    className="reg-icon"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Input
                                    className="kolom-regist"
                                    type="text"
                                    name="username"
                                    onChange={(e) => setUserName(e.target.value)}
                                    placeholder="User Name"
                                />
                                <img
                                    src="https://ik.imagekit.io/tk1apipynn/final-assets/username_BBdsAt8mIxd.svg"
                                    alt=""
                                    className="reg-icon"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Input
                                    className="kolom-regist"
                                    type="email"
                                    name="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email"
                                />
                                <img
                                    src="https://ik.imagekit.io/tk1apipynn/final-assets/Vector_email_PR13Z2PVg3ku.svg"
                                    alt=""
                                    className="reg-icon"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Input
                                    className="kolom-regist"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                />
                                <img
                                    src="https://ik.imagekit.io/tk1apipynn/final-assets/Vector_password_zGv3zGC5kVG.svg"
                                    alt=""
                                    className="reg-icon"
                                />
                                <img
                                    onClick={togglePasswordVisibility}
                                    src={showPassword === false ? "https://ik.imagekit.io/tk1apipynn/final-assets/password_iV1kjFGTvtiP.svg" : "https://ik.imagekit.io/tk1apipynn/final-assets/show-password_4jRzaKtqG.svg"}
                                    alt=""
                                    className="pw-icon"
                                />
                            </FormGroup>
                            {isWrongRegister === true ? <h6 className="error-regist">The username is does exist, please use another one.</h6> : ''}
                            {isLoading === true ?
                                <div style={{ marginTop: '-200px' }}>
                                    <div class="spinner">
                                        <div class="bounce1"></div>
                                        <div class="bounce2"></div>
                                        <div class="bounce3"></div>
                                    </div>
                                </div> :
                                <Button className="btn btn-block-register">Register</Button>
                            }
                            
                            <h6 className="text-regist-bawah">Already have an account? Please
                            <Link to="/login" className="signin"> Sign In</Link>
                            </h6>
                        </Form>
                    </div>
                </Card>

            </div>
        </div>
    )

}

export default Register;
