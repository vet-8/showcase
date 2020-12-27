import React, { useState, useEffect } from "react";
import Header from "../layout/Header";
import "./UserHistory.css";
import { Container, Row, Col, Label, Form, FormGroup, Input, Button, Modal, ModalBody } from "reactstrap";
import EditUserRight from "../components/EditUserRight";
import BriefProfile from '../components/BriefProfile'
import Footer from "../layout/Footer";
import ModalPetInfo from '../pages/ModalPetInfo'
import closer from '../img/Vector (2).png'
import anjing from '../img/emojione_dog-face.png'
import kucing from '../img/fxemoji_cat.png'
import hamster from '../img/noto_hamster.png'
import kelinci from '../img/twemoji_rabbit-face.png'
import profile from './../img/user.svg'
import { NavLink, useHistory } from 'react-router-dom'
import Axios from 'axios'
import axios from 'axios'
import { connect } from 'react-redux'


const ForUserEdit = (props) => {
  const checklist = 'https://ik.imagekit.io/zvqf9loqe2/VET/Group_DcxThd9dOuTC.svg';
  const [modal, setModal] = useState(false);
  const [data, setData] = useState('')
  const [trigger, setTrigger] = useState(0)
  const [username, setUsername] = useState(data.username)
  const [gender, setGender] = useState(data.gender)
  const [phone, setPhone] = useState(data.phoneNumber)
  const [email, setEmail] = useState(data.email)
  const [fullname, setFullname] = useState(data.fullname)
  const [pets, setPets] = useState([])
  const [frequency, setFrequency] = useState('')
  const [prev, setPrev] = useState(null)
  const [pictureUrl, setPictureUrl] = useState(data.pictureUrl)
  const [userHistories, setUserHistories] = useState([])

  const toggle = () => setModal(!modal);

  const getDataUser = () => {
    Axios(`https://api.vetclinic.my.id/profile/${localStorage.getItem('id')}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        console.log(res.data[0])
        setData(res.data[0])
        localStorage.setItem('fullname', res.data[0].fullname)
        localStorage.setItem('gender', res.data[0].gender)
        localStorage.setItem('username', res.data[0].username)
        localStorage.setItem('phoneNumber', res.data[0].phoneNumber)
        localStorage.setItem('pictureUrl', res.data[0].pictureUrl)
      })
  }

  const getDataPet = () => {
    axios(`https://api.vetclinic.my.id/pet/${localStorage.getItem('id')}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        console.log(res.data)
        setPets(res.data)
      })
  }

  const getDataBooking = () => {
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
      });
  }

  useEffect(() => {
    getDataUser()
    getDataPet()
    getDataBooking()
  }, [trigger, props.doctor])


  const handleChangeProfile = () => {

    const bodyData = {
      username,
      fullname,
      gender,
      phoneNumber: phone,
      email,
      pictureUrl
    }

    Axios(`https://api.vetclinic.my.id/profile/u/?id=${localStorage.getItem('id')}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }, data: JSON.stringify(bodyData)
    })
      .then((res) => {
        getDataUser()
        setTrigger(trigger + 1)
        toggle()
      })
  }

  const onFormSubmit = (e) => {
    e.preventDefault();
    e.target.files[0] === undefined ? '' :
      setPrev(URL.createObjectURL(e.target.files[0]))

    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data'
      }
    };
    axios.post("https://api.vetclinic.my.id/file", formData, config)
      .then((res) => {
        console.log(res.data.fileName)
        setPictureUrl(res.data.fileName)
        console.log(pictureUrl)
      })
      .then(() => {
        console.log(pictureUrl)
        // handleChangeProfile()
      }
      )
      .catch((error) => {
        console.log(error)
      });

  }

  const handlerDelete = (e) => {
    console.log(e.target.id)
    const bodyData = {
      id: e.target.id
    }
    axios('https://api.vetclinic.my.id/pet', {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }, data: JSON.stringify(bodyData)
    })
      .then(res => {
        setTrigger(trigger + 1)
        console.log(res.data)
        res.data.name === 'SequelizeForeignKeyConstraintError' ? alert('You cannot remove a pet which has been registered to an appointment') : ''
      })
  }

  const history = useHistory()
  const handleLogout = () => {
    localStorage.clear()
    history.push('/')
  }

  return (
    <>
      <Header />
      <div className="dokter-background">
        <br /><br /><br /><br /><br />
        <Container fluid={true}>
          <Row>
            <Col sm="4" className="dokter-left-box ">
              <div className="leftSide text-center mx-5">
                <div>
                  {localStorage.getItem('pictureurl') ?
                    <img
                      src={data.pictureUrl === null ? profile : data.pictureUrl}
                      width="30%"
                      className="mt-4 clinic-profile-pic"
                    />
                    :
                    <img
                      src={"https://ik.imagekit.io/zvqf9loqe2/VET/Ellipse_10_tm2bFcdD2lB.svg"}
                      width="30%"
                      className="mt-4"
                    />
                  }

                  <div className="profile-name">
                    <h3>{localStorage.getItem('fullname')}</h3>
                    <div className="container">
                      <div className="statusDoc btn doctor-btn align-items-center">{`USER`}</div>
                    </div>
                  </div>
                </div>

                <Row className="profile1-comp mt-4">
                  <Col>
                    <img
                      src="https://ik.imagekit.io/zvqf9loqe2/VET/ic_round-pets_wx0wyUcOP-G.svg"
                      width="18%"
                    ></img>
                    <h5>{pets.length} Pets</h5>
                  </Col>
                  <Col>
                    <img
                      src="https://ik.imagekit.io/zvqf9loqe2/VET/Vector_gObBYmwCQpty.svg"
                      width="18%"
                    ></img>
                    <h5>{userHistories ? userHistories.length : ''} Times</h5>
                  </Col>
                </Row>

                <hr style={{ marginRight: "50px", marginLeft: "50px" }} />
                <NavLink
                  to={`/foruser/appointments`}
                  exact={true}
                  className="nav-link inactive-nav-edit-profile"
                  activeClassName="active-nav-edit-profile"
                >
                  Back to Appointments
                </NavLink>
                <br />
              </div>

              <div className="logout mx-5 mb-5" onClick={handleLogout} >
                <Row className="logout-comp logout-profile" style={{ position: 'relative', right: '49px' }}>
                  <img
                    src="https://ik.imagekit.io/zvqf9loqe2/VET/clarity_logout-line_6JOgslcDRtq.svg"
                    className="ml-5"
                  />
                  <div className="text">
                    <h5>{`Logout`}</h5>
                  </div>
                </Row>
              </div>
            </Col>
            <Col sm="8">
              <div className="dokter-right-box">
                <div className="rightSide">
                  <Form>
                    <div className="rightSide">
                      <Form>
                        <div>
                          <h3 className="form">Upload Photo</h3>
                          <hr />
                          <div className="rcorners">
                            <div className="upload">
                              <form onSubmit={e => onFormSubmit(e)}>
                                <div className="form-group preview">
                                  {prev ? <img src={prev} alt="prev" /> : ''}

                                </div>
                                <div className="image-button">
                                  <label htmlFor="change-photo">
                                    <img src="https://ik.imagekit.io/zvqf9loqe2/VET/Vector__1__wVzNtBzycat.svg" alt="plusbutton" />
                                  </label>
                                  <input id='change-photo' type="file" name="myImage" onChange={onFormSubmit} />
                                  <button type="submit">Upload</button>
                                </div>


                              </form>
                            </div>
                            <div className="upload-text">
                              <h5 style={{ color: '#818181' }}>Upload Image</h5>
                            </div>
                            <label htmlFor="update-photo">
                              {prev ?
                                <div className="update-photo">
                                  <h5>Change Photo</h5>
                                  <input id='update-photo' type="file" name="update-photo" onChange={onFormSubmit} />
                                </div> : ''
                              }
                            </label>                          </div>
                          <br />

                          <h3 style={{ marginTop: '40px' }} className="form">
                            Basic Information
              </h3>
                          <hr />
                          <Label className="form">Fullname</Label>
                          <br />
                          <div className="form1">
                            <Input
                              className="input"
                              type="text"
                              placeholder="Your fullname"
                              defaultValue={data.fullname}
                              onChange={e => setFullname(e.target.value)}
                            />
                          </div> <br />
                          <Label className="form">Username</Label>
                          <br />
                          <div className="form1">
                            <Input
                              className="input"
                              type="text"
                              placeholder="Alexandria"
                              defaultValue={data.username}
                              onChange={e => setUsername(e.target.value)}
                            />
                          </div>

                          <br />
                          <Label className="form">Gender</Label>
                          <br />
                          <Row className="gender-user">
                            <FormGroup check>
                              {data.gender === 'male' ?
                                <div>
                                  <label
                                    style={{ marginLeft: '-34px', marginRight: '80px' }}
                                    check>
                                    <Input type="radio" name="radio1" checked value='male' onClick={e => setGender(e.target.value)} />Male</label>

                                  <label check>
                                    <Input type="radio" name="radio1" value='female' onClick={e => setGender(e.target.value)} />Female</label>
                                </div> :
                                data.gender === 'female' ?
                                  <div>
                                    <label
                                      style={{ marginLeft: '-34px', marginRight: '80px' }}
                                      check>
                                      <Input type="radio" name="radio1" value='male' onClick={e => setGender(e.target.value)} />Male</label>

                                    <label check>
                                      <Input type="radio" name="radio1" checked value='female' onClick={e => setGender(e.target.value)} />Female</label>
                                  </div> :
                                  <div>
                                    <label
                                      style={{ marginLeft: '-34px', marginRight: '80px' }}
                                      check >
                                      <Input type="radio" name="radio1" value='male' onClick={e => setGender(e.target.value)} />Male</label>

                                    <label check>
                                      <Input type="radio" name="radio1" value='female' onClick={e => setGender(e.target.value)} />Female</label>
                                  </div>
                              }
                            </FormGroup>
                          </Row>

                          <br />
                          <br />
                          <h3 className="form">Contact Details</h3>
                          <hr />
                          <Label className="form">Phone Number</Label>
                          <br />
                          <div className="form1">
                            <Input
                              className="input"
                              type="telephone"
                              placeholder="+712371723 18231823"
                              defaultValue={data.phoneNumber}
                              onChange={e => setPhone(e.target.value)}
                            />
                          </div>

                          <br />
                          <Label className="form">Email</Label>
                          <br />
                          <div className="form1">
                            <Input
                              className="input"
                              type="email"
                              placeholder="alexanda@gmail.com"
                              defaultValue={data.email}
                              onChange={e => setEmail(e.target.value)}
                            />
                          </div>

                          <br />
                          <br />

                          <div className="profil info-hewan">
                            <h3>Your Pets</h3>

                            <div className="d-flex">
                              <div className="pet-add">
                                <div className="modal-pet">
                                  <ModalPetInfo />
                                  <br />
                                </div>
                                <p>Add Pet</p>
                              </div>
                              <div className="row">
                                {pets ? pets.map(pet =>
                                  <div className="pet-add col-3">
                                    <div>
                                      <img id={pet.id} onClick={(e) => handlerDelete(e, "id")} className="close" src={closer} alt="close" />
                                      <img className="pesewet" src={pet.petSpecyId === '648928bb-3b8a-11eb-a4ce-06058d744160' ? anjing : pet.petSpecyId === '64895775-3b8a-11eb-a4ce-06058d744160' ? kucing : pet.petSpecyId === '648958b7-3b8a-11eb-a4ce-06058d744160' ? kelinci : hamster} alt="" />
                                    </div>
                                    <p>
                                      {pet.name.length > 6 ? `${pet.name.slice(0, 6)}...` : pet.name} / {pet.gender}
                                    </p>
                                  </div>
                                ) : ''}
                              </div>
                            </div>

                          </div>              <br />
                        </div>
                      </Form>
                    </div>
                  </Form>



                  <div>
                    <Button
                      className="tombol-simpan"
                      type="simpan"
                      color="warning"
                      onClick={handleChangeProfile}>
                      Save
        </Button>
                    <Modal
                      isOpen={modal}
                      toggle={toggle}
                      style={{ marginTop: '150px', borderRadius: '25px' }}>
                      <ModalBody
                        style={{
                          backgroundColor: '#1A3150',
                          paddingTop: '3rem',
                          paddingBottom: '3rem',
                          borderRadius: '2px',
                        }}>
                        <div className="col ">
                          <div className="row d-flex justify-content-center">
                            <img src={checklist} />
                          </div>

                          <br />
                          <div className="row d-flex justify-content-center">
                            <h1 style={{ color: 'white' }}>Update Succeeded</h1>
                          </div>
                        </div>
                      </ModalBody>
                    </Modal>
                  </div>

                  <br />
                  <br />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <br /><br /><br /><br /><br />
        <Footer />
      </div>
    </>
  );
};

const stateProps = (globalState) => {
  return {
    doctor: globalState.doctor
  }
}

const dispatchProps = (dispatch) => {
  return {
    addPet: () => dispatch({ type: "ADD_DOCTOR" })
  }
}

export default connect(stateProps, dispatchProps)(ForUserEdit);
