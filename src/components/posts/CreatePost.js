import React, { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router"
// import { CategoryContext } from "../categories/CatProvider"
import { TagsContext } from "../tags/TagProvider"
import { HumanDate } from "../utils/HumanDate"
import { createPost } from "./PostManager"
import "./posts.css"

export const PostForm = () => {
    const history = useHistory()
    const [categories, setCategories] = useState([])
    // const { getCategories } = useContext(CategoryContext)

    const getCategories = () => {
        return fetch(`http://localhost:8000/categories`,{
            headers: {"Authorization": `Token ${localStorage.getItem("rare_user_token")}`}
        })
        .then(res => res.json())
        .then((data) => setCategories(data))
    }

    const [currentPost, setCurrentPost] = useState({
        category: 0,
        title: "",
        image_url: "",
        content: "",
        approved: 1
    })

    useEffect(() => {
        getCategories()
    },
        [])

    const changePostState = (event) => {
        const newPostState = { ...currentPost }
        newPostState[event.target.name] = event.target.value
        setCurrentPost(newPostState)
    }

    return (
        <>
            <div className="newPost_form">
                <h2>New Post</h2>
                <form className="newPost">
                    <fieldset>
                        <label htmlFor="title">Title: </label>
                        <div className="form-group">
                            <input type="text" name="title" required autoFocus className="form-control"
                                value={currentPost.title}
                                onChange={changePostState}
                            />
                        </div>
                    </fieldset>
                    <fieldset className="newPost_content">
                        <label htmlFor="imageUrl">Image Url: </label>
                        <div className="form-group">
                            <input type="url" name="imageUrl" required autoFocus className="form-control"
                                value={currentPost.imageUrl}
                                onChange={changePostState}
                            />
                        </div>
                    </fieldset>
                    <fieldset className="newPost_category">

                        <div className="form-group">
                            <label htmlFor="categoryId">Category: </label>
                            <select name="category"
                                value={currentPost.category}
                                onChange={changePostState}>
                                    <option value="0">Choose a category!</option>
                                {
                                    categories.map(cat => <option value={cat.id}>{cat.label}</option>)
                                }
                            </select>
                        </div>
                    </fieldset>
                    <fieldset className="newPost_tag">
                        <p>tag checkboxes placeholder</p>
                    </fieldset>
                    <button type="submit"
                        onClick={evt => {
                            // Prevent form from being submitted
                            evt.preventDefault()

                            const post = {
                                category: parseInt(currentPost.category),
                                title: currentPost.title,
                                imageUrl: currentPost.imageUrl,
                                content: currentPost.content,
                                approved: 1
                            }

                            // Send POST request to your API
                            createPost(post)
                                .then(() => history.push("/posts"))
                        }}
                        className="btn btn-primary">Create</button>
                </form>
            </div>
        </>
    )
}

