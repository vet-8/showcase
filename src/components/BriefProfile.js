import React, { useState } from "react";
import { Switch, Route, NavLink, useRouteMatch } from "react-router-dom";
import "./../pages/UserHistory.css";
import { Container, Row, Col } from "reactstrap";
import { connect } from 'react-redux'
import profile from './../img/user.svg'

const UserHistory = (props) => {

    return (
        <>
            <Col sm="4" className="dokter-left-box ">
                <div className="leftSide text-center mx-5">
                    <div>
                        {localStorage.getItem('pictureurl') ?
                            <img
                                src={localStorage.getItem('pictureUrl') === 'null' ? profile : localStorage.getItem('pictureUrl')}
                                width="30%"
                                className="mt-4"
                            />
                            :
                            <img
                                src={"https://ik.imagekit.io/zvqf9loqe2/VET/Ellipse_10_tm2bFcdD2lB.svg"}
                                width="30%"
                                className="mt-4"
                            />
                        }

                        <div className="profile-name">
                            <h3>{props.name}</h3>
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
                            <h5>4 Pets</h5>
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
                        to={`/foruser/edit-profile`}
                        exact={true}
                        className="nav-link inactive-nav-edit-profile"
                        activeClassName="active-nav-edit-profile"
                    >
                        Back to Appointments
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
            </Col>
        </>
    );
};


const stateToProps = (globalState) => {
    return {
        name: globalState.name
    };
};



export default connect(stateToProps)(UserHistory);
