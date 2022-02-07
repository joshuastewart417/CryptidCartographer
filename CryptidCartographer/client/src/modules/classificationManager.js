const classUrl = "/api/classification";

export const getAllClassifications = () => {
    return fetch(classUrl).then((res) => res.json());
};

export const createClassification = (classification) => {
    return fetch(classUrl, {
        method:"POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(classification)
    });
};

export const deleteClassification = (classification) => {
    return fetch(classUrl + `/${classification.id}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json"
        }
    });
};

export const updateClassification = (classification) => {
    return fetch(classUrl + `/${classification.id}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(classification)
    })
}

export const getClassById = (classId) => {
    return fetch(classUrl + `/${classId}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    }).then((res) => res.json());
};