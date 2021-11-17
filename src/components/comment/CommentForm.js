import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { getCommentId, addComment  } from "./CommentManager"

export const CommentForm = ({ commentPostId }) => {
    const [comment, setCommentState] = useState({})
    const history = useHistory()
    const { commentId } = useParams()
    useEffect(() => {
        console.log('comment', comment)
    }, [comment]);

    const handleOnChange = (event) => {
        const copyComment = { ...comment }
        copyComment['postId'] = commentPostId
        copyComment[event.target.name] = event.target.value
        setCommentState(copyComment)
    }

    useEffect(() => {
        if (commentId) {
            getCommentId(commentId).then((commentData) => setCommentState({
            ...commentData,
            content: commentData.content,
            }))
        }
    }, [commentId])

    const saveComment = (event) => {
        event.preventDefault()

        addComment(comment).then(() => {
            history.push('/')
        })
    }

    // const updatecomment = (event) => {
    //     event.preventDefault()
    //     if(comment.)
    //     updatecommentFetch(comment).then(() => {
    //         history.push('/comments')
    //     })
    // }

    return (
        <form>
            <div>
                <label>Comment</label>
                <textarea type="text" name="content"  value={comment.content} onChange={(event) => handleOnChange(event)} rows='5' cols="80"/>
            </div>
            <div>
                <button onClick={(event) => {
                    if (commentId) {
                        // updatecomment(event)
                    } else {
                        saveComment(event)
                    }}
                }>Save comment</button>
            </div>
        </form>
    )
}
