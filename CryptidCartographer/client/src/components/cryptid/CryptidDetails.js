import React, { useState, useEffect } from "react";
import { Card, CardBody, Button } from "reactstrap";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router";
import { getCryptidById } from "../../modules/cryptidManager";
import "./Cryptid.css"


let userId = parseInt(localStorage.getItem("LoggedInUserId"))

const CryptidDetails = () => {
    const history = useHistory();
    const [cryptid, setCryptid] = useState([]);


    const { id } = useParams();

    const getCryptid = () => {
        getCryptidById(id).then((res) => {
            setCryptid(res);
        });
    };


    useEffect(() => {
        getCryptid();
    }, []);


    return (
        <Card className="cryptiddetail_container">
            <img className="cryptid_detailimg" src={cryptid?.imageUrl} />
           
                <h4>
                    {cryptid?.name}
                </h4>
           
            <CardBody className="detail_cardbody">
                <div>
                    <p>Description: {cryptid?.description}</p>
                </div>
                <div className="detailtext_stack">
                       <div className="detailuser_name">
                            <label htmlFor="username"><strong>Witness:</strong></label>
                            <p className="detailusername" name="username">{cryptid?.user?.name}</p>
                       </div>
                       <div className="detaildate_seen">
                            <label htmlFor="date"><strong>Date Seen:</strong></label>
                            <p className="detaildateseen" name="date">{cryptid?.dateCreated?.split("T"[0]).shift()}</p>
                       </div>
                         
                        <div className="detailstate_seen">
                            <label htmlFor="state"><strong>State :</strong></label>
                            <p className = "detailstateseen" name="state">{cryptid?.state?.name}</p>
                        </div> 
                         
                </div> 
                    <br></br>
            </CardBody>
            <Button className="mt-2" color="secondary" onClick={() => history.goBack()}>
                Back
            </Button>            

        </Card>
    );
};

export default CryptidDetails;
