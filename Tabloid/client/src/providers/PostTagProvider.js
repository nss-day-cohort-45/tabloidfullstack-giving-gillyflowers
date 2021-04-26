import React, { useState, useContext } from 'react';
import { UserProfileContext } from './UserProfileProvider';

export const PostTagContext = React.createContext();

export const PostTagProvider = (props) => {
    const { getToken } = useContext(UserProfileContext); //every provider needs the token
    const [postTags, setPostTags] = useState([]);

    const getAllPostTagsByPostId = (postId) => {
        return getToken()
            .then((token) =>
                fetch(`/api/posttags/${postId}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            )
            .then((res) => res.json())
            .then((parsed) => {
                setPostTags(parsed)
                return parsed});
    };

    // This will delete all the old postTag entries and add all the current ones
    const updatePostTag = (tagIds, postId) => {
        return getToken().then((token) =>
            fetch(`/api/posttags/${postId}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(tagIds),
            }));
    };

    return (
        <PostTagContext.Provider
            value={{ postTags, setPostTags, getAllPostTagsByPostId, updatePostTag }}
        >
            {props.children}
        </PostTagContext.Provider>
    );
};