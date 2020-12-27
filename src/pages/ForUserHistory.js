import React, { useState } from "react";
import Header from "../layout/Header";
import "./UserHistory.css";
import './ForUserHistory.css'
import { Container, Row, Col } from "reactstrap";
import UserHis from "../components/UserHis";
import BriefProfile from '../components/BriefProfile'
import UserApp from "../components/UserApp";
import { Switch, Route, NavLink, useRouteMatch } from 'react-router-dom'

const ForUserHistory = () => {
  let { path, url } = useRouteMatch();
  const [submenu, setSubmenu] = useState('appointment')
  return (
    <>
      <Header />
      <div className="dokter-background">
        <br /><br /><br /><br /><br />
        <Container fluid={true}>
          <Row>
            <BriefProfile />
            <Col sm="8">
              <div className="dokter-right-box">
                  <Row>
                    <Row className="mt-4 ml-4">
                      <button className={`submenu-user ${submenu === 'appointment' ? 'submenu-active' : ''}`} onClick={() => setSubmenu('appointment')}> Appointment </button>
                      <button className={`submenu-user ${submenu === 'history' ? 'submenu-active' : ''}`} onClick={() => setSubmenu('history')}> History</button>
                    </Row>
                  </Row>
                  <hr />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default ForUserHistory;
