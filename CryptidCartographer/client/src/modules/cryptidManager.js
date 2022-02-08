const cryptidUrl = "/api/cryptid";

export const getAllCryptids = () => {
    return fetch(cryptidUrl).then((res) => res.json());
};

export const addCryptid = (cryptid) => {
    return fetch(cryptidUrl, {
        method:"POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(cryptid)
    });
};

export const deleteCryptid = (cryptid) => {
    return fetch(cryptidUrl + `/${cryptid}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json"
        },
    });
};

export const updateCryptid = (cryptid) => {
    return fetch(`${cryptidUrl}/${cryptid.id}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(cryptid)
    });
};

export const getCryptidById = (cryptidId) => {
    return fetch(cryptidUrl + `/${cryptidId}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    }).then((res) => res.json());
};

export const getCryptidByStateName = (stateName) => {
    return fetch(cryptidUrl + `/GetCryptidByStateName/${stateName}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    }).then((res) => res.json());
};

export const getCryptidByClassification = (classId) => {
    return fetch(cryptidUrl + `/GetCryptidByClassification/${classId}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    }).then((res) => res.json());
};

export const getCryptidSightingByUserId = (userId) => {
    return fetch(cryptidUrl + `/GetCryptidSightingByUserId/${userId}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    }).then((res) => res.json());
};

export const getAllUserTrackedCryptids = (trackId) => {
    return fetch(cryptidUrl + `/GetAllUserTrackedCryptids/${trackId}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    }).then((res) => res.json());
};

