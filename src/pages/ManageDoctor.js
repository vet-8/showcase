import React, { useEffect, useState } from 'react';
import Header from '../layout/Header';
import { Switch, Route, NavLink, useRouteMatch, useHistory } from 'react-router-dom';
import './ManageDoctor.css';
import { Container, Row, Col } from 'reactstrap';
import AppointmentClinic from '../components/AppointmentClinic';
import ManageDoc from '../components/ManageDoc';
import EditClinicRight from '../components/EditClinicRight';
import profile from './../img/user.svg'
import Footer from './../layout/Footer'
import Axios from 'axios'
import offline from './../img/Group.png'
import profil from './../img/image 4 (1).png'
import EditProfileClinic from './EditProfileClinic'



const ManageDoctor = () => {
  let { path, url } = useRouteMatch();
  const history = useHistory()
  const [editProfile, setEditProfile] = useState(false);
  const [submenu, setSubmenu] = useState('appointment')
  const [clinicProfile, setClinicProfile] = useState('')
  const [clinicDetail, setClinicDetail] = useState('')
  const [isLoading, setIsLoading] = useState(false)


  const getDataClinicDetail = () => {
    setIsLoading(true)
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


  useEffect(() => {
    getDataClinicProfile()
    getDataClinicDetail()
  }, [])



  const handleLogout = () => {
    localStorage.clear()
    history.push('/')
  }


  return (
    <>
      <Header />
      <div className="dokter-background">
        <br />
        <br />
        <br />
        <br />
        <br />
        <Container fluid={true} >
          <Row>
            <Col sm="4" className="dokter-left-box ">
              <div class="leftSide text-center mx-5">
                <div>
                  <img
                    src={clinicDetail.pictureUrl !== null ? clinicDetail.pictureUrl : profil}
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
                    <h5>{clinicDetail.startTime} - {clinicDetail.endTime}</h5>
                  </Col>
                </Row>

                <hr style={{ marginRight: '50px', marginLeft: '50px' }} />
                <NavLink to={'/forclinic/edit-profile'}
                  exact={true} className="nav-link inactive-nav-edit-profile">
                  Edit Profile
                </NavLink>
                <br />
              </div>

              <div className="logout mx-5 mb-5" onClick={handleLogout}>
                <Row className="logout-comp logout-profile" style={{ position: 'relative', right: '47px' }}>
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
              <div className="dokter-right-box" style={{ paddingBottom: '61px' }}>
                {editProfile && (
                  <Switch>
                    <Route path={`${url}/edit-profile`}>
                      <EditClinicRight />
                    </Route>
                  </Switch>
                )}
                {!editProfile && (
                  <>
                    <Row>
                      <Row className="mt-4 ml-4">
                        <button className={`submenu-clinic ${submenu === 'appointment' ? 'submenu-clinic-active' : ''}`} onClick={() => setSubmenu('appointment')}> Appointment </button>
                        <button className={`submenu-clinic ${submenu === 'history' ? 'submenu-clinic-active' : ''}`} onClick={() => setSubmenu('history')}> Manage Doctor</button>
                      </Row>
                    </Row>
                    <hr />
                  </>
                )}

                <Row className="mb-4">
                  {submenu === 'appointment' ? <AppointmentClinic /> : <ManageDoc />}
                </Row>
                <Switch>
                  <Route exact path={`forclinic/edit-profile`}>
                    <EditProfileClinic />
                  </Route>
                </Switch>

              </div>
            </Col>
          </Row>
        </Container> <br /><br /><br /><br />
        <Footer />
      </div>
    </>
  );
};

export default ManageDoctor;
