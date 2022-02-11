import React, {useState} from "react";
import { useHistory } from "react-router-dom"
import ReactDOM from "react-dom";
import usa from "@svg-maps/usa";
import { SVGMap } from "react-svg-map";
import { getCryptidByStateName } from "../../modules/cryptidManager";
import "./CryptidMap.css"

const CryptidMap = () => {

 const history = useHistory();


return <>
        <div className="map_container">
                <h3> Choose a location below to view cryptid sightings</h3>
                <SVGMap map={usa} onLocationClick={event => history.push(`/stateCryptidList/${event.target.ariaLabel}`)}/>   
        </div> 
       </>

}

export default CryptidMap;