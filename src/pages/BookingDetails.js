import Axios from "axios";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import Navbar from "../layout/Header";
import gambar from "../img/image 4 (1).png";
import "./bookingDetails.css";
import profilDoc from "../img/vet.png";
import cek from "../img/check-mark.svg";
import add from "../img/Vector (1).png";
import ModalPetBooking from "./ModalPetBooking";
import anjing from "../img/emojione_dog-face.png";
import kucing from '../img/fxemoji_cat.png'
import hamster from '../img/noto_hamster.png'
import kelinci from '../img/twemoji_rabbit-face.png'
import close from "../img/Vector (2).png";
import Footer from "../layout/Footer";
import { DatePicker } from 'react-rainbow-components';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import msgIcon from './../img/Vector (4).png'
import ModalNewChat from "./ModalNewChat";
import ModalPetInfo from "./ModalPetInfo";
import ModalInputPetBook from "./ModalInputPetBook";
import { connect } from "react-redux";

const BookingDetails = (props) => {
    let setmin = new Date();
    let todayDate = setmin.getDate()
    let todayMonth = setmin.getMonth()
    let todayYear = setmin.getFullYear()

    let setmax = new Date()
    setmax.setMonth(setmax.getMonth() + 2)
    let maxDate = setmax.getDate()
    let maxMonth = setmax.getMonth()
    let maxYear = setmax.getYear()

    const toggle = () => setModal(!modal);

    const [isLoading, setIsLoading] = useState(false);
    const [clinics, setClinics] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [pet, setPet] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [date, setDate] = useState(setmin)
    const [kartuDok, setKartuDok] = useState('')
    const [modal, setModal] = useState(false);
    const [pets, setPets] = useState([])
    const [petModal, setPetModal] = useState('')
    const [dokterName, setDokterName] = useState('')
    const [petName, setPetName] = useState('')
    const [petGender, setPetGender] = useState('')
    const [harkun, setHarkun] = useState('')
    const [facilities, setFacilities] = useState([])
    const [clinicProfile, setClinicProfile] = useState('')
    const [petSpecyId, setPetSpecyId] = useState('')


    useEffect(() => {
        setIsLoading(true);
        Axios.get(`https://api.vetclinic.my.id/clinic/${params.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(
                (res) => {
                    // console.log(res.data[0])
                    setClinics(res.data[0]);
                    setIsLoading(false)
                    localStorage.setItem('clinicSent', res.data[0].name)
                }
            );
        Axios.get(`https://api.vetclinic.my.id/clinic/${params.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                // console.log(res.data[0].userVetenaries)
                setDoctors(res.data[0].userVetenaries)
            }
            )
        Axios.get(`https://api.vetclinic.my.id/clinic/${params.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                // console.log(res.data[0].facilities)
                setFacilities(res.data[0].facilities)
                localStorage.setItem('clinicEmail', res.data[0].userAdmins[0].user.email)
            }
            )

        Axios(`https://api.vetclinic.my.id/pet/${localStorage.getItem('id')}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                console.log(res.data)
                setPets(res.data)
                setIsLoading(false)
            })
    }, [props.trigger]);
    useEffect(() => {


        // Axios(`https://api.vetclinic.my.id/admin/profile/${params.id}`, {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         Authorization: `Bearer ${localStorage.getItem('token')}`,
        //     },
        // }).then((res) => {
        //     console.log('ini dari profil klinik detail booking')
        //     console.log(res.data[0])
        //     setClinicProfile(res.data[0]);
        //     setIsLoading(false);
        // });
    }, [])


    const params = useParams();
    console.log(params);

    let namaHari = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Monday"];
    let namaBulan = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];

    let tglbase1 = new Date();
    tglbase1.setDate(tglbase1.getDate() + 1);
    let tgl1 = tglbase1.getDate();
    let namaHari1 = namaHari[tglbase1.getDay()];
    let namaBulan1 = namaBulan[tglbase1.getMonth()];

    let tglbase2 = new Date();
    tglbase2.setDate(tglbase2.getDate() + 2);
    let tgl2 = tglbase2.getDate();
    let namaHari2 = namaHari[tglbase2.getDay()];
    let namaBulan2 = namaBulan[tglbase2.getMonth()];

    let tglbase3 = new Date();
    tglbase3.setDate(tglbase3.getDate() + 3);
    let tgl3 = tglbase3.getDate();
    let namaHari3 = namaHari[tglbase3.getDay()];
    let namaBulan3 = namaBulan[tglbase3.getMonth()];

    let tglbase4 = new Date();
    tglbase4.setDate(tglbase4.getDate() + 4);
    let tgl4 = tglbase4.getDate();
    let namaHari4 = namaHari[tglbase4.getDay()];
    let namaBulan4 = namaBulan[tglbase4.getMonth()];

    let tglbase5 = new Date();
    tglbase5.setDate(tglbase5.getDate() + 5);
    let tgl5 = tglbase5.getDate();
    let namaHari5 = namaHari[tglbase5.getDay()];
    let namaBulan5 = namaBulan[tglbase5.getMonth()];

    let tglbase6 = new Date();
    tglbase6.setDate(tglbase6.getDate() + 6);
    let tgl6 = tglbase6.getDate();
    let namaHari6 = namaHari[tglbase6.getDay()];
    let namaBulan6 = namaBulan[tglbase6.getMonth()];

    let tglbase7 = new Date();
    tglbase7.setDate(tglbase7.getDate() + 7);
    let tgl7 = tglbase7.getDate();
    let namaHari7 = namaHari[tglbase7.getDay()];
    let namaBulan7 = namaBulan[tglbase7.getMonth()];



    const [jamMulaiDok, setJamMulaiDok] = useState(100);
    const [jamPulangDok, setJamPulangDok] = useState("");
    const [waktuKunjung, setWaktuKunjung] = useState(0);
    const handlerJam = (e) => {
        setWaktuKunjung(e.target.value);
        setJamMulaiDok(e.target.value.slice(0, 5));
        setJamPulangDok(e.target.value.slice(6, 11));
        localStorage.setItem("waktuKunjungan", e.target.value);
    };

    const [hari, setHari] = useState("");
    const handlerHari = (e) => {
        localStorage.setItem("hariKunjungan", e.target.id);
        localStorage.setItem('day', e.target.value)
        setHari(e.target.value);
    };

    const history = useHistory();
    const handlerDelete = (e) => {
        localStorage.removeItem(`namaHewan${e.target.id}`);
        history.push(`/book-clinic/${params.id}`);
    };

    const [dokter, setDokter] = useState("");
    const handlerDokter = (e) => {
        setDokter(e.target.id);
        // setDokterName(e.target.value)
        console.log(e.target.value)
        localStorage.setItem("idDokter", e.target.id);
    };

    const chooseCalendar = (value) => {
        setDate(value)
    }

    const handleBookNext = () => {
        localStorage.setItem('petId', petModal)
        localStorage.setItem('petName', petName)
        localStorage.setItem('petGender', petGender)
        toggle()
    }

    const handlerBookNow = () => {

        localStorage.setItem('vetId', dokter)
        localStorage.setItem('clinicIdForBooking', params.id)
        localStorage.setItem('doctorName', dokterName)
        localStorage.setItem("idDokter", dokter)

        localStorage.setItem('pictureUrl', clinics.pictureUrl)


        !localStorage.getItem('day') ? alert('Please choose booking date first') :
            !localStorage.getItem('waktuKunjungan') ? alert('Please choose visit hour first') :
                !localStorage.getItem('vetId') ? alert('Please choose vetenarian first') :
                    !localStorage.getItem('petId') ? alert('Please add or select pet') : history.push("/book-resume")

    }

    return (
        <div>
            <Navbar /> <br />
            <br />
            <br />
            <br />
            {localStorage.getItem('role') !== 'user' ? <h1>This page can only be accessed by logged in patient. Login as patient if you want to book an appointment.</h1> :
                isLoading === true ? (
                    <div class="spinner">
                        <div class="bounce1"></div>
                        <div class="bounce2"></div>
                        <div class="bounce3"></div>
                    </div>
                ) : (
                        <div>
                            <div className="container">
                                <div>
                                    {localStorage.setItem("namaRS", clinics.name)}
                                    <div className="yangdiAtas">
                                        <h1 className="namaRS">{clinics.name}</h1>
                                        <div className="chat-now d-flex aign-items-center justify-content-center">
                                            <ModalNewChat clinicName={clinics.name} email={clinicProfile}/>
                                        </div>
                                    </div>
                                    <h3 className="informasi-umum">General Information</h3>
                                    <div className="row">
                                        <div className="col-lg-6 col-md-12 col-sm-12 aboutRS">
                                            <img src={clinics.pictureUrl ? clinics.pictureUrl : gambar} alt="" />
                                            <h3>About</h3>
                                            <p>{clinics.about}</p>
                                        </div>
                                        <div className="col-lg-6 col-md-12 col-sm-12 info-kunjungan">
                                            <h3>Visit Info</h3>
                                            <p>Choose the Day</p>
                                            <div className="hari-kunjungan">
                                                <div className="d-flex">
                                                    <button
                                                        id={`${tgl1} ${namaBulan1}`}
                                                        value={namaHari1}
                                                        onClick={(e) => {
                                                            handlerHari(e, "value");
                                                        }}
                                                        className={`harkun ${hari === namaHari1 ? "harkun-active" : ""
                                                            }`}
                                                    >
                                                        {namaHari1} <br /> {tgl1} {namaBulan1}
                                                    </button>
                                                    <button
                                                        value={namaHari2}
                                                        id={`${tgl2} ${namaBulan2}`}
                                                        onClick={(e) => {
                                                            handlerHari(e, "value");
                                                        }}
                                                        className={`harkun ${hari === namaHari2 ? "harkun-active" : ""
                                                            }`}
                                                    >
                                                        {namaHari2} <br /> {tgl2} {namaBulan2}
                                                    </button>
                                                    <button
                                                        value={namaHari3}
                                                        onClick={(e) => {
                                                            handlerHari(e, "value");
                                                        }}
                                                        className={`harkun ${hari === namaHari3 ? "harkun-active" : ""
                                                            }`}
                                                        id={`${tgl3} ${namaBulan3}`}
                                                    >
                                                        {namaHari3} <br /> {tgl3} {namaBulan3}
                                                    </button>
                                                    <button
                                                        value={namaHari4}
                                                        onClick={(e) => {
                                                            handlerHari(e, "value");
                                                        }}
                                                        className={`harkun ${hari === namaHari4 ? "harkun-active" : ""
                                                            }`}
                                                        id={`${tgl4} ${namaBulan4}`}
                                                    >
                                                        {namaHari4} <br /> {tgl4} {namaBulan4}
                                                    </button>
                                                </div>
                                                <div className="d-flex">
                                                    <button
                                                        value={namaHari5}
                                                        onClick={(e) => {
                                                            handlerHari(e, "value");
                                                        }}
                                                        className={`harkun ${hari === namaHari5 ? "harkun-active" : ""
                                                            }`}
                                                        id={`${tgl5} ${namaBulan5}`}
                                                    >
                                                        {namaHari5} <br /> {tgl5} {namaBulan5}
                                                    </button>
                                                    <button
                                                        value={namaHari6}
                                                        onClick={(e) => {
                                                            handlerHari(e, "value");
                                                        }}
                                                        className={`harkun ${hari === namaHari6 ? "harkun-active" : ""
                                                            }`}
                                                        id={`${tgl6} ${namaBulan6}`}
                                                    >
                                                        {namaHari6} <br /> {tgl6} {namaBulan6}
                                                    </button>
                                                    <button
                                                        value={namaHari7}
                                                        onClick={(e) => {
                                                            handlerHari(e, "value");
                                                        }}
                                                        className={`harkun ${hari === namaHari7 ? "harkun-active" : ""
                                                            }`}
                                                        id={`${tgl7} ${namaBulan7}`}
                                                    >
                                                        {namaHari7} <br /> {tgl7} {namaBulan7}
                                                    </button>
                                                </div>
                                                {/* <div className="date-picker">
                        <p>Want to book for the day after next week? Choose date below</p>
                        <DatePicker
                          value={date}
                          minDate={new Date(todayYear, todayMonth, todayDate)}
                          // maxDate={new Date(maxYear, maxMonth, maxDate)}
                          // label="Choose Another Day"
                          onChange={value => chooseCalendar(value)}
                        />
                      </div> */}
                                            </div>
                                            <div className="waktu-kunjung">
                                                <p>Visit Hour</p>
                                                {clinics ? clinics.startTime < 12 &&
                                                    clinics.endTime < 16 ? (
                                                        <div className="d-flex">
                                                            <button
                                                                value={`${clinics.startTime}-12.00`}
                                                                onClick={(e) => {
                                                                    handlerJam(e, "value");
                                                                }}
                                                                className={`wakun-btn ${waktuKunjung === `${clinics.startTime}-12.00`
                                                                    ? "wakun-btn-active"
                                                                    : ""
                                                                    }`}
                                                            >
                                                                {clinics.startTime}-12.00 Morning
                            </button>
                                                            <button
                                                                value={`12.00-${clinics.endTime}`}
                                                                onClick={(e) => {
                                                                    handlerJam(e, "value");
                                                                }}
                                                                className={`wakun-btn ${waktuKunjung === `12.00-${clinics.endTime}`
                                                                    ? "wakun-btn-active"
                                                                    : ""
                                                                    }`}
                                                            >
                                                                12.00-{clinics.endTime} Afternoon
                            </button>
                                                            <br />
                                                        </div>
                                                    ) : clinics.startTime < 12 &&
                                                        clinics.endTime > 18 ? (
                                                            <div>
                                                                <div className="d-flex">
                                                                    <button
                                                                        value={`${clinics.startTime}-12.00`}
                                                                        onClick={(e) => {
                                                                            handlerJam(e, "value");
                                                                        }}
                                                                        className={`wakun-btn ${waktuKunjung === `${clinics.startTime}-12.00`
                                                                            ? "wakun-btn-active"
                                                                            : ""
                                                                            }`}
                                                                    >
                                                                        {clinics.startTime}-12.00 Morning
                              </button>
                                                                    <button
                                                                        value={`12.00-15.00`}
                                                                        onClick={(e) => {
                                                                            handlerJam(e, "value");
                                                                        }}
                                                                        className={`wakun-btn ${waktuKunjung === "12.00-15.00"
                                                                            ? "wakun-btn-active"
                                                                            : ""
                                                                            }`}
                                                                    >
                                                                        12.00-15.00 Afternoon
                              </button>
                                                                    <br />
                                                                </div>
                                                                <div className="d-flex">
                                                                    <button
                                                                        value={`15.00-18.00`}
                                                                        onClick={(e) => {
                                                                            handlerJam(e, "value");
                                                                        }}
                                                                        className={`wakun-btn ${waktuKunjung === "15.00-18.00"
                                                                            ? "wakun-btn-active"
                                                                            : ""
                                                                            }`}
                                                                    >
                                                                        15.00-18.00 Afternoon{" "}
                                                                    </button>
                                                                    <button
                                                                        value={`18.00-${clinics.endTime}`}
                                                                        onClick={(e) => {
                                                                            handlerJam(e, "value");
                                                                        }}
                                                                        className={`wakun-btn ${waktuKunjung === `18.00-${clinics.endTime}`
                                                                            ? "wakun-btn-active"
                                                                            : ""
                                                                            }`}
                                                                    >
                                                                        18.00-{clinics.endTime} Night{" "}
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ) : clinics.startTime < 12 &&
                                                            clinics.endTime < 19 ? (
                                                                <div>
                                                                    <div className="d-flex">
                                                                        <button
                                                                            value={`${clinics.startTime}-12.00`}
                                                                            onClick={(e) => {
                                                                                handlerJam(e, "value");
                                                                            }}
                                                                            className={`wakun-btn ${waktuKunjung === `${clinics.startTime}-12.00`
                                                                                ? "wakun-btn-active"
                                                                                : ""
                                                                                }`}
                                                                        >
                                                                            {clinics.startTime}-12.00 Morning
                              </button>
                                                                        <button
                                                                            value={`12.00-15.00`}
                                                                            onClick={(e) => {
                                                                                handlerJam(e, "value");
                                                                            }}
                                                                            className={`wakun-btn ${waktuKunjung === `12.00-15.00`
                                                                                ? "wakun-btn-active"
                                                                                : ""
                                                                                }`}
                                                                        >
                                                                            12.00-15.00 Afternoon
                              </button>
                                                                        <br />
                                                                    </div>
                                                                    <div className="d-flex">
                                                                        <button
                                                                            value={`15.00-${clinics.endTime}`}
                                                                            onClick={(e) => {
                                                                                handlerJam(e, "value");
                                                                            }}
                                                                            className={`wakun-btn ${waktuKunjung === `15.00-${clinics.endTime}`
                                                                                ? "wakun-btn-active"
                                                                                : ""
                                                                                }`}
                                                                        >
                                                                            15.00-{clinics.endTime} Afternoon{" "}
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            ) : clinics.startTime > 12 &&
                                                                clinics.endTime < 19 ? (
                                                                    <div className="d-flex">
                                                                        <button
                                                                            value={`${clinics.startTime}-15.00`}
                                                                            onClick={(e) => {
                                                                                handlerJam(e, "value");
                                                                            }}
                                                                            className={`wakun-btn ${waktuKunjung === `${clinics.startTime}-15.00`
                                                                                ? "wakun-btn-active"
                                                                                : ""
                                                                                }`}
                                                                        >
                                                                            {clinics.startTime}-15.00 Afternoon
                            </button>
                                                                        <br />
                                                                        <button
                                                                            value={`15.00-${clinics.endTime}`}
                                                                            onClick={(e) => {
                                                                                handlerJam(e, "value");
                                                                            }}
                                                                            className={`wakun-btn ${waktuKunjung === `15.00-${clinics.endTime}`
                                                                                ? "wakun-btn-active"
                                                                                : ""
                                                                                }`}
                                                                        >
                                                                            15.00-{clinics.endTime} Afternoon{" "}
                                                                        </button>
                                                                    </div>
                                                                ) : (
                                                                    <div>
                                                                        <div className="d-flex">
                                                                            <button
                                                                                value={`${clinics.startTime}-15.00`}
                                                                                onClick={(e) => {
                                                                                    handlerJam(e, "value");
                                                                                }}
                                                                                className={`wakun-btn ${waktuKunjung === `${clinics.startTime}-15.00`
                                                                                    ? "wakun-btn-active"
                                                                                    : ""
                                                                                    }`}
                                                                            >
                                                                                {clinics.startTime}-15.00 Afternoon
                              </button>
                                                                            <br />
                                                                            <button
                                                                                value={`15.00-18.00`}
                                                                                onClick={(e) => {
                                                                                    handlerJam(e, "value");
                                                                                }}
                                                                                className={`wakun-btn ${waktuKunjung === `15.00-18.00`
                                                                                    ? "wakun-btn-active"
                                                                                    : ""
                                                                                    }`}
                                                                            >
                                                                                15.00-18.00 Afternoon{" "}
                                                                            </button>
                                                                        </div>
                                                                        <div className="d-flex">
                                                                            <button
                                                                                value={`18.00-${clinics.endTime}`}
                                                                                onClick={(e) => {
                                                                                    handlerJam(e, "value");
                                                                                }}
                                                                                className={`wakun-btn ${waktuKunjung === `18.00-${clinics.endTime}`
                                                                                    ? "wakun-btn-active"
                                                                                    : ""
                                                                                    }`}
                                                                            >
                                                                                18.00-{clinics.endTime} p.m.{" "}
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                ) : ""}

                                                <h3 className="facil">Facilities</h3>
                                                <div className="row">
                                                    {clinics.facilities && clinics.facilities.split(', ').slice(0, 4).map(facility =>
                                                        <div className="facilities d-flex">
                                                            <div className="facility facil-active">.</div>
                                                            <img src={cek} className="cek-fasil cek-fasil-active" alt="cek" />
                                                            <h4>{facility}</h4>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="pilih-dokter col-12">
                                            <h2>Select Veterinarian</h2>
                                            <div className="row">
                                                {doctors ? doctors.map((doctor) => (
                                                    <div className="col-lg-4 col-sm-12 col-md-6">
                                                        <div onClick={(e) => { setDokter(doctor.id), setDokterName(doctor.user.fullname) }}
                                                            id={doctor.id}
                                                            value={doctor.user.fullname}
                                                            className={`d-flex kartudok ${doctor.jamMulai <= jamMulaiDok &&
                                                                doctor.jamPulang >= jamPulangDok
                                                                ? "kartudok-active"
                                                                : "kartudok-active"
                                                                } ${dokter === doctor.id ? "kartudok-chosen" : ''}`}
                                                        >
                                                            <img src={profilDoc} alt="wow   " onClick={(e) => handlerDokter(e, "id")}
                                                                id={doctor.id} />
                                                            <div>
                                                                <h3 onClick={(e) => handlerDokter(e, "id")}
                                                                    id={doctor.id}>Veterinarian</h3>
                                                                <h1 onClick={(e) => handlerDokter(e, "id")}
                                                                    id={doctor.id}>{doctor.user.fullname}</h1>
                                                                <div
                                                                    className={`statuses d-flex ${doctor.jamMulai <= jamMulaiDok &&
                                                                        doctor.jamPulang >= jamPulangDok
                                                                        ? "statuses-active"
                                                                        : "statuses-active"
                                                                        }`}
                                                                >
                                                                    <div
                                                                        onClick={(e) => handlerDokter(e, "id")}
                                                                        id={doctor.id}
                                                                        className={`status ${doctor.jamMulai <= jamMulaiDok &&
                                                                            doctor.jamPulang >= jamPulangDok
                                                                            ? "status-active"
                                                                            : "statuses-active"
                                                                            }`}
                                                                    >
                                                                        .
                                    </div>
                                                                    <h4 onClick={(e) => handlerDokter(e, "id")}
                                                                        id={doctor.id}>

                                                                        {doctor.jamMulai <= jamMulaiDok &&
                                                                            doctor.jamPulang >= jamPulangDok
                                                                            ? "Available"
                                                                            : "Available"}
                                                                    </h4>
                                                                </div>
                                                                <div
                                                                    className={`cek-bungkus ${doctor.id === dokter
                                                                        ? "cek-bungkus-chosen"
                                                                        : ""
                                                                        }`}
                                                                    onClick={(e) => handlerDokter(e, "value")}
                                                                    id={doctor.id}
                                                                >
                                                                    <img
                                                                        className="cek"
                                                                        src={cek}
                                                                        alt="dua"
                                                                        onClick={(e) => handlerDokter(e, "value")}
                                                                        id={doctor.id}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )) : ''}
                                            </div>
                                        </div>
                                        <div className="info-hewan">
                                            <h3>Select Pet</h3>
                                            <div className="d-flex">
                                                <div className="pet-add">
                                                    <div className="modal-pet">
                                                        <div className="modal-pet">
                                                            <img src={add} onClick={toggle} alt="" />
                                                            <Modal isOpen={modal} toggle={toggle} className='modal-pet'>
                                                                <ModalHeader className='modal-header-pet' toggle={toggle}>
                                                                    <h1>Which Pet You Would Like to Check?</h1>
                                                                </ModalHeader>
                                                                <ModalBody className='form-pet'>
                                                                    <div className="row">
                                                                        <div className='adder-pet-booking'>
                                                                            <ModalInputPetBook param={params.id} />
                                                                            <p>Add New Pet</p>
                                                                        </div>
                                                                        {pets.map(pet =>
                                                                            <div className={`modal-book-pet col-3 ${petModal === pet.id ? 'modal-book-pet-active' : ''}`} onClick={e => { setPetModal(pet.id), setPetName(pet.name), setPetGender(pet.gender), setPetSpecyId(pet.petSpecyId) }} id={pet.id}>
                                                                                <img src={pet.petSpecyId === '648928bb-3b8a-11eb-a4ce-06058d744160' ? anjing : pet.petSpecyId === '64895775-3b8a-11eb-a4ce-06058d744160' ? kucing : pet.petSpecyId === '648958b7-3b8a-11eb-a4ce-06058d744160' ? kelinci : hamster} alt="anjing" className='gambar-pet-modal' />
                                                                                <h1 className='name-pet-modal'>{pet.name ? pet.name.length > 6 ? `${pet.name.slice(0, 6)}...` : pet.name : ''}</h1>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </ModalBody>
                                                                <ModalFooter className='modal-footer-pet'>
                                                                    <button onClick={handleBookNext} className='action-pet btn-block'>Add</button>
                                                                </ModalFooter>
                                                            </Modal>
                                                        </div>
                                                        <br />
                                                    </div>
                                                    <p>Choose Pet</p>
                                                </div>
                                                <div>
                                                    {localStorage.getItem("petName") !== null ?
                                                        <div className="pet-add">
                                                            <div>
                                                                 <img src={petSpecyId === '648928bb-3b8a-11eb-a4ce-06058d744160' ? anjing : petSpecyId === '64895775-3b8a-11eb-a4ce-06058d744160' ? kucing : petSpecyId === '648958b7-3b8a-11eb-a4ce-06058d744160' ? kelinci : hamster} alt="anjing" className='gambar-pet-willbe' />
                                                            </div>
                                                            <p>
                                                                {localStorage.getItem("petName")} /{" "}
                                                                {localStorage.getItem("petGender")}
                                                            </p>
                                                        </div>
                                                        :
                                                        <div> </div>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <button
                                            className="book-now"
                                            onClick={handlerBookNow}
                                        >
                                            Book Now
                    </button>
                                    </div>
                                    <br />
                                    <br />
                                    <br />
                                </div>
                            </div>
                            <Footer />
                        </div>

                    )}
        </div>
    );
};

const stateProps = globalState => {
    return {
        trigger: globalState.doctor
    }
}

export default connect(stateProps)(BookingDetails);
