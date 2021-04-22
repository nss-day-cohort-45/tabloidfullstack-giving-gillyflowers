import React, { useState, useContext } from 'react';
import { UserProfileContext } from './UserProfileProvider';

export const PostTagContext = React.createContext();

export const PostTagProvider = (props) => {
    const { getToken } = useContext(UserProfileContext); //every provider needs the token
    const [postTags, setPostTags] = useState([]);

    const getAllPostTagsByPostId = (postId) => {
        return getToken()
            .then((token) =>
                fetch(`/api/PostTags/${postId}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            )
            .then((res) => res.json())
            .then(setPostTags);
    };

    const addPostTag = (postTag) => {
        return getToken().then((token) =>
            fetch(`/api/posttags`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postTag),
            }));
    };

    const deletePostTag = (postId) => {
        return getToken().then((token) =>
            fetch(`/api/posttags/${postId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }));
    };

    return (
        <PostTagContext.Provider
            value={{ postTags, setPostTags, getAllPostTagsByPostId, addPostTag, deletePostTag }}
        >
            {props.children}
        </PostTagContext.Provider>
    );
};