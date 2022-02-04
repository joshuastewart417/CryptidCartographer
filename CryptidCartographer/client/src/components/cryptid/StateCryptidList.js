
import React, { useEffect, useState } from "react";
import Cryptid from "./Cryptid";
import { getAllCryptids, getCryptidByStateId } from "../../modules/cryptidManager";
import { useHistory } from "react-router";


const StateCryptidList = () => {

    const history = useHistory();

    let id= 42;


    const [cryptids, setCryptids] = useState([]);

    const getCryptids = () => {
        getCryptidByStateId(id).then(res => { 
            setCryptids(res);
        })
    };

    useEffect(() => {
        getCryptids();
        console.log(cryptids);
    }, []);

    return (
        <div>
            {cryptids.map((cryptid) => <Cryptid cryptid={cryptid} key={cryptid.id} />)}
        </div>
    )
}

export default StateCryptidList;
