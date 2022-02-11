import React from "react";
import { Card, CardBody, Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import { addTrack } from "../../modules/trackManager"
import { useParams } from "react-router-dom";
import "../track/TrackedCryptid.css"

let userid = parseInt(localStorage.getItem("LoggedInUserId"))

const AddTrackCryptid = () => {

    const history = useHistory();
    const { cryptidId } = useParams();

    const handleCancel = () => {
        history.push("/myCryptidList")
    }

    const handleAddTrack = () => {
        const newTrack = {
            userId: userid,
            cryptidId: cryptidId
        }
        addTrack(newTrack)
        history.push("/myCryptidList")
    }
    return (
        <Card color="secondary" className="addtrack_card">
            <CardBody>
                <p><strong>Track this cryptid?</strong></p>
                <p><small>(Confirm to store in 'Cryptid Tracker')</small></p>
                <br></br>
                <Button color="warning" onClick={handleAddTrack}>Confirm</Button>
                <Button color="danger" onClick={handleCancel}>Cancel</Button>
            </CardBody>
        </Card >
    );
};

export default AddTrackCryptid;