import { useEffect, useState } from "react"
import React from 'react'
import Axios from 'axios'


const HistoryData = (props) => {
    const [clinics, setClinics] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        setIsLoading(true)
        Axios(`https://api.vetclinic.my.id/clinic/${props.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                setClinics(res.data[0])
                setIsLoading(false)
            })
    })
    return (
        <div className='d-flex' style={{position:'relative', left:'-35px', top: '0px'}}>
            <img src={clinics.pictureUrl} alt="" style={{width:'55px', height: '55px', objectFit:'cover', borderRadius: '5px'}}/>
        </div>
    )
}

export default HistoryData
