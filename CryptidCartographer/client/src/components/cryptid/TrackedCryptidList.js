import React, { useEffect, useState } from "react";
import { getAllUserTrackedCryptids } from "../../modules/cryptidManager";
import Cryptid from "./Cryptid";

const TrackedCryptidList = () => {
    const [cryptids, setCryptids] = useState([]);

    const currentUser = localStorage.getItem("LoggedInUserId")

    const getTrackedCryptids = () => {
        getAllUserTrackedCryptids(currentUser).then(setCryptids)
    };

    useEffect(() => {
        setTimeout(() => {
            getTrackedCryptids();
        }, 300)
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-center">
                {cryptids.length < 1 ? (
                    <div>
                        <h1 className="text-center">Tracked Cryptids</h1>
                        <h2>You aren't currently tracking any cryptids</h2>
                    </div>
                ) : (
                    <div>
                        <h1 className="text-center">Tracked Cryptids</h1>
                        {cryptids.map((cryptid) =>
                            <Cryptid cryptid={cryptid} key={cryptid.id} />)}
                    </div>
                )}
            </div>
        </div >
    );
};

export default TrackedCryptidList;

