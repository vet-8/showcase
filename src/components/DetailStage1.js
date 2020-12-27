import DetailStage2 from './DetailStage2'

const DetailStage1 = (props) => {
    return (
        <div>
            {props.fromVet ? props.fromVet.map(booking =>
            <DetailStage2 bookingId = {booking.id}/>
            ) : ''}
        </div>
    );
}
 
export default DetailStage1;