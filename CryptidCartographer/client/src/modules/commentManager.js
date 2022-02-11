const commentUrl = "api/comment";

export const getCommentByCryptidId = (cryptidId) => {
    return getToken().then((token) =>
    fetch(commentUrl + `/${cryptidId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json"
        }
    }).then((res) => res.json()));
};

export const addComment = (comment) => {
    return getToken().then((token) =>
    fetch(commentUrl, {
        method:"POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
        },
        body: JSON.stringify(comment)
    }));
};

export const deleteComment = (comment) => {
    return getToken().then((token) =>
    fetch(commentUrl + `/${comment.id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json"
        }
    }));
};

export const updateComment = (comment) => {
    return getToken().then((token) =>
    fetch(commentUrl + `/${comment.id}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json"
        },
        body: JSON.stringify(comment)
    }));
};