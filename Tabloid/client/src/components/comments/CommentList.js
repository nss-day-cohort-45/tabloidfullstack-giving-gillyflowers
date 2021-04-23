import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CommentContext } from '../../providers/CommentProvider';
import CommentCard from './CommentCard';

const CommentList = ({ commentState }) => {
    const { comments, getAllCommentsByPostId, getCommentById } = useContext(CommentContext);
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            getAllCommentsByPostId(id);
        }
    }, [id])


    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="cards-column" >
                    {
                        comments.length > 0 ?
                            (comments.map((comment) => {
                                return <CommentCard key={comment.id} comment={comment} commentState={commentState} />
                            })
                            ) : (
                                <span style={{ marginTop: "30px" }}>No comments on this post.</span>
                            )
                    }
                </div>
            </div>
        </div>
    );
};

export default CommentList;

