import BriefProfile from './BriefProfile'
import EditUserRight from './EditUserRight'

const ForUser = () => {
    return (
        <div>
            <div className="row">
                <div className="col-4">
                    <BriefProfile />
                </div>
                <div className="col-8">
                    <EditUserRight />
                </div>
            </div>
        </div>
    );
}

export default ForUser;