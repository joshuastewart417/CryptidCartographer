import React, { useEffect, useState } from "react";
import Cryptid from "../cryptid/Cryptid";
import { getCryptidByStateName } from "../../modules/cryptidManager";
import { useParams } from "react-router-dom";
import "../cryptid/Cryptid.css"


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
        <div className="statelist_container">
            <h1> {stateName} Cryptid Sightings</h1>
            <div className="statecard_container">
                {cryptids.map((cryptid) => <Cryptid cryptid={cryptid} key={cryptid.id} />)}
            </div>
        </div>
    )
}

export default StateCryptidList;
