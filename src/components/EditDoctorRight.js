import { SettingsSystemDaydreamTwoTone } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import axios from "axios";
import {
  Row,
  Label,
  Form,
  FormGroup,
  Input,
  Button,
  Modal,
  ModalBody,
} from "reactstrap";
import ModalPetInfo from "../pages/ModalPetInfo";
import { connect } from "react-redux";
import "./EditUserRight.css";

const EditDoctorRight = (props) => {
  const checklist =
    "https://ik.imagekit.io/zvqf9loqe2/VET/Group_DcxThd9dOuTC.svg";
  const [modal, setModal] = useState(false);
  const [data, setData] = useState("");
  const [trigger, setTrigger] = useState(0);
  const [username, setUsername] = useState(data.username);
  const [gender, setGender] = useState(data.gender);
  const [phone, setPhone] = useState(data.phoneNumber);
  const [email, setEmail] = useState(data.email);
  const [fullname, setFullname] = useState(data.fullname);
  const [pets, setPets] = useState([]);
  const [prev, setPrev] = useState(null);
  const [pictureUrl, setPictureUrl] = useState(data.pictureUrl);

  const toggle = () => setModal(!modal);

  const getDataUser = () => {
    Axios(`https://api.vetclinic.my.id/profile/${localStorage.getItem("id")}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      console.log(res.data[0]);
      setData(res.data[0]);
      localStorage.setItem("fullname", res.data[0].fullname);
      localStorage.setItem("email", res.data[0].email);
      localStorage.setItem("gender", res.data[0].gender);
      localStorage.setItem("username", res.data[0].username);
      localStorage.setItem("phoneNumber", res.data[0].phoneNumber);
      localStorage.setItem("pictureUrl", res.data[0].pictureUrl);
    });
  };

  const getDataPet = () => {
    axios(`https://api.vetclinic.my.id/pet/${localStorage.getItem("id")}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      console.log(res.data);
      setPets(res.data);
    });
  };

  useEffect(() => {
    getDataUser();
    getDataPet();
  }, [trigger]);

  const handleChangeProfile = () => {
    const bodyData = {
      username,
      fullname,
      gender,
      phoneNumber: phone,
      email,
      pictureUrl,
    };

    Axios(
      `https://api.vetclinic.my.id/profile/u/?id=${localStorage.getItem("id")}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: JSON.stringify(bodyData),
      }
    ).then(() => {
      getDataUser();
      setTrigger(trigger + 1);
      props.updateName()
      toggle();
    });
  };

  // utk masukin gambar
  const onFormSubmit = (e) => {
    e.preventDefault();
    e.target.files[0] === undefined
      ? ""
      : setPrev(URL.createObjectURL(e.target.files[0]));

    const formData = new FormData();
    formData.append("file", e.target.files[0]);
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
        console.log(res.data.fileName);
        setPictureUrl(res.data.fileName);
        console.log(pictureUrl);
      })
      .then(() => {
        console.log(pictureUrl);
        // handleChangeProfile();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlerDelete = (e) => {
    console.log(e.target.id);
    const bodyData = {
      id: e.target.id,
    };
    axios("https://api.vetclinic.my.id/pet", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: JSON.stringify(bodyData),
    }).then((res) => console.log(res.data));
  };

  return (
    <div className="rightSide">
      <Form>
        <div className="rightSide">
          <Form>
            <div>
              <h3 className="form">Upload Photo</h3>
              <hr />
              <div className="rcorners">
                <div className="upload">
                  <form onSubmit={(e) => onFormSubmit(e)}>
                    <div className="form-group preview">
                      {prev ? <img src={prev} alt="prev" /> : ""}
                    </div>
                    <div className="image-button">
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
                  </form>
                </div>
                <div className="upload-text">
                  <h5 style={{ color: "#818181" }}>Upload Image</h5>
                </div>
              </div>
              <h3 style={{ marginTop: "40px" }} className="form">
                Basic Information
              </h3>
              <hr />
              <Label className="form">Fullname</Label>
              <br />
              <div className="form1">
                <Input
                  className="input"
                  type="text"
                  placeholder="Your fullname"
                  defaultValue={data.fullname}
                  onChange={(e) => setFullname(e.target.value)}
                />
              </div>{" "}
              <br />
              <Label className="form">Username</Label>
              <br />
              <div className="form1">
                <Input
                  className="input"
                  type="text"
                  placeholder="Alexandria"
                  defaultValue={data.username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <br />
              <Label className="form">Gender</Label>
              <br />
              <Row className="gender-user">
                <FormGroup check>
                  {data.gender === "male" ? (
                    <div>
                      <label
                        style={{ marginLeft: "-34px", marginRight: "80px" }}
                        check
                      >
                        <Input
                          type="radio"
                          name="radio1"
                          checked
                          value="male"
                          onClick={(e) => setGender(e.target.value)}
                        />
                        Male
                      </label>

                      <label check>
                        <Input
                          type="radio"
                          name="radio1"
                          value="female"
                          onClick={(e) => setGender(e.target.value)}
                        />
                        Female
                      </label>
                    </div>
                  ) : data.gender === "female" ? (
                    <div>
                      <label
                        style={{ marginLeft: "-34px", marginRight: "80px" }}
                        check
                      >
                        <Input
                          type="radio"
                          name="radio1"
                          value="male"
                          onClick={(e) => setGender(e.target.value)}
                        />
                        Male
                      </label>

                      <label check>
                        <Input
                          type="radio"
                          name="radio1"
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
                          name="radio1"
                          value="male"
                          onClick={(e) => setGender(e.target.value)}
                        />
                        Male
                      </label>

                      <label check>
                        <Input
                          type="radio"
                          name="radio1"
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
              <br />
              <h3 className="form">Contact Details</h3>
              <hr />
              <Label className="form">Phone Number</Label>
              <br />
              <div className="form1">
                <Input
                  className="input"
                  type="telephone"
                  placeholder="+712371723 18231823"
                  defaultValue={data.phoneNumber}
                  onChange={(e) => setPhone(e.target.value)}
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
                  defaultValue={data.email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <br />
              <br />
              {/* <div className="profil info-hewan">
                <h3>Your Pets</h3>
                <div className="d-flex">
                  <div className="pet-add">
                    <div className="modal-pet">
                      <ModalPetInfo />
                      <br />
                    </div>
                    <p>Add Pet</p>
                  </div>
                  {pets
                    ? pets.map((pet) => (
                        <div className="pet-add">
                          <div>
                            <img
                              id={pet.id}
                              onClick={(e) => handlerDelete(e, "id")}
                              className="close"
                              src={closer}
                              alt="close"
                            />
                            <img className="pesewet" src={anjing} alt="" />
                          </div>
                          <p>
                            {pet.name} / {pet.gender}
                          </p>
                        </div>
                      ))
                    : ""}
                </div>
              </div>{" "} */}
              <br />
            </div>
          </Form>
        </div>
      </Form>

      <div>
        <Button
          className="tombol-simpan"
          type="simpan"
          color="warning"
          onClick={handleChangeProfile}
        >
          Simpan
        </Button>
        <Modal
          isOpen={modal}
          toggle={toggle}
          style={{ marginTop: "150px", borderRadius: "25px" }}
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
                <h1 style={{ color: "white" }}>Update Succeeded</h1>
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

const stateToProps = (globalState) => {
  return {
    user: globalState.doctor,
  };
};

const dispatchProps = (dispatch) => {
  return {
    updateName: () => dispatch({ type: "ADD_DOCTOR" }),
  };
};

export default connect(stateToProps, dispatchProps)(EditDoctorRight);
