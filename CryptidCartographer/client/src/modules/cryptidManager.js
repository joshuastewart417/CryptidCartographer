import { getToken } from "./authManager";

const cryptidUrl = "/api/cryptid";


export const getAllCryptids = () => {
    return getToken()
      .then(
        (token) =>
          fetch(cryptidUrl, {
            method: "GET",
            headers: { authorization: `bearer ${token}` },
          })
      )
      .then((res) => res.json());
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
    return fetch(cryptidUrl, {
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

export const getIsCryptidTrackedByUser = (userId, cryptidId) => {
    return fetch(
        `${cryptidUrl}/getIsCryptidTrackedByUser/?UserId=${userId}&CryptidId=${cryptidId}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    ).then((res) => {
        if (res.json().length > 0) {
            return true;
        } else return false;
    });
};

