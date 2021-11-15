export const getComments = () => {
    return fetch("http://localhost:8000/comments")
        .then(response => response.json())
}

export const getCommentId = (id) => {
    return fetch(`http://localhost:8000/comments/${id}`)
        .then(response => response.json())
}

export const addComment = comment => {
    return fetch("http://localhost:8000/comments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(comment)
    })
        .then(getComments)
}