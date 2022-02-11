import React from "react";
import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "./TrackedCryptid.css"

let userid = parseInt(localStorage.getItem("LoggedInUserId"))


const TrackedCryptid = ({ cryptid }) => {

    const history = useHistory();


    const handleRemoveTrack = () => {
        
        history.push(`/removeTrackCryptid/${cryptid.id}`);
    }

    return (
      <Card className="trackedcryptid_card">
            <Link
                to={`/cryptid/${cryptid.id}`}
                style={{ textDecoration: "none", color: "black" }}
            >      
                <CardBody className="trackedcryptid_cardbody">  
                   <div className="trackedimg_name">
                        <img className="trackedcryptid_img" src={cryptid?.imageUrl} />
                   </div>
                   <div className="trackedname_date_statestack">
                       <h4>{cryptid.name}</h4> 
                       <div className="trackeddate_seen">
                            <label htmlFor="date"><strong>Date Seen:</strong></label>
                            <p className="dateseen" name="date">{cryptid?.dateCreated?.split("T"[0]).shift()}</p>
                       </div>
                         
                        <div className="trackedstate_name">
                            <label htmlFor="state"><strong>State :</strong></label>
                            <p className = "stateseen" name="state">{cryptid?.state?.name}</p>
                        </div> 
                         
                   </div>     
                    
                </CardBody>
            </Link>   
            <Button className="removetracked_btn" color="danger" onClick={handleRemoveTrack}>
                    Remove
            </Button>            
        </Card>
    );
};

export default TrackedCryptid;