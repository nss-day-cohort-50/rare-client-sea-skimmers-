import React from "react"
import { CreateTag } from "./NewTag"
import { TagList } from "./TagList"
import "./Tags.css"


export const Tags = () => {

    return (
        <>
            <article className="tag_manager">
                <section className="all_tags">
                    <TagList />
                </section>
                <section className="new_tag">
                    <CreateTag />
                </section>
            </article>
        </>
    )
}