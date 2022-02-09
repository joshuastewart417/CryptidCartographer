import React, { useState, useEffect } from "react";
import {useHistory, useParams} from "react-router-dom";
import { getCryptidById, updateCryptid } from "../../modules/cryptidManager";
import { getAllStates } from "../../modules/stateManager";


const EditCryptid = () => {

    const [stateList, setStateList] = useState([]);
    const [cryptid, setCryptid] = useState({
        name: "",
        description: "",
        imageUrl: "",
        userId: localStorage.getItem("LoggedInUserId"),
        stateId: "",
    });

    const {id} = useParams();

    const history = useHistory();

    const getStateList = () => {
        getAllStates().then((res) => setStateList(res));
    };

    useEffect(() => {
        getStateList();
        getCryptidById(id).then(res => setCryptid(res))
        console.log(id)
    }, []);

    const handleControlledInputChange = (event) => {
        const newCryptid = {...cryptid};
        let selectedVal = event.target.value;
        newCryptid[event.target.id] = selectedVal;
        setCryptid(newCryptid);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        updateCryptid(cryptid).then(history.push(`/myCryptidList`))
    };

        return(
        
        <form className="main-content">
            <h2 className="_cryptidName">Add Sighting</h2>
                <fieldset className="fieldset">
                    <div className="form-group">
                        <label htmlFor="name">Cryptid Name:</label>
                        <input
                            type="text"
                            id="name"
                            onChange={handleControlledInputChange}
                            required
                            autoFocus
                            rows="6"
                            className="form-control"
                            value={cryptid.name}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                            <textarea
                                type="text"
                                id="description"
                                onChange={handleControlledInputChange}
                                required
                                autoFocus
                                className="form-control"
                                value={cryptid.description}
                            />
                    </div>
                    <div className="form-group">
                        <label htmlFor="image">Image Url:</label>
                        <input
                            type="text"
                            id="imageUrl"
                            onChange={handleControlledInputChange}
                            required
                            autoFocus
                            className="form-control"
                            value={cryptid.imageUrl}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="state">State Sighted</label>
                        <select
                            value={cryptid.stateId}
                            name="stateId"
                            id="stateId"
                            onChange={handleControlledInputChange}
                            className="form-control"
                        >
                            <option value="0">Select a State</option>
                            {stateList.map((s) => (
                                <option key={s.id} value={s.id}>
                                    {s.name}
                                </option>
                            ))}
                        </select>
                    </div>
            
                </fieldset>
                <button className="btn-add-save" onClick={handleSubmit}>
                    Submit
                </button>
                <button
                    className="btn-add-cancel"
                    onClick={() => history.push(`/myCryptidList`)}
                >
                    Cancel
                </button>
        </form>
    );
    
};

export default EditCryptid;
