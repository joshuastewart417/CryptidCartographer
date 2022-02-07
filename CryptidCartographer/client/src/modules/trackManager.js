const trackUrl = "/api/track";


export const addTrack = (track) => {
    return fetch(trackUrl, {
        method:"POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(track)
    });
}

export const deleteTrack = (track) => {
    return fetch(trackUrl + `/${track.id}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json"
        }
    });
};

export const updateTrack = (track) => {
    return fetch(trackUrl + `/${track.id}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(track)
    })
}