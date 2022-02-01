import React from "react";
import ReactDOM from "react-dom";
import usa from "@svg-maps/usa";
import { SVGMap } from "react-svg-map";
import "react-svg-map/lib/index.css";

const CryptidMap = () => {

// const getCryptidsByState = (stateName) => {

// }

return <>
        <SVGMap map={usa} onLocationClick={event => console.log(event.target.ariaLabel)}/>    
       </>


}

export default CryptidMap;