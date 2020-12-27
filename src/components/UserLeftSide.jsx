import React from "react";
import { Row, Col } from "reactstrap";
import { NavLink, useRouteMatch } from "react-router-dom";

const UserLeftSide = () => {
  const { path, url } = useRouteMatch();
  return (
    <>
      <div className="leftSide text-center">
        <div>
          <img
            src="https://ik.imagekit.io/zvqf9loqe2/VET/Ellipse_10_tm2bFcdD2lB.svg"
            width="30%"
            className="mt-4"
          />
          <div className="profile-name">
            <h3>Alexandria Raihan</h3>
            <div className="container">
              <div className="statusDoc btn user-btn align-items-center px-5">{`USER`}</div>
            </div>
          </div>
        </div>

        <div className="profile1">
          <Row className="profile1-comp mt-4">
            <Col>
              <img
                src="https://ik.imagekit.io/zvqf9loqe2/VET/ic_round-pets_wx0wyUcOP-G.svg"
                width="18%"
              ></img>
              <h5>4Pets</h5>
            </Col>
            <Col>
              <img
                src="https://ik.imagekit.io/zvqf9loqe2/VET/Vector_gObBYmwCQpty.svg"
                width="18%"
              ></img>
              <h5>3 Times</h5>
            </Col>
          </Row>
          <hr style={{ marginRight: "50px", marginLeft: "50px" }} />
          <NavLink
            to={`${path}/edit-profile`}
            exact={true}
            className="nav-link inactive-nav-edit-profile"
            activeClassName="active-nav-edit-profile"
          >
            Edit Profile
          </NavLink>
          <br />
        </div>
      </div>

      <div className="logout">
        <Row className="logout-comp">
          <img src="https://ik.imagekit.io/zvqf9loqe2/VET/clarity_logout-line_6JOgslcDRtq.svg" />
          <div className="text">
            <h5>{`Logout`}</h5>
          </div>
        </Row>
      </div>
    </>
  );
};

export default UserLeftSide;
