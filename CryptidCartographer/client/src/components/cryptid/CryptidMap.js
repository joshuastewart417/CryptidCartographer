import React, {useState} from "react";
import { useHistory } from "react-router-dom"
import ReactDOM from "react-dom";
import usa from "@svg-maps/usa";
import { SVGMap } from "react-svg-map";
import { getCryptidByStateName } from "../../modules/cryptidManager";
import "react-svg-map/lib/index.css";

const CryptidMap = () => {

 const history = useHistory();


return <>
        <SVGMap map={usa} onLocationClick={event => history.push(`/stateCryptidList/${event.target.ariaLabel}`)}/>    
       </>

}

export default CryptidMap;