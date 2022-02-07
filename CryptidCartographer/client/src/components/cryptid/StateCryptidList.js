import React, { useEffect, useState } from "react";
import Cryptid from "./Cryptid";
import { getCryptidByStateName } from "../../modules/cryptidManager";
import { useParams } from "react-router-dom";


const StateCryptidList = () => {

    const [cryptids, setCryptids] = useState([]);

    const {stateName} = useParams();

    const getCryptids = (name) => {
        getCryptidByStateName(name).then(res => { 
            setCryptids(res)
        })
    };

    useEffect(() => {
        getCryptids(stateName);
    }, []);

    return (
        <>
            <h1> {stateName} Cryptid Sightings</h1>
            <div>
                {cryptids.map((cryptid) => <Cryptid cryptid={cryptid} key={cryptid.id} />)}
            </div>
        </>
    )
}

export default StateCryptidList;
