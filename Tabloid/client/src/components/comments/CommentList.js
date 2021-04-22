import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CommentContext } from '../../providers/CommentProvider';
import { UserProfileContext } from '../../providers/UserProfileProvider';
import CommentCard from './CommentCard';

//this method could be in post details
//locations for selects
const CommentList = () => {
    const { comments, getAllCommentsByPostId, getCommentById } = useContext(CommentContext);
    const { currentUserId } = useContext(UserProfileContext);
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            getAllCommentsByPostId(id);
        }
    }, [id])


    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="cards-column" >
                    {
                        comments.length > 0 ?
                            (comments.map((comment) => {
                                return <CommentCard key={comment.id} comment={comment} />
                            })
                            ) : (
                                <span>No comments on this post.</span>
                            )
                    }
                </div>
            </div>
        </div>
    );
};

export default CommentList;

