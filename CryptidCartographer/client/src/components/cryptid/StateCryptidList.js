
import React, { useEffect, useState } from "react";
import Cryptid from "./Cryptid";
import { Table, Button } from "reactstrap";
import { getAllCryptids, getCryptidByStateId } from "../../modules/cryptidManager";
import { useHistory } from "react-router";

const StateCryptidList = () => {

    const history = useHistory();

    const [cryptids, setCryptids] = useState([]);

    // const getCryptids = (e) => {
    //     let stateId = e.target.value
    //     getCryptidByStateId().then((cryptids) => setCryptids(cryptids));
    // }
}
