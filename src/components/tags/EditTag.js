import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { TagsContext } from "./TagProvider"
import "./Tags.css"



export const EditTag = () => {
    const [tag, setTag] = useState({
        label: ""
    })
    const { editTag } = useContext(TagsContext)
    const { tagId } = useParams()
    const history = useHistory()

    useEffect( () => {
        fetch(`http://localhost:8088/tags/${tagId}`)
            .then(res => res.json())
            .then((data) => {setTag(data)})
    },[]
    )


    return (
        <>
            <section className="edit_tag">
                <div className="editTag_form">
                <h2>Edit Tag</h2>
                    <form className="editTag">
                        <fieldset>
                            <div className="form-group">
                                <input
                                    onChange = {
                                        (evt) => {
                                            const copy = {...tag}
                                            copy.label = evt.target.value
                                            setTag(copy)
                                        }
                                    }
                                    required autoFocus
                                    type="textarea"
                                    className="form-control"
                                    defaultValue={tag.label}
                                />
                            </div>
                        </fieldset>
                        <button className="editTag" onClick={() => { history.push("/tags") }}>
                            Cancel
                        </button>
                        <button className="updateTag" onClick={(event) => { event.preventDefault(); editTag(tagId, tag.label) }}>
                            Update
                        </button>
                    </form>
                </div>
            </section>
        </>
    )
}