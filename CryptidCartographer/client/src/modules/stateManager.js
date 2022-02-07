const stateUrl = "/api/state";

export const getAllStates = () => {
    return fetch(stateUrl).then((res) => res.json());
};

export const getStateById = (stateId) => {
    return fetch(stateUrl + `/${stateId}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    }).then((res) => res.json());
};


