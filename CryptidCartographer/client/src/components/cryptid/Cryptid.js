import React, {useEffect, useState} from "react";
import { Card, CardBody, CardImg, Button, Input } from "reactstrap";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { addTrack, deleteTrack } from "../../modules/trackManager"
import {getIsCryptidTrackedByUser} from "../../modules/cryptidManager"

let userid = parseInt(localStorage.getItem("LoggedInUserId"))


const Cryptid = ({ cryptid }) => {

    const [isChecked, setIsChecked] = useState(false);


    const history = useHistory();

    const handleDelete = () => {
        history.push(`/deleteCryptid/${cryptid.id}`);
    };

    const handleEdit = () => {
        history.push(`/editCryptid/${cryptid.id}`);
    };

    const handleIsChecked = () => {
        const newTrack = {
            userId: userid,
            cryptidId: cryptid.id
        }

        if (isChecked === false){  
           addTrack(newTrack)
           setIsChecked(true)
        } else {
            deleteTrack(newTrack)
            setIsChecked(false)
        }
    }

    // const isTracked = () => {
    //     const existingTrack = {
    //         userId: userid,
    //         cryptidId: cryptid.id
    //     }

    //     getIsCryptidTrackedByUser(existingTrack)
    //     .then(res => setIsChecked(res))    
    // }


    return (
      <Card className="cryptid">
            <Link
                to={`/cryptid/${cryptid.id}`}
                style={{ textDecoration: "none", color: "black" }}
            >
                <CardBody>
                  <CardImg src={cryptid?.imageUrl} />
                    <p>
                        <strong>{cryptid.name}</strong>
                    </p>
                    <p>Seen: {cryptid?.dateCreated?.split("T"[0]).shift()}</p>
                </CardBody>
            </Link>
            {userid == cryptid.userId ? (
                <Button color="danger" onClick={handleDelete}>
                    Delete
                </Button>
            ) : (
                <></>
            )}
            {userid == cryptid.userId ? (
                <Button color="primary" onClick={handleEdit}>
                    Edit
                </Button>
            ) : (
                <></>
            )}
            <Input type="checkbox" onChange={handleIsChecked} defaultChecked={setIsChecked}/>   
            <strong>Track This Cryptid</strong>   
        </Card>
    );
};

export default Cryptid;