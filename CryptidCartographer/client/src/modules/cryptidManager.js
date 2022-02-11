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
    return getToken().then((token) =>
    fetch(cryptidUrl, {
        method:"POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
        },
        body: JSON.stringify(cryptid)
    }));
};

export const deleteCryptid = (cryptid) => {
    return getToken().then((token) =>
    fetch(cryptidUrl + `/${cryptid}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json"
        },
    }));
};

export const updateCryptid = (cryptid) => {
    return getToken().then((token) =>
    fetch(cryptidUrl, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json"
        },
        body: JSON.stringify(cryptid)
    }));
};

export const getCryptidById = (cryptidId) => {
    return getToken().then((token) =>
    fetch(cryptidUrl + `/${cryptidId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json"
        }
    }).then((res) => res.json()));
};

export const getCryptidByStateName = (stateName) => {
    return getToken().then((token) =>
    fetch(cryptidUrl + `/GetCryptidByStateName/${stateName}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json"
        }
    }).then((res) => res.json()));
};

export const getCryptidByClassification = (classId) => {
    return getToken().then((token) =>
    fetch(cryptidUrl + `/GetCryptidByClassification/${classId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json"
        }
    }).then((res) => res.json()));
};

export const getCryptidSightingByUserId = (userId) => {
    return getToken().then((token) =>
    fetch(cryptidUrl + `/GetCryptidSightingByUserId/${userId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json"
        }
    }).then((res) => res.json()));
};

export const getAllUserTrackedCryptids = (trackId) => {
    return getToken().then((token) =>
    fetch(cryptidUrl + `/GetAllUserTrackedCryptids/${trackId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json"
        }
    }).then((res) => res.json()));
};

export const getIsCryptidTrackedByUser = (userId, cryptidId) => {
    return getToken().then((token) =>
    fetch(
        `${cryptidUrl}/getIsCryptidTrackedByUser/?UserId=${userId}&CryptidId=${cryptidId}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    ).then((res) => {
        if (res.json().length > 0) {
            return true;
        } else return false;
    }));
};

