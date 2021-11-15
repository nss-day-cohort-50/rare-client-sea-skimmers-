import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router"
import { TagsContext } from "./TagProvider"


export const TagList = () => {
    const { tags, setTags, getTags, createTag, deleteTag } = useContext(TagsContext)
    const history = useHistory()

    useEffect(() => {
        getTags()
    }, [])

    return (
        <>
            <ul className="tag_list">
            {
                tags?.map((tag) => 
                    <li className="tag" key={tag?.id}>{tag?.label}
                        <button onClick={() => { deleteTag(tag.id) }}>Delete</button>
                        <button onClick={() => { history.push( `/tags/edit/${tag.id}`) }}>Edit</button>
                    </li>
                )
            }
            </ul>
        </>
    )
}