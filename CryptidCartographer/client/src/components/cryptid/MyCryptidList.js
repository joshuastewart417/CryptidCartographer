import React, { useEffect, useState } from "react";
import Cryptid from "./Cryptid";
import { Button } from "reactstrap";
import { getCryptidSightingByUserId } from "../../modules/cryptidManager";
import { useHistory } from "react-router";


const MyCryptidList = () => {
    
    const [cryptids, setCryptids] = useState([]);

    const history = useHistory();

    const getCryptids = () => {
        let userId = parseInt(localStorage.getItem("LoggedInUserId"))
        getCryptidSightingByUserId(userId).then(res => {
            setCryptids(res);
        })
    };

    useEffect(() => {
        getCryptids();
    }, []);

    return (
        <>
            <h2>My Sightings</h2>

            <div className="container">
            <Button color="success" onClick={() => history.push("/addCryptid")}> Add Sighting</Button>
                <div className="row justify-content-center">
                    {cryptids.length > 0 ? cryptids.map((cryptid) => (
                        <Cryptid cryptid={cryptid} key={cryptid.id} />
                    )) : <h1>No cryptid sightings added</h1>}
                </div>
            </div>
        </>
    );
};

export default MyCryptidList;