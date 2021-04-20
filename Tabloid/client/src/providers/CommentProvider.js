import React, { useState, useContext } from 'react';
import { UserProfileContext } from './UserProfileProvider';

export const CommentContext = React.createContext();

export const CommentProvider = (props) => {
    const { getToken } = useContext(UserProfileContext);
    const [comments, setComments] = useState([]);

    const getAllCommentsByPostId = (id) => {
        return getToken()
            .then((token) =>
                fetch(`/api/comments/byPost/${id}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            )
            .then((res) => res.json())
            .then(setComments);
    };


    const getCommentById = (id) => {
        return getToken()
            .then((token) =>
                fetch(`api/comments/${id}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            )
            .then((res) => res.json());
    };


    const addComment = (comment) => {
        return getToken().then((token) =>
            fetch('/api/comments', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(comment),
            })
        );
    };


    const updateComment = (comment) => {
        return getToken().then((token) =>
            fetch(`/api/comments/${comment.id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(comment),
            })
        );
    };


    const deleteComment = (id) => {
        return getToken().then((token) =>
            fetch(`/api/comments/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
        );
    };

    return (
        <CommentContext.Provider
            value={{
                comments,
                getAllCommentsByPostId,
                getCommentById,
                addComment,
                updateComment,
                deleteComment,
            }}
        >
            {props.children}
        </CommentContext.Provider>
    );
};