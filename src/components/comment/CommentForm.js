import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { getComment, addComment, updateCommentFetch  } from "./CommentManager"

export const CommentForm = () => {
    const [comment, setCommentState] = useState({})
    const history = useHistory()
    const { commentId, postId } = useParams()
    
    useEffect(() => {
        console.log('comment', comment)
        console.log('commentId', commentId)
        console.log('postId', postId)

    }, [comment, commentId]);

    useEffect(() => {
        if (commentId) {
            getComment(commentId).then((commentData) => setCommentState({
            ...commentData,
            content: commentData.content,
            }))
        }
    }, [commentId])

    const handleOnChange = (event) => {
        const copyComment = { ...comment }
        copyComment['postId'] = postId
        copyComment[event.target.name] = event.target.value
        setCommentState(copyComment)
    }


    const saveComment = (event) => {
        event.preventDefault()

        addComment(comment).then(() => {
            history.push('/')
        })
    }

    const updateComment = (event) => {
        event.preventDefault()

        updateCommentFetch(comment).then(() => {
            history.push('/postList')
        })
    }

    return (
        <form>
            <div>
                <label>Comment</label>
                <textarea type="text" name="content"  value={comment.content} onChange={(event) => handleOnChange(event)} rows='5' cols="80"/>
            </div>
            <div>
                <button onClick={(event) => {
                    if (commentId) {
                        updateComment(event)
                    } else {
                        saveComment(event)
                    }}
                }>Save comment</button>
        </div>
        </form>
    )
}
