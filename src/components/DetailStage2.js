import { useEffect, useState } from "react";
import Axios from 'axios'

const DetailStage2 = (props) => {

    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        Axios(`https://api.vetclinic.my.id/admin/booking/name?id=${localStorage.getItem('clinicid')}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                setUsers(res.data[0].bookings)
                setIsLoading(false)
                console.log('ini dari setUser')
                console.log(res.data[0].bookings)
            })
    },[])
    return (
        <div>
            {users && users.filter(user => user.id == props.bookingId).map(user =>
                <div>{user.user.fullname}</div>
                )}
        </div>
    );
}

export default DetailStage2;