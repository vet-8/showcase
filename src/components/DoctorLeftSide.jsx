import React, { useState, useEffect } from "react";
import { Row, Col } from "reactstrap";
import { NavLink, useRouteMatch } from "react-router-dom";
import Axios from 'axios'
import profilePhoto from './../img/vet.png'
import {connect} from 'react-redux'

const DoctorLeftSide = (props) => {
  let { path, url } = useRouteMatch();
  let [doctorInfo, setDoctorInfo] = useState([]);
  const [profile, setProfile] = useState('')

  useEffect(()=>{
    Axios(`https://api.vetclinic.my.id/profile/${localStorage.getItem('id')}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => setProfile(res.data[0]))
  },[props.doctor])

  console.log(localStorage.getItem("pictureurl"));

  return (
    <>
      <div className="leftSide text-center mx-5">
        <div>
          <img
            src={profile.pictureUrl === null? profilePhoto : profile.pictureUrl}
            width="30%"
            className="mt-4 clinic-profile-pic"
          />
          <div className="profile-name">
            <h3>{localStorage.getItem("fullname")}</h3>
            <div className="container">
              <div className="statusDoc btn doctor-btn align-items-center">{`DOCTOR`}</div>
            </div>
          </div>
        </div>

        <Row className="profile1-comp mt-4">
          <Col>
            <img
              src="https://ik.imagekit.io/zvqf9loqe2/VET/Vector__2___vbNttX3HpvA.svg"
              width="18%"
            ></img>
            <h5 style={{ color: "green" }}>Online</h5>
          </Col>
          <Col>
            <img
              src="https://ik.imagekit.io/zvqf9loqe2/VET/Vector__3__O8AHPr8lggMB.svg"
              width="18%"
            ></img>
            <h5>3 Years</h5>
          </Col>
        </Row>

        <hr style={{ marginRight: "50px", marginLeft: "50px" }} />
        <NavLink
          to={`${path}/edit-profile`}
          exact={true}
          className="nav-link inactive-nav-edit-profile"
          activeClassName="active-nav-edit-profile"
          onClick={props.handleEditProfile}
        >
          {props.whatNow === false ? 'Edit Profile' : 'Back to Approval'}
        </NavLink>
        <br />
      </div>

      <div className="logout mx-5 mb-5">
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
    </>
  );
};

const stateProps = globalState => {
  return {
    doctor: globalState.doctor
  }
}

export default connect (stateProps)(DoctorLeftSide);
