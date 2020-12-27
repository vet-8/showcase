import React, { useState } from 'react';
import Header from '../layout/Header';
import {
  Container,
  Label,
  Input,
  Button,
  Form,
  Row,
  Col,
  Modal,
} from 'reactstrap';
import './EditUser.css';
import { FormGroup } from '@material-ui/core';

const EditClinic = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <>
      <Header />
      <Container>
        <Row className="content">
          <Col className="contentLeft" lg={4} sm={0}>
            <div class="leftSide text-center">
              <Form className="upper">
                <div>
                  <img
                    src="https://ik.imagekit.io/zvqf9loqe2/VET/Ellipse_10_tm2bFcdD2lB.svg"
                    width="30%"
                  />
                  <div className="profile-name">
                    <h3>Alexandria Raihan</h3>
                    <div className="container">
                      <img src="https://ik.imagekit.io/zvqf9loqe2/VET/Rectangle_58__2__cf6kxOwVGAC.svg" />
                      <div className="statusCli align-items-center">{`CLINIC`}</div>
                    </div>
                  </div>
                </div>

                <div className="profile2">
                  <Row className="profile2-comp">
                    <Col>
                      <Row>
                        <img
                          src="https://ik.imagekit.io/zvqf9loqe2/VET/Vector__2___vbNttX3HpvA.svg"
                          width="18%"></img>
                        <h5 style={{ color: 'green' }}>Open</h5>
                      </Row>
                    </Col>
                    <Col>
                      <Row>
                        <img
                          src="https://ik.imagekit.io/zvqf9loqe2/VET/Vector__4__K80mNf7TiTVb.svg"
                          width="18%"></img>
                        <h5>09:00 - 18:00</h5>
                      </Row>
                    </Col>
                  </Row>
                </div>
                <hr style={{ marginRight: '50px', marginLeft: '50px' }} />
                <Button className="tombol-edit" type="edit" color="warning">
                  Edit Profile
                </Button>
                <br />
                <br />
              </Form>
            </div>

            <div className="logout">
              <Row className="logout-comp">
                <img src="https://ik.imagekit.io/zvqf9loqe2/VET/clarity_logout-line_6JOgslcDRtq.svg" />
                <div className="text">
                  <h5>{`Logout`}</h5>
                </div>
              </Row>
            </div>
          </Col>

          <Col className="contentRight" lg={8} sm={0}>
            <div className="rightSide">
              <Form>
                <div>
                  <h3 className="form">Upload Photo</h3>
                  <hr />
                  <br />
                  <div className="rcorners">
                    <div className="upload">
                      <img src="https://ik.imagekit.io/zvqf9loqe2/VET/Vector__1__wVzNtBzycat.svg" />
                    </div>
                    <div className="upload-text">
                      <h5 style={{ color: '#818181' }}>Upload Image</h5>
                    </div>
                  </div>

                  <h3 className="form">Clinic Information</h3>
                  <hr />

                  <Label className="form">Status</Label>
                  <br />
                  <Row className="radioButton">
                    <FormGroup check>
                      <Label style={{ marginRight: '100px' }} check>
                        <Input type="radio" name="radio1" />
                        {``} Buka
                      </Label>
                    </FormGroup>

                    <FormGroup check>
                      <Label check>
                        <Input type="radio" name="radio1" />
                        {``} Tutup
                      </Label>
                    </FormGroup>
                  </Row>

                  <br />

                  <Row>
                    <div className="d-flex">
                      <FormGroup className="form">
                        <Label for="exampleSelect">Waktu Buka</Label>
                        <Input
                          style={{ width: '200px' }}
                          type="select"
                          name="select"
                          id="exampleSelect">
                          <option>08.00</option>
                          <option>09.00</option>
                          <option>10.00</option>
                          <option>11.00</option>
                          <option>12.00</option>
                          <option>13.00</option>
                          <option>14.00</option>
                          <option>15.00</option>
                        </Input>
                      </FormGroup>

                      <FormGroup className="form">
                        <Label for="exampleSelect">Waktu Tutup</Label>
                        <Input
                          style={{ width: '200px' }}
                          type="select"
                          name="select"
                          id="exampleSelect">
                          <option>11.00</option>
                          <option>12.00</option>
                          <option>13.00</option>
                          <option>14.00</option>
                          <option>15.00</option>
                          <option>16.00</option>
                          <option>17.00</option>
                          <option>18.00</option>
                          <option>19.00</option>
                          <option>20.00</option>
                          <option>21.00</option>
                        </Input>
                      </FormGroup>
                    </div>
                  </Row>

                  <br />
                  <br />
                  <h3 className="form">Basic Information</h3>
                  <hr />

                  <Label className="form">Nama Klinik</Label>
                  <br />
                  <div className="form1">
                    <Input
                      className="input"
                      type="text"
                      placeholder="RS Dihajar"
                    />
                  </div>

                  <br />
                  <Label className="form">Fasilitas</Label>

                  <FormGroup style={{ marginLeft: '70px' }} check>
                    <Label check>
                      <Input type="checkbox" /> Area Parkir
                    </Label>
                    <Label check>
                      <Input type="checkbox" /> Ruang Tunggu
                    </Label>
                    <Label check>
                      <Input type="checkbox" /> Ruang Darurat
                    </Label>
                    <Label check>
                      <Input type="checkbox" /> Ruang Rawat Inap
                    </Label>
                  </FormGroup>

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
                  <Row>
                    <Col>
                      <Label className="form">Alamat</Label>
                      <br />
                      <div className="form1">
                        <Input
                          className="input"
                          type="text"
                          placeholder="Jalan Paguyuban"
                        />
                      </div>
                    </Col>
                    <Col>
                      <Label className="form">Kota</Label>
                      <br />
                      <div className="form1">
                        <Input
                          className="input"
                          type="text"
                          placeholder="Jogjakarta"
                        />
                      </div>
                    </Col>
                  </Row>

                  <br />
                  <br />

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
          onClick={toggle}>
          Simpan
        </Button>
        <Modal isOpen={modal} toggle={toggle} className="edit-modal-placement">
          <img
            src="https://ik.imagekit.io/zvqf9loqe2/VET/Group_118__1__PAR5wsVN2kvo.svg"
            style={{ height: '374px' }}
          />
        </Modal>
        <br />
        <br />
      </Container>

      {/* <Footer /> */}
    </>
  );
};

export default EditClinic;
