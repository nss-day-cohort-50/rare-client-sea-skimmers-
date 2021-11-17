import React, { useState, createContext } from "react"
import { useHistory } from "react-router"

// The context is imported and used by individual components that need data
export const CategoryContext = createContext()

// This component establishes what data can be used.
export const CategoryProvider = (props) => {
    const [categories, setCategories] = useState([])
    const history = useHistory()

    const getCategories = () => {
        return fetch(`http://localhost:8000/categories`,{
            headers: {"Authorization": `Token ${localStorage.getItem("rare_user_token")}`}
        })
        .then(res => res.json())
        .then((data) => setCategories(data))
    }

    const createCategories = (label) => {

        const categoryData = {
            label: label
        }

        const fetchOption = {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(categoryData)
        }

        return fetch("http://localhost:8000/categories", fetchOption)
    }

    const editCategory = (categoryId, label) => {

        const fetchOption = {
            method: "PUT",
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                label: label
            })
        }

        return fetch(`http://localhost:8000/categories/${categoryId}`, fetchOption)
            .then(() => { history.push("/categories") })
    }

    const deleteCategory = (id) => {

        return fetch(`http://localhost:8000/categories/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_token")}`
            }
        })
        .then(getCategories)

    }

    return (
        <CategoryContext.Provider value={{
            categories, setCategories, getCategories, createCategories, editCategory, deleteCategory
        }}>
            {props.children}
        </CategoryContext.Provider>
    )
}
