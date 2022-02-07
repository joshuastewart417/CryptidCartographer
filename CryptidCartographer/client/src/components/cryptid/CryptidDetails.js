import React, { useState, useEffect } from "react";
import { Card, CardBody, CardImg, Button } from "reactstrap";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router";
import { getCryptidById } from "../../modules/cryptidManager";
// import { getCommentsByCryptidId } from "../../modules/commentManager";
// import {
//     addTrack,
//     deleteTrack
// } from "../../modules/trackManager";
// import { SubscribeButton } from "../Utils/SubscribeButton";

let userId = parseInt(localStorage.getItem("LoggedInUserId"))

const CryptidDetails = () => {
    const history = useHistory();
    const currentUser = localStorage.getItem("LoggedInUserId");
    const [cryptid, setCryptid] = useState([]);


    const { id } = useParams();

    const getCryptid = () => {
        getCryptidById(id).then((res) => {
            setCryptid(res);
        });
    };

    const handleDelete = () => {
        history.push(`/deleteCryptid/${cryptid.id}`);
    };

    const handleEdit = () => {
        history.push(`/editCryptid/${cryptid.id}`);
    };


    useEffect(() => {
        getCryptid();
    }, []);


    return (
        <Card>
            <CardImg src={cryptid?.imageUrl} />
           
                <h2>
                    {cryptid?.name}
                </h2>
           
            <CardBody>
            <div>
                <p>Description: {cryptid?.description}</p>
                <span>
                    Date Seen: {cryptid?.dateCreated?.split("T"[0]).shift()}
                </span>
                <span>
                    Witness: {cryptid?.user?.name}
                </span>
                <p>Location: {cryptid?.state?.name}</p>
            </div>
                <br></br>
            </CardBody>

            {userId === cryptid.userId ? (
                    <Button color="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                ) : ( <></> )}

            {userId === cryptid.userId ? (
                    <Button color="primary" onClick={handleEdit}>
                        Edit
                    </Button>
                ) : ( <></> )}

            {userId !== cryptid.userId ? (

            <Button className="mt-2" color="success" onClick={() => history.push(`../manageTags/${id}`)}>
                Track This Cryptid
            </Button>            
            ) : ( <></> )}

            <Button className="mt-2" color="success" onClick={() => history.push(`../newComment/${id}`)}>
                Add Comment
            </Button>
        </Card>
    );
};

export default CryptidDetails;
