import { useEffect, useState } from 'react';
import { CardBody, CardText, Row, Col } from 'reactstrap'
import Axios from 'axios'
import DetailStage1 from './DetailStage1'

const DetailClinicApp = (props) => {

    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState([])
    const [users, setUsers] = useState([])

    useEffect(() => {
        setIsLoading(true)
        Axios(`https://api.vetclinic.my.id/admin/booking/?id=${localStorage.getItem('clinicid')}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                setData(res.data[0].userVetenaries[props.index].vetenariesTimes)
                setIsLoading(false)
                console.log(data)
            })

        
    }, [])
    return (
        <div>
            {data && data.map(appointment =>

                <div tabIndex="1" className="card w-100 appointment-card-user mb-2">
                    <CardBody>
                        <CardText>
                            <Row className="justify-content-around text-center">
                                <Col>
                                    <div className="appointment-date d-flex align-items-center">
                                        <strong>{appointment.operationalDay}</strong>
                                    </div>
                                </Col>
                                <Col className="d-flex align-items-center justify-content-center">
                                    <div className="name-of-clinic">{props.vetName}</div>
                                </Col>
                                <Col className="d-flex align-items-center justify-content-center">
                                    <div className="clinic-name-clinic">
                                        <DetailStage1 fromVet={appointment.bookings}/>
                                    </div>
                                </Col>
                                <Col className="d-flex align-items-center justify-content-center">
                                    <div className="appointment-time" style={{ position: 'relative', left: '70px' }}>{appointment.startTime}</div>
                                </Col>
                                <Col
                                    sm="3"
                                    className="d-flex align-items-center justify-content-center chat-user">
                                    <span>
                                        <img src="https://ik.imagekit.io/zvqf9loqe2/VET/eva_message-square-fill_BKxk6qNCntU.svg" />
                                    </span>
                                </Col>
                            </Row>
                        </CardText>
                    </CardBody>
                </div>
            )}
        </div>
    );
}

export default DetailClinicApp 