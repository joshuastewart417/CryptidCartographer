import React, { useEffect, useState } from "react";
import { getAllUserTrackedCryptids } from "../../modules/cryptidManager";
// import Cryptid from "../cryptid/Cryptid";
import TrackedCryptid from "./TrackedCryptid";
import "../track/TrackedCryptid.css"

const TrackedCryptidList = () => {
    const [cryptids, setCryptids] = useState([]);

    const currentUser = localStorage.getItem("LoggedInUserId")

    const getTrackedCryptids = () => {
        getAllUserTrackedCryptids(currentUser).then(setCryptids)
    };

    useEffect(() => {
        
    getTrackedCryptids();
        
    }, []);

    return (
        <div className="mytracking_container">
            <h1>Tracked Cryptids</h1>

                <div className="mytrackinglist_container">
                    {cryptids.length < 1 ? (
                        <div className="notracked_message">
                            <h3>You aren't currently tracking any cryptids</h3>
                        </div>
                    ) : (
                        <div>   
                            {cryptids.map((cryptid) =>
                                <TrackedCryptid cryptid={cryptid} key={cryptid.id} />)}
                        </div>
                    )}
                </div>
        </div >
    );
};

export default TrackedCryptidList;

