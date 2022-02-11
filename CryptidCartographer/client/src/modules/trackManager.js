import { getToken } from "./authManager";

const trackUrl = "/api/track";

export const addTrack = (track) => {
    return getToken().then((token) =>
    fetch(trackUrl, {
        method:"POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
        },
        body: JSON.stringify(track)
    }));
};

export const deleteTrack = (track) => {
    return getToken().then((token) =>
    fetch(trackUrl, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json"
        },
        body: JSON.stringify(track)
    }));
};


export const updateTrack = (track) => {
    return getToken().then((token) =>
    fetch(trackUrl + `/${track.id}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json"
        },
        body: JSON.stringify(track)
    }));
};