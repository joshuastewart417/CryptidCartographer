import React, { useEffect, useState } from "react";
import Cryptid from "./Cryptid";
import { getAllCryptids, getCryptidByStateName } from "../../modules/cryptidManager";
import { useParams } from "react-router-dom";


const StateCryptidList = () => {

    const [cryptids, setCryptids] = useState([]);

    const {stateName} = useParams();

    const getCryptids = (name) => {
        getCryptidByStateName(name).then(res => { 
            setCryptids(res);
        })
    };

    useEffect(() => {
        getCryptids(stateName);
        console.log(cryptids);
    }, []);

    return (
        <div>
            {cryptids.map((cryptid) => <Cryptid cryptid={cryptid} key={cryptid.id} />)}
        </div>
    )
}

export default StateCryptidList;
