import { getToken } from "./authManager";

const stateUrl = "/api/state";

export const getAllStates = () => {
    return  getToken().then((token) =>
    fetch(stateUrl, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json"
        }
    }).then((res) => res.json()));
};

export const getStateById = (stateId) => {
    return getToken().then((token) =>
    fetch(stateUrl + `/${stateId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json"
        }
    }).then((res) => res.json()));
};


