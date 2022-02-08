import React from "react";
import { Card, CardBody, Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import { deleteCryptid } from "../../modules/cryptidManager";
import { useParams } from "react-router-dom";


const DeleteCryptid = () => {

    const history = useHistory();
    const { id } = useParams();

    const handleCancel = () => {
        history.push("/myCryptidList")
    }

    const handleDelete = () => {
        deleteCryptid(id)
        history.push("/myCryptidList")
    }
    return (
        <Card>
            <CardBody>
                <p>Are you sure you want to delete this sighting? </p>
                <br></br>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button onClick={handleDelete}>Delete</Button>
            </CardBody>
        </Card >
    );
};

export default DeleteCryptid;