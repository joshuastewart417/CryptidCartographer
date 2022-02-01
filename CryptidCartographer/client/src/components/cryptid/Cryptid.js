import React, {useState} from "react";
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
    Button
  } from "reactstrap";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";


const Cryptid = ({ cryptid }) => {
    const history = useHistory();

    const [isChecked, setIsChecked] = useState(false);

    const handleDelete = () => {
        history.push(`/deleteCryptid/${cryptid.id}`);
    };

    const handleEdit = () => {
        history.push(`/editCryptid/${cryptid.id}`);
    };

    const handleIsChecked = () => {
        setIsChecked(!isChecked)
    }

    return (
        <>
      <Card className="cryptid">
        <CardImg
          top
          width="100%"
          src={cryptid.imageUrl}
          alt="cryptid_image"
        />
        <CardBody>
          <CardTitle>{cryptid.name}</CardTitle>
          <CardSubtitle>Sighting in {cryptid.state.name}</CardSubtitle>
          <CardText>
              {cryptid.description}
          </CardText>
          <CardSubtitle>
              Submitted by {cryptid.user.name}
          </CardSubtitle>
          <CardSubtitle>
              {cryptid.datecreated}
          </CardSubtitle>
          <Button onClick={handleEdit}>Edit</Button>
          <Button onClick={handleDelete}>Delete</Button>
          <div>
            <label>
                <input type="checkbox" id="track" name="track"
                    checked={isChecked}
                    onChange={handleIsChecked}
                />
                <span>Track Cryptid</span>
            </label>
          </div> 
        </CardBody>
      </Card>
    </>
    );
};

export default Cryptid;