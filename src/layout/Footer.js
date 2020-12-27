import React from "react";
import "./Footer.css";
import { Row, Col } from "reactstrap";


const Footer = () => {
  return (
    <>
      <div className="footer" style={{height:"200px"}}>
        
          <Row> 
          <Col xs="3">
          <div className="logo1">
              <div className="d-flex align-items-center">
                <img src="https://ik.imagekit.io/tk1apipynn/final-assets/Group_6_vqzZkWHlEfjD.svg" alt="footer-logo" />
              </div>
          </div>
          </Col>
          <Col xs="3" style={{backgroundColor:"#1A3150", paddingLeft:"150px"}}>
            <p className="text-footer bold">Company</p>
            <div className="list-group d-flex flex-column">
              <div className="list-group-item border-0 p-0" style={{backgroundColor:"#1A3150"}}>
                About Us
              </div>
              <div className="list-group-item  border-0 p-0" style={{backgroundColor:"#1A3150"}}>
                Career
              </div>
              <div className="list-group-item  border-0 p-0"style={{backgroundColor:"#1A3150"}}>
                Contact Us
              </div>
            </div>
          </Col>
          <Col xs="3" style={{backgroundColor:"#1A3150",  paddingLeft:"80px"}}>
            <p className="text-footer bold">Further Information</p>
            <div className="list-group d-flex flex-column">
              <div className="list-group-item bg-transparant border-0 p-0" style={{backgroundColor:"#1A3150"}}>
                About Us
              </div>
              <div className="list-group-item bg-transparant border-0 p-0" style={{backgroundColor:"#1A3150"}}>
                Career
              </div>
              <div className="list-group-item bg-transparant border-0 p-0" style={{backgroundColor:"#1A3150"}}>
                Contact Us
              </div>
            </div>
          </Col>
          <Col xs="3" style={{backgroundColor:"#1A3150"}}>
            <p className="text-footer bold">Follow Us</p>
            <div className="list-group list-group-horizontal flex-row">
              <div className="list-group-item bg-transparant border-0 p-2" style={{backgroundColor:"#1A3150"}}>
                <img 
                src="https://ik.imagekit.io/tk1apipynn/final-assets/twitter_UAIEQfEne-X.svg" 
                alt=""/>
              </div>
              <div className="list-group-item bg-transparant border-0 p-2" style={{backgroundColor:"#1A3150"}}>
                <img
                src="https://ik.imagekit.io/tk1apipynn/final-assets/ig__uBWDpwbavTw.svg"
                alt="" />
              </div>
              <div className="list-group-item bg-transparant border-0 p-2" style={{backgroundColor:"#1A3150"}}>
                <img
                src="https://ik.imagekit.io/tk1apipynn/final-assets/facebook_Rq36iL8o5DCd.svg"
                alt="" />
              </div>
            </div>
          </Col>
          </Row>
        
      </div>
    </>
  );
};

export default Footer;
