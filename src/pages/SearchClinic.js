import Header from "../layout/Header";
import './searchClinic.css'
import rsh from '../img/image 4.png'
import { useEffect, useState } from "react";
import Axios from "axios";
import search from '../img/search.svg'
import Footer from '../layout/Footer'
import { useHistory, Switch, Route } from "react-router-dom";
import BookingDetails from './BookingDetails'

const SearchClinic = () => {

    const [isLoading, setIsLoading] = useState(false)

    const [clinics, setClinics] = useState([])
    useEffect(() => {
        setIsLoading(true)
        Axios.get('https://api.vetclinic.my.id/clinic')
            .then(res => {
                console.log(res.data)
                setClinics(res.data)
                setIsLoading(false)
            })
    }, [])

    const [city, setCity] = useState('all')
    const handleOnClick = (e) => {
        e.preventDefault()
        setCity(e.target.id)
        console.log(e.target.id)
    }

    const [searched, setSearched] = useState(' ')
    const handleSubmit = e => {
        e.preventDefault()
        setSearched(submitted)
        console.log(searched)
    }

    const [submitted, setSubmitted] = useState('')
    const handlerChange = e => {
        setSubmitted(e.target.value)
    }

    const [pet, setPet] = useState('all')
    const [defaultPet, setDefaultPet] = useState('Pets')
    const handlerKoceng = e => {
        setPet(e.target.id)
        setDefaultPet(e.target.value)
        console.log(pet)
    }

    const history = useHistory()


    return (
        <div>
            <Header /><br /><br /><br /><br />
            {isLoading === true ?
                <div>
                    <div class="spinner">
                        <div class="bounce1"></div>
                        <div class="bounce2"></div>
                        <div class="bounce3"></div>
                    </div>
                </div>
                :
                <div>
                    {/* <Header />
                    <br /><br /><br /> <br /> */}
                    <div className='container'>
                        <div className="search-tool">
                            <div className="dropdown mr-1">
                                <button type="button" className="btn btn-secondary dropdown-toggle btn-lokasi" id="dropdownMenuOffset" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-offset="10,20">
                                    {city === 'all' ? 'Location' : city}</button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuOffset">
                                    <a className="dropdown-item" id='all' onClick={e => handleOnClick(e, 'id')}>All Location</a>
                                    <a className="dropdown-item" id='Jakarta' onClick={e => handleOnClick(e, 'id')}>Jakarta</a>
                                    <a className="dropdown-item" id='Surabaya' onClick={e => handleOnClick(e, 'id')}>Surabaya</a>
                                    <a className="dropdown-item" id='Bandung' onClick={e => handleOnClick(e, 'id')}>Bandung</a>
                                    <a className="dropdown-item" id='Yogyakarta' onClick={e => handleOnClick(e, 'id')}>Yogyakarta</a>
                                    <a className="dropdown-item" id='Batam' onClick={e => handleOnClick(e, 'id')}>Batam</a>
                                </div>
                            </div>
                            <div className="dropdown mr-1">
                                <button type="button" className="btn btn-secondary dropdown-toggle btn-pet" id="dropdownMenuOffset" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-offset="10,20">
                                    {pet === 'all' ? 'Pets' :
                                        pet === 'anjing' ? 'Dog' :
                                            pet === 'kucing' ? 'Cat' :
                                                pet === 'kelinci' ? 'Rabbit' : 'Hamster'}</button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuOffset">
                                    <a className="dropdown-item" id='all' onClick={e => handlerKoceng(e, 'id')}>All Pets</a>
                                    <a className="dropdown-item" id='anjing' value='dog' onClick={e => handlerKoceng(e, 'value')}>Dog</a>
                                    <a className="dropdown-item" id='kucing' value='cat' onClick={e => handlerKoceng(e, 'value')}>Cat</a>
                                    <a className="dropdown-item" id='hamster' value='hamster' onClick={e => handlerKoceng(e, 'value')}>Hamster</a>
                                    <a className="dropdown-item" id='kelinci' value='rabbit' onClick={e => handlerKoceng(e, 'value')}>Rabbit</a>
                                </div>
                            </div>
                            <div className="search-input">
                                <form onSubmit={e => handleSubmit(e, 'value')}>
                                    <img src={search} alt="search" />
                                    <input type="text" placeholder='Search by name' onChange={handlerChange} />
                                </form>

                            </div>
                        </div>

                        <div className="row">
                            {pet === city ?
                                clinics.filter(clinic => clinic.name.toLowerCase().includes(searched)).length > 0 ? clinics.filter(clinic => clinic.name.toLowerCase().includes(searched)).map(clinic =>
                                    <div className="col-lg-3 col-md-6 col-sm-12">
                                        <div className="card-search">
                                            <div className="card">
                                                <img src={clinic.pictureUrl} className="card-img-top" alt="ottoke" />
                                                <div className="card-body-search">
                                                    <button className='btn-loc-search'>{clinic.city}</button>
                                                    <h5 className="card-title-search">{clinic.name}</h5>
                                                    <p className="card-text-search">{clinic.startTime} - {clinic.endTime}</p>
                                                    <a className="btn btn-block booknow" onClick={() => {
                                                        history.push(`/book-clinic/${clinic.id}`);
                                                    }}>Book Now</a>
                                                </div>
                                                {console.log(clinic.jamOperasional)}
                                            </div>
                                        </div>
                                    </div>) :
                                    <div>
                                        <br /><br /><br />
                                        <h1 style={{ position: 'relative', left: '20vw' }}>No Matched Results Found</h1><br /><br /><br /><br /><br /><br />
                                    </div>
                                :
                                pet === 'all' ? clinics.filter(clinic => clinic.city === city).filter(clinic => clinic.name.toLowerCase().includes(searched)).length > 0 ? clinics.filter(clinic => clinic.city === city).filter(clinic => clinic.name.toLowerCase().includes(searched)).map(clinic =>
                                    <div className="col-3">
                                        <div className="card-search">
                                            <div className="card">
                                                <img src={clinic.pictureUrl} className="card-img-top" alt="ottoke" />
                                                <div className="card-body-search">
                                                    <button className='btn-loc-search'>{clinic.city}</button>
                                                    <h5 className="card-title-search">{clinic.name}</h5>
                                                    <p className="card-text-search">{clinic.startTime} - {clinic.endTime}</p>
                                                    <a className="btn btn-block booknow" onClick={() => {
                                                        history.push(`/book-clinic/${clinic.id}`);
                                                    }}>Book Now</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : <div>
                                        <br /><br /><br />
                                        <h1 style={{ position: 'relative', left: '20vw' }}>No Matched Results Found</h1><br /><br /><br /><br /><br /><br />
                                    </div>
                                    :
                                    city === 'all' ? clinics.filter(clinic => clinic.patient.includes(pet)).filter(clinic => clinic.name.toLowerCase().includes(searched)).length > 0 ? clinics.filter(clinic => clinic.patient.includes(pet)).filter(clinic => clinic.name.toLowerCase().includes(searched)).map(clinic =>
                                        <div className="col-3">
                                            <div className="card-search">
                                                <div className="card">
                                                    <img src={clinic.pictureUrl} className="card-img-top" alt="ottoke" />
                                                    <div className="card-body-search">
                                                        <button className='btn-loc-search'>{clinic.city}</button>
                                                        <h5 className="card-title-search">{clinic.name}</h5>
                                                        <p className="card-text-search">{clinic.startTime} - {clinic.endTime}</p>
                                                        <a className="btn btn-block booknow" onClick={() => {
                                                            history.push(`/book-clinic/${clinic.id}`);
                                                        }}>Book Now</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : <div>
                                            <br /><br /><br />
                                            <h1 style={{ position: 'relative', left: '20vw' }}>No Matched Results Found</h1><br /><br /><br /><br /><br /><br />
                                        </div>
                                        :
                                        clinics.filter(clinic => clinic.patient.includes(pet) && clinic.city === city && clinic.name.toLowerCase().includes(searched)).length > 0 ?
                                            clinics.filter(clinic => clinic.patient.includes(pet) && clinic.city === city && clinic.name.toLowerCase().includes(searched)).map(clinic => <div className="col-3">
                                                <div className="card-search">
                                                    <div>
                                                        <img src={clinic.pictureUrl} className="card-img-top" alt="ottoke" />
                                                        <div className="card-body-search">
                                                            <button className='btn-loc-search'>{clinic.city}</button>
                                                            <h5 className="card-title-search">{clinic.name}</h5>
                                                            <p className="card-text-search">{clinic.startTime} - {clinic.endTime}</p>
                                                            <a className="btn btn-block booknow" onClick={() => {
                                                                history.push(`/book-clinic/${clinic.id}`);
                                                            }}>Book Now</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>)
                                            : <div>
                                                <br /><br /><br />
                                                <h1 style={{ position: 'relative', left: '20vw' }}>No Matched Results Found</h1><br /><br /><br /><br /><br /><br />
                                            </div>
                            }
                        </div>
                    </div>
                    <Footer />
                </div>
            }

        </div>

    );



}



export default SearchClinic;
