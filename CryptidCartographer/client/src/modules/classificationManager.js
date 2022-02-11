const classUrl = "/api/classification";

export const getAllClassifications = () => {
    return fetch(classUrl).then((res) => res.json());
};

export const createClassification = (classification) => {
    return getToken().then((token) =>
    fetch(classUrl, {
        method:"POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
        },
        body: JSON.stringify(classification)
    }));
};

export const deleteClassification = (classification) => {
    return getToken().then((token) =>
    fetch(classUrl + `/${classification.id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json"
        }
    }));
};

export const updateClassification = (classification) => {
    return getToken().then((token) =>
    fetch(classUrl + `/${classification.id}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json"
        },
        body: JSON.stringify(classification)
    }));
};

export const getClassById = (classId) => {
    return getToken().then((token) =>
     fetch(classUrl + `/${classId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json"
        }
    }).then((res) => res.json()));
};