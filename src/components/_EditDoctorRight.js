import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Row,
  Label,
  Form,
  FormGroup,
  Input,
  Button,
  ModalBody,
  Modal,
} from "reactstrap";

const EditDoctorRight = () => {
  const [doctor, setDoctor] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [gender, setGender] = useState(doctor.gender);
  const [prev, setPrev] = useState(null);
  const [pictureUrl, setPictureUrl] = useState(
    localStorage.getItem("pictureUrl")
  );
  const checklist =
    "https://ik.imagekit.io/zvqf9loqe2/VET/Group_DcxThd9dOuTC.svg";
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  useEffect(() => {
    const url = `${
      process.env.REACT_APP_API_URL
    }/profile/${localStorage.getItem("id")}`;

    const auth = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    axios.get(url, auth).then((res) => {
      console.log(res.data[0]);
      setDoctor(res.data[0]);
    });
  }, []);

  const onFormSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.files);
    e.target.files[0] === undefined
      ? ""
      : setPrev(URL.createObjectURL(e.target.files[0]));

    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    console.log(formData);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    };
    axios
      .post("https://api.vetclinic.my.id/file", formData, config)
      .then((res) => {
        localStorage.setItem("pictureurl", res.data.fileName);
        setPictureUrl(res.data.fileName);
        console.log(res.data.fileName);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="rightSide">
      <Form>
        <div>
          <h3 className="form">Upload Photo</h3>
          <hr />
          <br />
          <form onSubmit={(e) => onFormSubmit(e)}>
            <div className="form-group preview">
              {prev ? <img src={prev} alt="prev" /> : ""}
            </div>
            <div className="rcorners">
              <div className="image-button upload">
                <label htmlFor="change-photo">
                  <img
                    src="https://ik.imagekit.io/zvqf9loqe2/VET/Vector__1__wVzNtBzycat.svg"
                    alt="plusbutton"
                  />
                </label>
                <input
                  id="change-photo"
                  type="file"
                  name="myImage"
                  onChange={onFormSubmit}
                />
                <button type="submit">Upload</button>
              </div>
              <div className="upload-text">
                <h5 style={{ color: "#818181" }}>Upload Image</h5>
              </div>
            </div>
          </form>

          <h3 className="form">Doctor Information</h3>
          <hr />

          <Label className="form">Status</Label>
          <br />
          <Row className="gender-user">
            <FormGroup check>
              {doctor.gender === "online" ? (
                <div>
                  <label
                    style={{ marginLeft: "-34px", marginRight: "80px" }}
                    check
                  >
                    <Input
                      type="radio"
                      name="radio1"
                      checked
                      value="online"
                      onClick={(e) => setStatus(e.target.value)}
                    />
                    Online
                  </label>

                  <label check>
                    <Input
                      type="radio"
                      name="radio1"
                      value="offline"
                      onClick={(e) => setStatus(e.target.value)}
                    />
                    Offline
                  </label>
                </div>
              ) : doctor.gender === "offline" ? (
                <div>
                  <label
                    style={{ marginLeft: "-34px", marginRight: "80px" }}
                    check
                  >
                    <Input
                      type="radio"
                      name="radio1"
                      value="online"
                      onClick={(e) => setStatus(e.target.value)}
                    />
                    Online
                  </label>

                  <label check>
                    <Input
                      type="radio"
                      name="radio1"
                      checked
                      value="offline"
                      onClick={(e) => setStatus(e.target.value)}
                    />
                    Offline
                  </label>
                </div>
              ) : (
                <div>
                  <label
                    style={{ marginLeft: "-34px", marginRight: "80px" }}
                    check
                  >
                    <Input
                      type="radio"
                      name="radio1"
                      value="online"
                      onClick={(e) => setStatus(e.target.value)}
                    />
                    Online
                  </label>

                  <label check>
                    <Input
                      type="radio"
                      name="radio1"
                      value="offline"
                      onClick={(e) => setStatus(e.target.value)}
                    />
                    Offline
                  </label>
                </div>
              )}
            </FormGroup>
          </Row>
          <br />
          <h3 className="form">Basic Information</h3>
          <hr />

          <Label className="form">Fullname</Label>
          <br />
          <div className="form1">
            <Input
              className="input"
              type="text"
              placeholder="Enter your fullname"
              defaultValue={doctor.fullname}
            />
          </div>

          <br />
          <Label className="form">Gender</Label>
          <br />
          <Row className="gender-user">
            <FormGroup check>
              {doctor.gender === "male" ? (
                <div>
                  <label
                    style={{ marginLeft: "-34px", marginRight: "80px" }}
                    check
                  >
                    <Input
                      type="radio"
                      name="radio2"
                      checked
                      value="male"
                      onClick={(e) => setGender(e.target.value)}
                    />
                    Male
                  </label>

                  <label check>
                    <Input
                      type="radio"
                      name="radio2"
                      value="female"
                      onClick={(e) => setGender(e.target.value)}
                    />
                    Female
                  </label>
                </div>
              ) : doctor.gender === "female" ? (
                <div>
                  <label
                    style={{ marginLeft: "-34px", marginRight: "80px" }}
                    check
                  >
                    <Input
                      type="radio"
                      name="radio2"
                      value="male"
                      onClick={(e) => setGender(e.target.value)}
                    />
                    Male
                  </label>

                  <label check>
                    <Input
                      type="radio"
                      name="radio2"
                      checked
                      value="female"
                      onClick={(e) => setGender(e.target.value)}
                    />
                    Female
                  </label>
                </div>
              ) : (
                <div>
                  <label
                    style={{ marginLeft: "-34px", marginRight: "80px" }}
                    check
                  >
                    <Input
                      type="radio"
                      name="radio2"
                      value="male"
                      onClick={(e) => setGender(e.target.value)}
                    />
                    Male
                  </label>

                  <label check>
                    <Input
                      type="radio"
                      name="radio2"
                      value="female"
                      onClick={(e) => setGender(e.target.value)}
                    />
                    Female
                  </label>
                </div>
              )}
            </FormGroup>
          </Row>

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
              defaultValue={doctor.telepon}
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
              defaultValue={doctor.email}
            />
          </div>
          <br />
          <br />
          <br />
        </div>
      </Form>

      <div>
        <Button
          className="tombol-simpan"
          type="simpan"
          color="warning"
          onClick={toggle}
        >
          Simpan
        </Button>
        <Modal
          isOpen={modal}
          toggle={toggle}
          style={{ marginTop: "13rem", borderRadius: "25px" }}
        >
          <ModalBody
            style={{
              backgroundColor: "#1A3150",
              paddingTop: "3rem",
              paddingBottom: "3rem",
              borderRadius: "2px",
            }}
          >
            <div className="col ">
              <div className="row d-flex justify-content-center">
                <img src={checklist} />
              </div>

              <br />
              <div className="row d-flex justify-content-center">
                <h1 style={{ color: "white" }}>Update Sukses</h1>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </div>

      <br />
      <br />
    </div>
  );
};

export default EditDoctorRight;
