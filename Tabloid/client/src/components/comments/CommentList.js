import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CommentContext } from '../../providers/CommentProvider';
import { UserProfileContext } from '../../providers/UserProfileProvider';
import Comment from './CommentCard';

const CommentList = () => {
    const { comment, getCommentsByPostId, getCommentById } = useContext(CommentContext);
    const { currentUserId } = useContext(UserProfileContext);
    const { id } = useParams();


    useEffect(() => {
        if (!id) { //this if statement must be updated to include the route
            getCommentById(id);
        } else {
            getCommentsByPostId(id)
        }
    }, [id]);


    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="cards-column">
                    {comments.map((comment) => {
                        return <Comment key={comment.id} comment={comment} />;
                    })}
                </div>
            </div>
        </div>
    )
}

export default CommentList;