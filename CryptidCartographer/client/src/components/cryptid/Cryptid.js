import React from "react";
import { Card, CardBody, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "./Cryptid.css"

let userid = parseInt(localStorage.getItem("LoggedInUserId"))


const Cryptid = ({ cryptid }) => {


    const history = useHistory();

    const handleDelete = () => {
        history.push(`/deleteCryptid/${cryptid.id}`);
    };

    const handleEdit = () => {
        history.push(`/editCryptid/${cryptid.id}`);
    };

    const handleTrack = () => {
        
        history.push(`/addTrackCryptid/${cryptid.id}`);
    }


    return (
      <Card className="cryptid_card">
            <Link
                to={`/cryptid/${cryptid.id}`}
                style={{ textDecoration: "none", color: "black" }}
            >          
                <CardBody className="cryptid_cardbody">
                  <img className="cryptid_img" src={cryptid?.imageUrl} />
                    
                    <h4>{cryptid.name}</h4>
                   
                    <p>Seen: {cryptid?.dateCreated?.split("T"[0]).shift()}</p>
                </CardBody>
            </Link>   
            <div className="edit_deletebtn">    
                {userid === cryptid.userId ? (
                    <Button className="edit_btn" color="secondary" onClick={handleEdit}>
                        Edit
                    </Button>
                ) : (
                    <></>
                )}
                {userid === cryptid.userId ? (
                    <Button className="delete_btn" color="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                ) : (
                    <></>
                )}
            </div> 
            {userid !== cryptid.userId ? (
                <Button color="warning" onClick={handleTrack}>
                    Track
                </Button>
            ) : (
                <></>
            )}
                   
        </Card>
    );
};

export default Cryptid;