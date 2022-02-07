import React, {useState} from "react";
import { Card, CardBody, CardImg, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

let userId = parseInt(localStorage.getItem("LoggedInUserId"))


const Cryptid = ({ cryptid }) => {
    const history = useHistory();

    const handleDelete = () => {
        history.push(`/deleteCryptid/${cryptid.id}`);
    };

    const handleEdit = () => {
        history.push(`/editCryptid/${cryptid.id}`);
    };


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
            {userId == cryptid.userId ? (
                <Button color="danger" onClick={handleDelete}>
                    Delete
                </Button>
            ) : (
                <></>
            )}
            {userId == cryptid.userId ? (
                <Button color="primary" onClick={handleEdit}>
                    Edit
                </Button>
            ) : (
                <></>
            )}
        </Card>
    );
};

export default Cryptid;