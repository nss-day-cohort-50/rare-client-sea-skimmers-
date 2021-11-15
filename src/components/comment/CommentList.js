import React, { useState, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import { getComments } from "./CommentManager"
import "./Comment.css"

export const CommentList = () => {
    const [ comments, setComments ] = useState([])
    const history = useHistory()

    useEffect(
        () => {
        getComments()
        .then(commentData => setComments(commentData))
    }, [])

    return (
        <>
        <div style={{margin: "0rem 3rem"}}>
            <article className="post__title__comments">
                {
                    comments.map(comment => {
                        return <h1>{comment.post.title}</h1>
                    })
                }
            </article>

            <article className="comments">
                {
                    comments.map(comment => {
                        return <section className="comment" key={comment.id}>
                            <Link to={`/comments/${comment.id}`}>
                                <h3>{comment.content}</h3>
                            </Link>
                        </section>
                    })
                }
            </article>
        </div>
        </>
            
    )
}