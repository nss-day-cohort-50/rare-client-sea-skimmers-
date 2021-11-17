import React, { useContext, useState } from "react"
import { TagsContext } from "./TagProvider"
import "./Tags.css"



export const CreateTag = () => {
    const [newTag, updateNewTag] = useState({
        label: ""
    })
    const { tags, setTags, getTags } = useContext(TagsContext)

    const saveNewTag = (event) => {
        event.preventDefault()

        const tagData = {
            label: newTag.label
        }

        const fetchOption = {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tagData)
        }

        return fetch(`http://localhost:8000/tags`, fetchOption)
            .then(() => {getTags()})
    }


    return (
        <>
                <div className="newTag_form">
                <h2>Create a new tag</h2>
                    <form className="newTag">
                        <fieldset>
                            <div className="form-group">
                                <input
                                    onChange = {
                                        (evt) => {
                                            const copy = {...newTag}
                                            copy.label = evt.target.value
                                            updateNewTag(copy)
                                        }
                                    }
                                    required autoFocus
                                    type="textarea"
                                    className="form-control"
                                    placeholder="Add text"
                                />
                            </div>
                        </fieldset>
                        <button className="newPost" onClick={saveNewTag}>
                            Create
                        </button>
                    </form>
                </div>
        </>
    )
}