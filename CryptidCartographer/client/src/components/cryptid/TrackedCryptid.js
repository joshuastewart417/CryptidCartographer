import React from "react";
import { Card, CardBody, CardImg} from "reactstrap";
import { Link } from "react-router-dom";


const TrackedCryptid = ({ cryptid }) => {

    return (
        <>
            <Card className="cryptid">
                <Link
                    to={`/cryptid/${cryptid.id}`}
                    style={{ textDecoration: "none", color: "black" }}
                >
                    <CardImg src={cryptid?.imageUrl} />
                    <CardBody>          
                        <p className="text-left px-2">
                            {cryptid?.name}
                        </p>
                        <p className="text-left px-2">
                            Witnessed by: {cryptid?.user?.name}
                        </p>
                            <br></br>
                    </CardBody>
                </Link>
            </Card>
        </>
    );
};

export default TrackedCryptid;