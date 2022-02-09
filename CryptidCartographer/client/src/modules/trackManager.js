const trackUrl = "/api/track";


export const addTrack = (track) => {
   console.log(track)
    return fetch(trackUrl, {
        method:"POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(track)
    });
}

export const deleteTrack = (track) => {
    console.log(track)
    return fetch(trackUrl, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(track)
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