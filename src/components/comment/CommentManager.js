// export const getComments = () => {
//     return fetch("http://localhost:8000/comments", {
//         headers:{
//             "Authorization": `Token ${localStorage.getItem("rare_user_token")}`
//         }
//     })
//     .then(response => response.json())
// }

export const getCommentId = (commentId) => {
    return fetch(`http://localhost:8000/comments/${ commentId }`)
        .then(response => response.json())
}

export const addComment = comment => {
    return fetch("http://localhost:8000/comments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("rare_user_token")}`
        },
        body: JSON.stringify(comment)
    })
}