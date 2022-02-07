const commentUrl = "api/comment";

export const getCommentByCryptidId = (cryptidId) => {
    return fetch(commentUrl + `/${cryptidId}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    }).then((res) => res.json());
};

export const addComment = (comment) => {
    return fetch(commentUrl, {
        method:"POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(comment)
    });
}

export const deleteComment = (comment) => {
    return fetch(commentUrl + `/${comment.id}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json"
        }
    });
};

export const updateComment = (comment) => {
    return fetch(commentUrl + `/${comment.id}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(comment)
    })
}