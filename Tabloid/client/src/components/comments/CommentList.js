import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CommentContext } from '../../providers/CommentProvider';
import { UserProfileContext } from '../../providers/UserProfileProvider';
import CommentCard from './CommentCard';

//this method could be in post details
//locations for selects
const CommentList = () => {
    const { comment, getCommentsByPostId, getCommentById } = useContext(CommentContext);
    const { currentUserId } = useContext(UserProfileContext);
    const [comments, setComments] = useState("");
    const { id } = useParams();


    // useEffect(() => {
    //     if (!id) { //this if statement must be updated to include the route
    //         getCommentById(id);
    //     } else {
    //         getCommentsByPostId(id)
    //     }
    // }, [id]);

    useEffect(() => {
        if (id) {
            comments = getCommentsByPostId(id);
        }
    }, [id])


    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="cards-column">
                    {comments.map((comment) => {
                        return <CommentCard key={comment.id} comment={comment} />;
                    })}
                </div>
            </div>
        </div>
    )
}

export default CommentList;