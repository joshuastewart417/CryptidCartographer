const baseUrl = "/api/cryptid";

export const getAllCryptids = () => {
    return fetch(baseUrl).then((res) => res.json());
};

export const addCryptid = (cryptid) => {
    return fetch(baseUrl, {
        method:"POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(cryptid)
    });
}

export const deleteCryptid = (cryptid) => {
    return fetch(baseUrl + `/${cryptid.id}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json"
        }
    });
};

export const updateCryptid = (cryptid) => {
    return fetch(baseUrl + `/${cryptid.id}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(cryptid)
    })
}

export const getCryptidById = (cryptidId) => {
    return fetch(baseUrl + `/${cryptidId}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    }).then((res) => res.json());
};

export const getCryptidByStateId = (stateId) => {
    return fetch(baseUrl + `/GetCryptidByStateId/${stateId}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    }).then((res) => res.json());
};

export const getCryptidByClassification = (classId) => {
    return fetch(baseUrl + `/GetCryptidByClassification/${classId}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    }).then((res) => res.json());
};

export const getCryptidSightingByUserId = (userId) => {
    return fetch(baseUrl + `/GetCryptidSightingByUserId/${userId}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    }).then((res) => res.json());
};

export const getAllUserTrackedCryptids = (trackId) => {
    return fetch(baseUrl + `/GetAllUserTrackedCryptids/${trackId}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    }).then((res) => res.json());
};

