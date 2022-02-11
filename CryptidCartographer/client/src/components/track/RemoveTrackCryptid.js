import React from "react";
import { Card, CardBody, Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import { deleteTrack } from "../../modules/trackManager"
import { useParams } from "react-router-dom";

let userid = parseInt(localStorage.getItem("LoggedInUserId"))

const RemoveTrackCryptid = () => {

    const history = useHistory();
    const { cryptidId } = useParams();

    const handleCancel = () => {
        history.push("/trackedCryptidList")
    }

    const handleRemoveTrack = () => {
        const track = {
            userId: userid,
            cryptidId: cryptidId
        }
        deleteTrack(track)
        history.push("/trackedCryptidList")
    }
    return (
        <Card color="secondary" className="removetrack_card">
            <CardBody>
                <p><strong>Stop tracking this cryptid?</strong></p>
                <p><small>(Confirm to remove from 'Cryptid Tracker')</small></p>
                <br></br>
                <Button color="danger" onClick={handleRemoveTrack}>Confirm</Button>
                <Button color="warning" onClick={handleCancel}>Cancel</Button>
            </CardBody>
        </Card >
    );
};

export default RemoveTrackCryptid;