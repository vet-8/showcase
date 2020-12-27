import React, { useState, useEffect } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Carousel from "react-elastic-carousel";
import "./Home.css";
import { Link, useHistory } from "react-router-dom";
// import env from "react-dotenv";

import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  // CardGroup,
} from "reactstrap";
import dogImage from "./image/home-dog.png";
import catImage from "./image/home-cat.png";
import serviceLogoMid from "./image/home-service-logo-mid.svg";
import serviceLogoLeft from "./image/home-service-logo-left.svg";
import serviceLogoRight from "./image/home-service-logo-right.svg";
import axios from "axios";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pages, setPages] = useState(1);
  const [limits] = useState(3);
  const [totalPages, setTotalPages] = useState(1);
  const [clinics, setClinics] = useState([]);
  const history = useHistory();

  useEffect(() => {
    setIsLoading(true);
    const url = `${process.env.REACT_APP_API_URL}/clinic`;
    axios.get(url).then((res) => {
      console.log(res.data);
      setClinics(res.data);
      setTotalPages(5);
      setIsLoading(false);
    });
  }, []);

  console.log(clinics);

  const slides = clinics.map((item) => {
    return (
      <Col key={item.id}>
        <Card style={{ margin: "auto", borderRadius: "11px" }}>
          <CardImg src={item.pictureUrl} width="200px" height="150px" />
          <CardBody>
            <button className="btn-loc">{item.city}</button>
            <CardTitle style={{ height: "3em", overflow: "hidden" }}>
              <strong>{item.name}</strong>
            </CardTitle>
            <CardText>{item.Year}</CardText>
            <Link to={`book-clinic/${item.id}`} className="btn btn-block">
              Find More
            </Link>
          </CardBody>
        </Card>
      </Col>
    );
  });

  return (
    <>
      {isLoading ? (
        <div style={{marginTop:'200px'}}>
          <div className="spinner">
            <div className="bounce1"></div>
            <div className="bounce2"></div>
            <div className="bounce3"></div>
          </div>
        </div>
      ) : (
        <>
          <Header />
          <div className="home-top">
            <div className="home-rectangle">
              <img src={dogImage} alt="dog" className="home-dog" />
            </div>
            <div className="home-elipse">
              <Container fluid={true}>
                <div className="ml-5 jumbotron px-0 pt-0">
                  <div className="col-md-6 px-0">
                    <h1>Welcome to VET</h1>
                    <p className="mt-3">
                      Welcome to VET application. This is a platform where we
                      pet owner can book a desired clinic and the veterinarian.
                      This website is made for the final project of Glints
                      Academy x Binar Academy batch 8. Please enjoy the website
                      as much as you could.
                    </p>
                    {/* <button className="btn btn-warning mt-3 py-3 px-5"> */}
                    <Link
                      to="/klinik"
                      className="booknow-text btn btn-warning mt-3 py-3 px-5"
                    >
                      Booking Now
                    </Link>
                    {/* <span className="booknow-text" onClick={manageBookNow}>
                      Booking Now
                    </span> */}
                    {/* </button> */}
                  </div>
                </div>
              </Container>
            </div>
          </div>
          <div className="services">OUR SERVICES</div>
          <Container fluid={true}>
            <Row className="align-items-center justify-content-around">
              <Col sm="3" className="text-center">
                <img src={serviceLogoLeft} alt="logoleft" />
                <h4>Clinics/Hospital</h4>
                <p>
                  Choose your clinic/hospital based on your location, pet type,
                  etc.
                </p>
              </Col>
              <Col sm="3" className="text-center">
                <div className="services-logo">
                  <img src={serviceLogoMid} alt="logomid" />
                </div>
                <h4>Consultation Date</h4>
                <p>Choose your desired date and time with the veterinarian</p>
              </Col>
              <Col sm="3" className="text-center">
                <div className="services-logo">
                  <img src={serviceLogoRight} alt="logoright" />
                </div>
                <h4>Meet the Doctors</h4>
                <p>
                  It's time to meet up with the doctors to consult your pet
                  health
                </p>
              </Col>
            </Row>
            <Row className="align-items-center mx-5 px-1 text-middle">
              <Col sm="6">
                <div className="cat-bg-img text-center">
                  <img src={catImage} alt="catimage" />
                </div>
              </Col>
              <Col>
                <h2>Why Choose Us?</h2>
                <p>
                  We are the elites of the elites. We provide the best possible
                  platfrom so that our user could find the most benefit from
                  using our services. We also make sure that the clinics and
                  veterinarians are officially registered and licensed.
                  <strong>
                    Try our service now! Get a discount for first time users!
                  </strong>
                </p>
              </Col>
            </Row>

            <Row className="align-items-center justify-content-between mx-5 px-1 text-middle">
              <Col sm="5" className="mr-5">
                <h2>Choose Clinics</h2>
                <p>
                  Please choose your desired clinics. For further search, please
                  click on the "Find Clinics" in the header section. You can
                  filter the search bar based on the clinics' name, location,
                  and even the type of pets accepted.
                  <br />
                  On the side, you can find more about the few chosen clinics.
                  Just click "find more" to find out more about those clinics.
                </p>
              </Col>
              <Col className="ml-auto justify-items-center">
                {isLoading === true ? (
                  <div>
                    <div className="spinner">
                      <div className="bounce1"></div>
                      <div className="bounce2"></div>
                      <div className="bounce3"></div>
                    </div>
                  </div>
                ) : (
                  <Carousel itemsToShow={2}>{slides}</Carousel>
                )}
              </Col>
            </Row>
          </Container>
          <Footer />
        </>
      )}
    </>
  );
};

export default Home;
