export const getComments = () => {
    return fetch("http://localhost:8088/comments")
        .then(response => response.json())
}

export const getCommentId = (id) => {
    return fetch(`http://localhost:8088/comments/${id}`)
        .then(response => response.json())
}

export const addComment = comment => {
    return fetch("http://localhost:8088/comments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(comment)
    })
        .then(getComments)
}