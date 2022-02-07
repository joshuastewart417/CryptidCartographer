const userUrl = "/api/user";

export const getAllUsers = () => {
    return fetch(userUrl).then((res) => res.json());
};

export const getUserByFireBaseUserId = (fireId) => {
    return fetch(userUrl + `/${fireId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => res.json());
}

export const getUserById = (id) => {
    return fetch(userUrl + `/GetUserById/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => res.json());
}

export const addUser = (user) => {
    return fetch(userUrl, {
        method:"POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(user)
    });
} 