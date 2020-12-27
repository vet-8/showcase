import Navbar from "./../layout/Header";
import "./bookingResume.css";
import gambar from "./../img/image 4 (1).png";
import ModalSuccessBook from "./ModalSuccessBook";

const BookingResume = () => {
    return (
        <div>
            <Navbar /> <br /> <br /> <br />
            <div className="container resume-booking">
                <div className='resume-title'>
                    <h1>Resume Booking</h1>
                    <hr />
                    <h4>{localStorage.getItem('namaRS')}</h4>
                </div>
                <div className="row">
                    <div className="col-lg-6 col-sm-12 col-md-12">
                        <img src={localStorage.getItem('pictureUrl')} alt="gambar" />
                    </div>
                    <div className="col-lg-6 col-sm-12 col-md-12">
                        <h2>Visit Info</h2>
                        <div className="info-final">
                            <h5>Visit Day &amp; Time</h5>
                            <p>{localStorage.getItem('hariKunjungan') === null ? 'Choose date and time first' : `${localStorage.getItem('day')} ${localStorage.getItem('hariKunjungan')}, at ${localStorage.getItem('waktuKunjungan')}`} </p>
                            <h5>Veterinarian</h5>
                            <p>{localStorage.getItem('doctorName') ? localStorage.getItem('doctorName')  : 'Pilih dokter terlebih dahulu'}</p>
                            <h5>Pet</h5>
                            <p>{`${localStorage.getItem('petName') ? localStorage.getItem('petName') : 'Choose pet first'}`}</p>
                            
                        </div>
                    </div>
                </div>
                <hr />
                <ModalSuccessBook />
            </div>
        </div>
  );
};

export default BookingResume;
