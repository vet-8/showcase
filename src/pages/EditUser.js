import { NavLink, useRouteMatch } from "react-router-dom";
import React, { useState } from "react";
import Header from "../layout/Header";
import {
  Container,
  Label,
  Input,
  Button,
  Form,
  Row,
  Col,
  Modal,
} from "reactstrap";
import "./EditUser.css";
import { FormGroup } from "@material-ui/core";

const EditUser = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <>
      <Header />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Container fluid={true}>
        <Row>
          <Col sm="4">
            <UserLeftSide />
          </Col>

          <Col sm="8">
            <div className="rightSide">
              <Form>
                <div>
                  <h3 className="form">Upload Photo</h3>
                  <hr />
                  <div className="rcorners">
                    <div className="upload">
                      <img src="https://ik.imagekit.io/zvqf9loqe2/VET/Vector__1__wVzNtBzycat.svg" />
                    </div>
                    <div className="upload-text">
                      <h5 style={{ color: "#818181" }}>Upload Image</h5>
                    </div>
                  </div>

                  <h3 style={{ marginTop: "40px" }} className="form">
                    Basic Information
                  </h3>
                  <hr />
                  <Label className="form">Username</Label>
                  <br />
                  <div className="form1">
                    <Input
                      className="input"
                      type="text"
                      placeholder="Alexandria"
                    />
                  </div>

                  <br />
                  <Label className="form">Gender</Label>
                  <br />
                  <Row className="radioButton">
                    <FormGroup>
                      <Label style={{ marginRight: "100px" }}>
                        <Input type="radio" name="radio1" />
                        Male
                      </Label>

                      <Label>
                        <Input type="radio" name="radio1" />
                        Female
                      </Label>
                    </FormGroup>
                  </Row>

                  <br />
                  <br />
                  <h3 className="form">Contact Details</h3>
                  <hr />
                  <Label className="form">Nomor Telephone</Label>
                  <br />
                  <div className="form1">
                    <Input
                      className="input"
                      type="telephone"
                      placeholder="+712371723 18231823"
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
                    />
                  </div>

                  <br />
                  <br />

                  <h4 className="form">Informasi tentang Hewan Peliharaan</h4>
                  <br />
                  <Label className="form">Jumlah Hewan Peliharaan</Label>
                  <div className="form1">
                    <Input
                      className="input"
                      type="jumlahhewan"
                      placeholder="3 Ekor"
                    />
                  </div>

                  <br />
                  <Label className="form">Waktu Berkunjung Perawatan</Label>
                  <div className="form1">
                    <Input
                      className="input"
                      type="waktuberkunjung"
                      placeholder="3 Kali"
                    />
                  </div>

                  <br />
                  <br />
                  <br />
                </div>
              </Form>
            </div>
          </Col>
        </Row>
        <Button
          className="tombol-simpan"
          type="simpan"
          color="warning"
          onClick={toggle}
        >
          Simpan
        </Button>
        <Modal isOpen={modal} toggle={toggle} className="edit-modal-placement">
          <img
            src="https://ik.imagekit.io/zvqf9loqe2/VET/Group_118__1__PAR5wsVN2kvo.svg"
            style={{ height: "374px" }}
          />
        </Modal>
        <br />
        <br />
      </Container>

      {/* <Footer /> */}
    </>
  );
};

export default EditUser;
