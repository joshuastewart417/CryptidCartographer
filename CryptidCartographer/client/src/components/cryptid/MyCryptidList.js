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
            <div className="mysighting_container">
                <h1>My Sightings</h1>

                <div className="mycryptidlist_container">
                <Button className="addsighting_btn" color="success" onClick={() => history.push("/addCryptid")}> Add Sighting</Button>
                    <div className="mycryptidcard_container">
                        {cryptids.length > 0 ? cryptids.map((cryptid) => (
                            <Cryptid cryptid={cryptid} key={cryptid.id} />
                        )) : 
                                <h3>No cryptid sightings added</h3>}
                    </div>
                </div>
            </div>

        </>
    );
};

export default MyCryptidList;