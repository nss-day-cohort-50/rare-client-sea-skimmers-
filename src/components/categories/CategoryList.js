import React, { useState, useEffect, useContext } from "react"
import { useHistory } from "react-router"
import { CategoryContext } from "./CatProvider"

export const CategoryList = () => {
    const {categories, setCategories, getCategories, deleteCategory, createCategories} = useContext(CategoryContext)
    const history = useHistory()
    useEffect(
        () => {
        getCategories()
    }, [])

    return (
        <>
        <div style={{margin: "0rem 3rem"}}>
            <article className="post__title__categories">
                {
                    categories.map(category => {
                        return <h2>
                            <button onClick={() => { history.push( `/categories/edit/${category.id}`) }}>Edit</button>
                            <button onClick={() => deleteCategory(category.id)}> Delete </button>
                            {category.label}
                            </h2>
                    })
                }
            </article>
        </div>
        </>
            
    )
}