const DetailUser = (props) => {
    console.log('ini sumber nama usernya')
    console.log(props.user)
    console.log('ini booking yg dikirim')
    console.log(props.bookings ? props.bookings[0] : 'hahahah')

    let bahan = props.bookings ? props.bookings[0] : 'hahahah'

    return (
        <div>
            {/* {props.bookings.map(booking => 
                <p>{props.user.filter(displayed => displayed.id === booking.id).user.fullname}</p>
                )} */}
            <p>
                {/* {props.bookings && props.user.filter(displayed => displayed.id === props.bookings.id).user.fullname} */}
            </p>

        </div>
    );
}

export default DetailUser;