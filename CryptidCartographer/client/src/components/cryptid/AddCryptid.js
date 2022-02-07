import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { addCryptid } from "../../modules/cryptidManager";
import { getUserById } from "../../modules/userManager";
import { getAllStates } from "../../modules/stateManager";


const AddCryptid = () => {
   
    const [stateList, setStateList] = useState([]);
    const [currentUserId, setCurrentUserId] = useState([]);
    
    const history = useHistory();

    const [cryptid, setCryptid] = useState({
        name: "",
        description: "",
        imageUrl: "",
        userId: localStorage.getItem("LoggedInUserId"),
        stateId: "",
    });

    const getLoggedInUser = () => {
        getUserById(currentUserId).then((res) => {
            const newCryptid = { ...cryptid };
            newCryptid["userId"] = res;
            setCryptid(newCryptid);
        });
    };

    const getStateList = () => {
        getAllStates().then((res) => setStateList(res))
    }


    const handleControlledInputChange = (event) => {
        const newCryptid = { ...cryptid };
        let selectedVal = event.target.value;
        newCryptid[event.target.id] = selectedVal;
        setCryptid(newCryptid);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        addCryptid(cryptid).then(() => history.push(`/userCryptidList`));
    };

    useEffect(() => {
        getStateList();
        setCurrentUserId(localStorage.getItem("LoggedInUserId"));
    }, []);

    useEffect(() => {
        getLoggedInUser();
    }, [currentUserId]);

    return (
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
                onClick={() => history.push(`/userCryptidList`)}
            >
                Cancel
            </button>
        </form>
    );
};

export default AddCryptid;