// export const getComments = () => {
//     return fetch("http://localhost:8000/comments", {
//         headers:{
//             "Authorization": `Token ${localStorage.getItem("rare_user_token")}`
//         }
//     })
//     .then(response => response.json())
// }

export const getComment = (commentId) => {
    return fetch(`http://localhost:8000/comments/${commentId}`, {
      headers: {
        "Authorization": `Token ${localStorage.getItem("rare_user_token")}`
      }
    })
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

export const updateCommentFetch = (comment) => {
    return fetch(`http://localhost:8000/comments/${comment.id}`, {
      method: "PUT",
      headers: {
        "Authorization": `Token ${localStorage.getItem("rare_user_token")}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(comment)
     })
        
  }
  