export const getPosts = () => {
    return fetch("http://localhost:8000/posts", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("rare_user_token")}`
        }
    })
        .then(response => response.json())
}

export const getPostById = (postId) => {
    return fetch(`http://localhost:8000/posts/${postId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("rare_user_token")}`
        }
    })
        .then(response => response.json())
}

export const getPostTags = (postId) => {
    return fetch(`http://localhost:8000/postTags/${postId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("rare_user_token")}`
        }
    })
        .then(response => response.json())
}

export const createPost = (post) => {
    return fetch("http://localhost:8000/posts", {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("rare_user_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    })
}


export const deletePost = (postId) => {
    return fetch(`http://localhost:8000/posts/${postId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("rare_user_token")}`
        }
    })
}

export const updatePost = post => {
    return fetch(`http://localhost:8000/posts/${post.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("rare_user_token")}`
        },
        body: JSON.stringify(post)
    })
}

export const approvePost = postId => {
    return fetch(`http://localhost:8000/posts/${postId}/approve`, {
        method: "PATCH",
        headers: {
            "Authorization": `Token ${localStorage.getItem("rare_user_token")}`
        }
    })
        .then(response => response.json())
}

export const fetchCurrentUser = () => {
    return fetch(`http://localhost:8000/authors/currentuser`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("rare_user_token")}`
        }
    })
        .then(response => response.json())
}
