import React, { useContext, useState } from "react"
import { CategoryContext } from "./CatProvider"
import "./Categories.css"




export const CategoryForm = () => {
    const [newCategory, updateNewCategory] = useState({
        label: ""
    })
    const { categories, setCategories, getCategories } = useContext(CategoryContext)

    const saveNewCategory = (event) => {
        event.preventDefault()

        const categoryData = {
            label: newCategory.label
        }

        const fetchOption = {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(categoryData)
        }

        return fetch(`http://localhost:8000/categories`, fetchOption)
            .then(() => {
                getCategories()
            })
    }


    return (
        <>
                <div className="newCategory_form">
                <h2>Create a new category:</h2>
                    <form className="newCategory">
                        <fieldset>
                            <div className="form-group">
                                <input
                                    onChange = {
                                        (event) => {
                                            const copy = {...newCategory}
                                            copy.label = event.target.value
                                            updateNewCategory(copy)
                                        }
                                    }
                                    required autoFocus
                                    type="textarea"
                                    className="form-control"
                                    placeholder="Add text"
                                />
                            </div>
                        </fieldset>
                        <button className="newCategory" onClick={saveNewCategory}>
                            Create
                        </button>
                    </form>
                </div>
        </>
    )
}