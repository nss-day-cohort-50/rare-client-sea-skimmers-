import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { CategoryContext } from "./CatProvider"
import "./Categories.css"



export const EditCategory = () => {
    const [category, setCategory] = useState({
        label: ""
    })
    const { editCategory } = useContext(CategoryContext)
    const { categoryId } = useParams()
    const history = useHistory()

    useEffect( () => {
        fetch(`http://localhost:8000/categories/${categoryId}`)
            .then(res => res.json())
            .then((data) => {setCategory(data)})
    },[]
    )


    return (
        <>
            <section className="edit_category">
                <div className="editTag_form">
                <h2>Edit Tag</h2>
                    <form className="editCategory">
                        <fieldset>
                            <div className="form-group">
                                <input
                                    onChange = {
                                        (evt) => {
                                            const copy = {...category}
                                            copy.label = evt.target.value
                                            setCategory(copy)
                                        }
                                    }
                                    required autoFocus
                                    type="textarea"
                                    className="form-control"
                                    defaultValue={category.label}
                                />
                            </div>
                        </fieldset>
                        <button className="editCategory" onClick={() => { history.push("/categories") }}>
                            Cancel
                        </button>
                        <button className="updateCategory" onClick={(event) => { event.preventDefault(); editCategory(categoryId, category.label) }}>
                            Update
                        </button>
                    </form>
                </div>
            </section>
        </>
    )
}