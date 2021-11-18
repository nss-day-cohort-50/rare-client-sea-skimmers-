import React, { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router"
import { CategoryContext } from "../categories/CatProvider"
import { TagsContext } from "../tags/TagProvider"
import { HumanDate } from "../utils/HumanDate"
import "./posts.css"



export const CreatePost = () => {
    const [post, updatePost] = useState({
        category_id: 0,
        title: "",
        image_url: "",
        content: "",
        approved: 1
    })
    const history = useHistory()
    const { categories, getCategories } = useContext(CategoryContext)
    const { tags, getTags } = useContext(TagsContext)

    useEffect(() => {
        getCategories()
    }, [])

    const savePost = (event) => {
        event.preventDefault()

        const postData = {
            category_id: parseInt(post.category_id),
            title: post.title,
            publication_date: Date.now(),
            image_url: post.image_url,
            content: post.content,
            approved: post.approved
        }

        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postData)
        }

        return fetch(`http://localhost:8000/posts`, fetchOption)
            .then(() => { history.push("/")})
    }

    return (
        <>
                <div className="newPost_form">
                <h2>New Post</h2>
                    <form className="newPost">
                        <fieldset className="newPost_title">
                            <div className="form-group">
                                <input
                                    onChange = {
                                        (evt) => {
                                            const copy = {...post}
                                            copy.title = evt.target.value
                                            updatePost(copy)
                                        }
                                    }
                                    required autoFocus
                                    type="textarea"
                                    className="form-control"
                                    placeholder="Title"
                                />
                            </div>
                        </fieldset>
                        <fieldset className="newPost_image">
                            <div className="form-group">
                                <input
                                    onChange = {
                                        (evt) => {
                                            const copy = {...post}
                                            copy.image_url = evt.target.value
                                            updatePost(copy)
                                        }
                                    }
                                    required autoFocus
                                    type="textarea"
                                    className="form-control"
                                    placeholder="Image URL"
                                />
                            </div>
                        </fieldset>
                        <fieldset className="newPost_content">
                            <div className="form-group">
                                <input
                                    onChange = {
                                        (evt) => {
                                            const copy = {...post}
                                            copy.content = evt.target.value
                                            updatePost(copy)
                                        }
                                    }
                                    required autoFocus
                                    type="textarea"
                                    className="form-control"
                                    placeholder="Article Content"
                                />
                            </div>
                        </fieldset>
                        <fieldset className="newPost_category">
                                
                                <select name="categories" id="categories" 
                                    onChange = { (evt) => {
                                        const copy = {...post}
                                        copy.category_id = evt.target.value
                                        updatePost(copy)
                                    }
                                }>
                                    <option value={0} selected>Category Select</option>
                                    {
                                        categories.map((category) => {
                                            return <option value={category.id}>{category.label}</option>
                                        })
                                    }
                                </select>

                        </fieldset>
                        <fieldset className="newPost_tag">
                                    <p>tag checkboxes placeholder</p>
                        </fieldset>
                        <button className="newPost" onClick={savePost}>
                            Publish
                        </button>
                    </form>
                </div>
        </>
    )
}