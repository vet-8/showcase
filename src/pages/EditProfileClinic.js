import React, { useState, useEffect } from 'react';
import Header from '../layout/Header';
import { Switch, Route, NavLink, useRouteMatch, useHistory } from 'react-router-dom';
import './ManageDoctor.css';
import { Container, Row, Col, Label, Form, FormGroup, Input, Button, Modal, ModalBody } from 'reactstrap';
import AppointmentClinic from '../components/AppointmentClinic';
import ManageDoc from '../components/ManageDoc';
import EditClinicRight from '../components/EditClinicRight';
import Axios from 'axios';
import axios from "axios";
import offline from '../img/Group.png'
import Footer from '../layout/Footer';
import profile from './../img/image 4.png'

const ManageDoctor = () => {
  let { path, url } = useRouteMatch();
  const history = useHistory()
  const [editProfile, setEditProfile] = useState(false);

  const handleEditProfile = () => {
    setEditProfile(true);
  };
  const checklist =
    'https://ik.imagekit.io/zvqf9loqe2/VET/Group_DcxThd9dOuTC.svg';
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [isLoading, setIsLoading] = useState(false);
  const [clinicProfile, setClinicProfile] = useState('');
  const [clinicDetail, setClinicDetail] = useState('')
  const [about, setAbout] = useState(clinicDetail.about)
  const [openTime, setOpenTime] = useState(clinicDetail.startTime)
  const [endTime, setEndTime] = useState(clinicDetail.endTime)
  const [clinicName, setClinicName] = useState(clinicProfile.fullname)
  const [facilities, setFacilities] = useState([])
  const [pets, setPets] = useState([])
  const [phone, setPhone] = useState(clinicProfile.phoneNumber)
  const [email, setEmail] = useState(clinicProfile.email)
  const [address, setAddress] = useState(clinicDetail.address)
  const [city, setCity] = useState(clinicDetail.city)
  const [anjing, setAnjing] = useState(false)
  const [kucing, setKucing] = useState(false)
  const [kelinci, setKelinci] = useState(false)
  const [reptil, setReptil] = useState(false)
  const [facilitiesInput, setFacilitiesInput] = useState([])
  const [trigger, setTrigger] = useState(0)
  const [prev, setPrev] = useState(null)
  const [file, setFile] = useState(null)
  const [pictureUrl, setPictureUrl] = useState(clinicDetail.pictureUrl)
  const [isOpen, setIsOpen] = useState(clinicDetail.isOpen)



  const getDataClinicDetail = () => {
    Axios(`https://api.vetclinic.my.id/admin/clinic/${localStorage.getItem('clinicid')}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then((res) => {
      console.log(res.data[0])
      setClinicDetail(res.data[0]);
      setIsLoading(false);
    });
  }

  const getDataClinicProfile = () => {
    Axios(`https://api.vetclinic.my.id/admin/profile/${localStorage.getItem('id')}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then((res) => {
      console.log(res.data[0])
      setClinicProfile(res.data[0]);
      setIsLoading(false);
    });
  }

  const patchClinicDetail = () => {
    const bodyData = {
      // name: clinicName,
      address,
      city,
      // phoneNumber: phone,
      about,
      endTime,
      startTime: openTime,
      // email,
      pictureUrl: pictureUrl,
      isOpen
    };
    console.log(bodyData)
    Axios(`https://api.vetclinic.my.id/admin/clinic?id=${localStorage.getItem('clinicid')}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }, data: JSON.stringify(bodyData)
    })
      .then(() => {
        setTrigger(trigger + 1)
        toggle()
      })
  }

  const patchClinicProfile = () => {
    const bodyData = {
      fullname: clinicName,
      phoneNumber: phone,
      email,
    };
    console.log(bodyData)
    Axios(`https://api.vetclinic.my.id/admin/profile/u`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }, data: JSON.stringify(bodyData)
    })
      .then(() => {
        setTrigger(trigger + 1)
        toggle()
      })
  }

  useEffect(() => {
    setIsLoading(true);
    getDataClinicProfile()
    getDataClinicDetail()
  }, [trigger]);

  const handlerAnjing = () => {
    setAnjing(!anjing)
    anjing == true ? pets.splice(pets.findIndex(wanted => wanted === 'anjing'), 1) : pets.push('anjing')
    console.log(pets)
  }

  const handlerKucing = () => {
    setKucing(!kucing)
    kucing == true ? pets.splice(pets.findIndex(wanted => wanted === 'kucing'), 1) : pets.push('kucing')
    console.log(pets)
  }

  const handlerKelinci = () => {
    setKelinci(!kelinci)
    kelinci == true ? pets.splice(pets.findIndex(wanted => wanted === 'kelinci'), 1) : pets.push('kelinci')
    console.log(pets)
  }

  const handlerReptil = () => {
    setReptil(!reptil)
    reptil == true ? pets.splice(pets.findIndex(wanted => wanted === 'reptil'), 1) : pets.push('reptil')
    console.log(pets)
  }

  const handleSubmitFacilities = (e) => {
    e.preventDefault()
    facilities.push(facilitiesInput)
    setTrigger(trigger + 1)
    console.log('add clicked')
    console.log(facilities)
  }

  const removeFacility = (e) => {
    console.log(e.target.id)
    facilities.splice(facilities.indexOf(e.target.id), 1)
    setTrigger(trigger + 1)
    console.log('removed')
    console.log(pets)
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

  const handleChangeProfile = () => {
    patchClinicDetail()
    patchClinicProfile()
  }

  const handleLogout = () => {
    localStorage.clear()
    history.push('/')
  }


  //ada komponen book from patient default
  //ada komponen approval clicked

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
            <Col sm="4" className="dokter-left-box ">
              <div class="leftSide text-center mx-5">
                <div>
                  <img
                    src={clinicDetail.pictureUrl ? clinicDetail.pictureUrl : profile}
                    width="30%"
                    className="clinic-profile-pic"
                  />
                  <div className="profile-name">
                    <h3>{clinicProfile.fullname}</h3>
                    <div className="container">
                      <div className="btn clinic-btn align-items-center">{`CLINIC`}</div>
                    </div>
                  </div>
                </div>

                <Row className="profile1-comp mt-4">
                  <Col>
                    {clinicDetail.isOpen ?
                      <div>
                        <img
                          src="https://ik.imagekit.io/zvqf9loqe2/VET/Vector__2___vbNttX3HpvA.svg"
                          width="18%"></img>
                        <h5 style={{ color: 'green' }}>Online</h5>
                      </div> :
                      <div>
                        <img
                          src={offline}
                          width="18%"></img>
                        <h5 style={{ color: 'grey' }}>Offline</h5>
                      </div>
                    }

                  </Col>
                  <Col>
                    <img
                      src="https://ik.imagekit.io/zvqf9loqe2/VET/Vector__4__K80mNf7TiTVb.svg"
                      width="18%"></img>
                    <h5>{clinicDetail.startTime}-{clinicDetail.endTime}</h5>
                  </Col>
                </Row>

                <hr style={{ marginRight: '50px', marginLeft: '50px' }} />
                <div
                  onClick={() => history.push('/managedoctor')}
                  className="nav-link inactive-nav-edit-profile">
                  Back to Appointments
                </div>
                <br />
              </div>

              <div className="logout mx-5 mb-5" onClick={handleLogout}>
                <Row className="logout-comp">
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
                <div>

                  {isLoading ?
                    <div>
                      <div className="spinner" >
                        <div className="bounce1"></div>
                        <div className="bounce2"></div>
                        <div className="bounce3"></div>
                      </div>
                    </div> :
                    <div>
                      <div className="rightSide">
                        <Form>
                          <div>
                            <h3 className="form">Upload Photo</h3>

                            <hr />
                            <br />
                            <div className="row d-flex p-4" style={{ paddingRight: '100px' }}>
                              <div className="col">
                                <div className="rcorners">
                                  <div className="upload">
                                    {/* Ini dari upload foto */}
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
                                  {/* Ini akhir dari upload foto */}
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

                                  </label>

                                </div>
                              </div>

                            </div>
                            <br /><br />
                            <h3 className="form">Clinic Information</h3>
                            <hr />
                            <Label className="form">Status</Label>
                            <br />
                            <Row className="gender-user">
                              {clinicDetail.isOpen === true ? (
                                <FormGroup check>
                                  <Label
                                    style={{ marginLeft: '-34px', marginRight: '80px' }}
                                    check>
                                    <Input type="radio" name="radio1" checked onClick={e => setIsOpen(true)} />Online</Label>
                                  <Label check>
                                    <Input type="radio" name="radio1" onClick={e => setIsOpen(false)} /> Offline </Label>
                                </FormGroup>
                              ) : (
                                  <FormGroup check>
                                    <Label
                                      style={{ marginLeft: '-34px', marginRight: '80px' }}
                                      check>
                                      <Input type="radio" name="radio1" onClick={e => setIsOpen(true)} /> Online </Label>
                                    <Label check>
                                      <Input type="radio" name="radio1" checked onClick={() => setIsOpen(false)} />Offline</Label>
                                  </FormGroup>
                                )}
                            </Row>

                            <br />
                            <br />

                            <Row>
                              <div className="d-flex">
                                <FormGroup className="form" style={{ marginLeft: '5px' }}>
                                  <Label for="exampleSelect">Open At</Label>
                                  <Input
                                    style={{ width: '200px' }}
                                    type="select"
                                    name="select"
                                    id="exampleSelect"
                                    onChange={e => setOpenTime(e.target.value)}>
                                    <option>{clinicDetail.startTime ? clinicDetail.startTime : 'Choose Below'}</option>
                                    <option value='08.00'>08.00</option>
                                    <option value='09.00'>09.00</option>
                                    <option value='10.00'>10.00</option>
                                    <option value='11.00'>11.00</option>
                                    <option value='12.00'>12.00</option>
                                    <option value='13.00'>13.00</option>
                                    <option value='14.00'>14.00</option>
                                    <option value='15.00'>15.00</option>
                                  </Input>
                                </FormGroup>

                                <FormGroup className="form">
                                  <Label for="exampleSelect">Closed At</Label>
                                  <Input
                                    style={{ width: '200px' }}
                                    type="select"
                                    name="select"
                                    id="exampleSelect"
                                    onChange={e => setEndTime(e.target.value)}>
                                    <option>{clinicDetail.endTime ? clinicDetail.endTime : 'Choose Below'}</option>
                                    <option value='11.00'>11.00</option>
                                    <option value='12.00'>12.00</option>
                                    <option value='13.00'>13.00</option>
                                    <option value='14.00'>14.00</option>
                                    <option value='15.00'>15.00</option>
                                    <option value='16.00'>16.00</option>
                                    <option value='17.00'>17.00</option>
                                    <option value='18.00'>18.00</option>
                                    <option value='19.00'>19.00</option>
                                    <option value='20.00'>20.00</option>
                                    <option value='21.00'>21.00</option>
                                  </Input>
                                </FormGroup>
                              </div>
                            </Row>

                            <br />
                            <br />
                            <h3 className="form">Basic Information</h3>
                            <hr />

                            <Label className="form">Clinic Name</Label>
                            <br />
                            <div className="form1">
                              <Input
                                className="input"
                                type="text"
                                placeholder="Enter your clinic name"
                                defaultValue={clinicProfile.fullname}
                                onChange={e => setClinicName(e.target.value)}></Input>
                            </div>
                            <div className="col" style={{ paddingRight: '120px' }}>
                              <Label className="form" style={{ marginTop: '27px', marginLeft: '-14px' }}>About</Label>
                              <Input type='textarea' onChange={e => setAbout(e.target.value)} defaultValue={clinicDetail.about} placeholder='enter your clinic about' style={{ minHeight: '150px', marginLeft: '33px', width: '600px' }} />
                            </div>
                            <br />
                            {/* <Label className="form">
              <h3>Facilities</h3></Label>
            <div>
              {clinics.facilities ? clinics.facilities.map(clinic => {
                <div>
                  <h4>{clinic.facilities}</h4>

                </div>
              }) : ''}

              {facilities !== [] ?
                facilities.map(facility =>
                  <div className='d-flex align-items-center justify-content-between facilities-profile'>
                    <div className="d-flex align-items-center">
                      <img src={gambar} alt="close" />
                      <p>{facility}</p>
                    </div>
                    <img className='hapuser' src={hapus} alt='hapus' id={facility} onClick={e => removeFacility(e, 'id')} />
                  </div>
                ) :
                clinics.facilities ? clinics.facilities.map(facility => {
                  <h3>{facility}</h3>
                }) :
                 ''
              }
              <FormGroup className='d-flex'>
                <form onSubmit={e => handleSubmitFacilities(e)}>
                  <Input className='input' type='text' placeholder='Input facility' onChange={e => setFacilitiesInput(e.target.value)}></Input>
                  <button onClick={e => handleSubmitFacilities(e)} type='submit'>Add Facility</button>
                </form>
              </FormGroup>
              {facilities.map(facility => {
                <div>
                  <h3>{facility}</h3>
                  <img src={gambar} alt="delete" />
                </div>

              })
              }
            </div> */}

                            <br />
                            {/* <Label className="form">Pets</Label>

                        <div className="form">
                          <FormGroup check>
                            <Label check>
                              <input
                                type="checkbox"
                                onChange={handlerAnjing}
                                checked={anjing ? true : null}
                                value='anjing'
                              // checked={clinics && clinics.pasien.includes('anjing')}
                              />{' '}
                  Anjing
                </Label>
                          </FormGroup>

                          <FormGroup check>
                            <Label check>
                              <Input
                                type="checkbox"
                                onChange={handlerKucing}
                                checked={kucing ? true : null}
                                value='kucing'
                              // checked={clinics && clinics.pasien.includes('kucing')}
                              />{' '}
                  Kucing
                </Label>
                          </FormGroup>

                          <FormGroup check>
                            <Label check>
                              <Input
                                type="checkbox"
                                onChange={handlerKelinci}
                                checked={kelinci ? true : null}
                                value='kelinci'
                              // checked={clinics && clinics.pasien.includes('kelinci')}
                              />{' '}
                  Kelinci
                </Label>
                          </FormGroup>

                          <FormGroup check>
                            <Label check>
                              <Input
                                type="checkbox"
                                onChange={handlerReptil}
                                checked={reptil ? true : null}
                                value='reptil'
                              // checked={clinics && clinics.pasien.includes('Reptil')}
                              />{' '}
                  Reptil
                </Label>
                          </FormGroup>
                        </div> */}

                            <br />
                            <br />
                            <div className="contact-clinic">

                              <h3 className="form">Contact Details</h3>
                              <hr />

                              <Label className="form">Telephone</Label>
                              <br />
                              <div className="form1">
                                <Input
                                  className="input"
                                  type="telephone"
                                  placeholder="enter your clinic phone number here"
                                  defaultValue={clinicProfile.phoneNumber}
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
                                  placeholder="Enter your clinic email here"
                                  defaultValue={clinicProfile.email}
                                  onChange={e => setEmail(e.target.value)}
                                />
                              </div>
                            </div>

                            <br />
                            <div className='clinic-address'>
                              <Label className="form">Address</Label>
                              <br />
                              <div className="row" style={{ paddingLeft: '30px' }}>
                                <div className="form1 col">
                                  <Input
                                    style={{ width: '400px', marginLeft: '19px' }}
                                    className="input"
                                    type="text"
                                    placeholder="enter your clinic detail address; eg: Jln. Soekarno-Hatta 112"
                                    defaultValue={clinicDetail.address}
                                    onChange={e => setAddress(e.target.value)}
                                  />
                                </div>
                                <div className="form1 col">
                                  <Input
                                    style={{ width: '200px' }}
                                    className="input"
                                    type="text"
                                    placeholder="enter the city of your clinic, eg: Jakarta"
                                    defaultValue={clinicDetail.city}
                                    onChange={e => setCity(e.target.value)}
                                  />
                                </div>
                              </div>
                            </div>
                            <br />
                            <br />
                          </div>
                        </Form>
                      </div>
                      <div>
                    <Button
                      className="tombol-simpan"
                      type="simpan"
                      color="warning"
                      onClick={handleChangeProfile}>
                      Save</Button>
                    <Modal isOpen={modal} toggle={toggle} style={{ marginTop: '120px' }}>
                      <ModalBody
                        style={{
                          backgroundColor: '#1A3150',
                          paddingTop: '4rem',
                        }}>
                        <div className="col ">
                          <div className="row d-flex justify-content-center">
                            <img src={checklist} />
                          </div>

                          <br />
                          <div className="row d-flex justify-content-center">
                            <h1 style={{ color: 'white' }}>Update Succeed!</h1>
                          </div>
                        </div>
                      </ModalBody>
                    </Modal>
                  </div>
                  <br />
                  <br />
                    </div>
                  }

                  
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <br /><br /><br /><br />
        {isLoading ? '' : <Footer />}
        
      </div>
    </>
  );
};

export default ManageDoctor;
