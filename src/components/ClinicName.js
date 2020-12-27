import Axios from 'axios'
import React, { useEffect, useState } from 'react'

function ClinicName(props) {

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
        <div>
            {clinics.name}
        </div>
    )
}

export default ClinicName
