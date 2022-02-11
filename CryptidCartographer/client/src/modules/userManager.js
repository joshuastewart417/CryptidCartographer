import { getToken } from "./authManager";

const userUrl = "/api/user";

export const getAllUsers = () => {
    return fetch(userUrl).then((res) => res.json());
};

export const getUserByFireBaseUserId = (fireId) => {
    return getToken().then((token) =>
    fetch(userUrl + `/${fireId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    }).then((res) => res.json()));
}

export const getUserById = (id) => {
    return getToken().then((token) => 
    fetch(userUrl + `/GetUserById/${id}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json"
        }
    }).then((res) => res.json()));
};

export const addUser = (user) => {
    console.log(user)
    return getToken().then((token) => 
    fetch(userUrl, {
        method:"POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
        },
        body: JSON.stringify(user)
    }));
} 