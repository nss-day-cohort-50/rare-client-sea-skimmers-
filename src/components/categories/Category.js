import React, { useState, useEffect } from "react"
import { CategoryList } from "./CategoryList"
import { CategoryForm } from "./NewCategory"
import "./Categories.css"

export const Category = () => {
    return (
        <>
            <article className="category_manager">
                <section className="all_categories">
                    <CategoryList />
                </section>
                <section className="new_category">
                    <CategoryForm />
                </section>
            </article>
        </>
    )

}