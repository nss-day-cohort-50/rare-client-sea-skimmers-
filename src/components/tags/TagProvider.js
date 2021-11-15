import React, { useState, createContext } from "react"
import { useHistory } from "react-router"

// The context is imported and used by individual components that need data
export const TagsContext = createContext()

// This component establishes what data can be used.
export const TagsProvider = (props) => {
    const [tags, setTags] = useState([])
    const history = useHistory()

    const getTags = () => {
        return fetch(`http://localhost:8088/tags`)
        .then(res => res.json())
        .then(setTags)
    }

    const createTag = (label) => {

        const tagData = {
            label: label
        }

        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tagData)
        }

        return fetch(`http://localhost:8088`, fetchOption)
    }

    const editTag = (tagId, label) => {

        const fetchOption = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                label: label
            })
        }

        return fetch(`http://localhost:8088/tags/${tagId}`, fetchOption)
            .then(() => { history.push("/tags") })
    }

    const deleteTag = (id) => {

        return fetch(`http://localhost:8088/tags/${id}`, {
            method: "DELETE"
        })
        .then(getTags)

    }

    return (
        <TagsContext.Provider value={{
            tags, setTags, getTags, createTag, editTag, deleteTag
        }}>
            {props.children}
        </TagsContext.Provider>
    )
}
