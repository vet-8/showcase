import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import { Switch, Route, NavLink, useRouteMatch, useHistory } from "react-router-dom";
import "./UserHistory.css";
import { Container, Row, Col } from "reactstrap";
import UserApp from "../components/UserApp";
import UserHis from "../components/UserHis";
import EditUserRight from "../components/EditUserRight";
import Footer from "../layout/Footer";
import profil from './../img/user.svg'
import axios from 'axios'
import Axios from 'axios'

const UserHistory = () => {
  let { path, url } = useRouteMatch();
  const history = useHistory()
  const [editProfile, setEditProfile] = useState(false);
  const [submenu, setSubmenu] = useState('appointments')
  const [pets, setPets] = useState([])
  const [userHistories, setUserHistories] = useState([])
  const [profile, setProfile] = useState('')

  useEffect(() => {
    axios(`https://api.vetclinic.my.id/pet/${localStorage.getItem('id')}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }, [])
      .then(res => {
        console.log(res.data)
        setPets(res.data)
      })

    Axios(`https://api.vetclinic.my.id/profile/${localStorage.getItem('id')}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => {
      console.log(res.data[0])
      setProfile(res.data[0])})

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
  }, [])
  const handleEditProfile = () => {
    setEditProfile(!editProfile);
  };

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
        <Container fluid={true}>
          <Row>
            <Col sm="4" className="dokter-left-box ">
              <div className="leftSide text-center mx-5">
                <div>
                  <img
                    src={profile.pictureUrl !== null ? profile.pictureUrl : profil}
                    width="30%"
                    className="mt-4 clinic-profile-pic"
                  />
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
                    <h5>{userHistories.length} Times</h5>
                  </Col>
                </Row>

                <hr style={{ marginRight: "50px", marginLeft: "50px" }} />
                <div
                  className="nav-link inactive-nav-edit-profile"
                  onClick={() => history.push('/foruser/edit-profile')}
                >
                  Edit Profile
                </div>
                <br />
              </div>

              <div className="logout mx-5 mb-5" onClick={handleLogout}>
                <Row className="logout-comp logout-profile" onClick={handleLogout}>
                  <img
                    src="https://ik.imagekit.io/zvqf9loqe2/VET/clarity_logout-line_6JOgslcDRtq.svg"
                  />
                  <div className="text " onClick={handleLogout} >
                    <h5 onClick={handleLogout}>Logout</h5>
                  </div>
                </Row>
              </div>
            </Col>
            <Col sm="8">
              <div className="dokter-right-box">
                {editProfile && (
                  <Switch>
                    <Route path={`foruser/edit-profile`}>
                      <EditUserRight />
                    </Route>
                  </Switch>
                )}
                {!editProfile && (
                  <>
                    <Row>
                      <Row className="mt-4 ml-4">
                        <button className={`inactive-submenu mr-4 ${submenu === 'appointments' ? 'submenu-active' : ''}`} onClick={() => setSubmenu('appointments')}>Appointments</button>
                        <button className={`inactive-submenu mr-4 ${submenu === 'history' ? 'submenu-active' : ''}`} onClick={() => setSubmenu('history')}>History</button>
                      </Row>
                    </Row>
                    <hr />
                  </>
                )}

                <Row className="mb-4">
                  {submenu === 'appointments' ? <UserApp /> : <UserHis />}
                  {/* <Switch>
                    <Route exact path={`${path}`}>
                      <UserApp />
                    </Route>
                  </Switch>
                  <Switch>
                    <Route exact path={`${path}/user-history`}>
                      <UserHis />
                    </Route>
                  </Switch> */}
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
        <br /><br /><br />
        <Footer />
      </div>
    </>
  );
};

export default UserHistory;
