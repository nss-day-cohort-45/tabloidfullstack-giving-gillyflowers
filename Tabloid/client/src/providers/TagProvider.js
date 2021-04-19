import React, { useState, useContext } from 'react';
import { UserProfileContext } from './UserProfileProvider';

export const TagContext = React.createContext();

export const TagProvider = (props) => {
    const { getToken } = useContext(UserProfileContext); //every provider needs the token
    const [tags, setTags] = useState([]);

    const getAllTags = () => {
        return getToken()
            .then((token) =>
                fetch('/api/tags', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            )
            .then((res) => res.json())
            .then(setTags);
    };

    const getTagById = (id) => {
        return getToken()
            .then((token) =>
                fetch(`/api/tags/${id}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            )
            .then((res) => res.json());
    };

    const addTag = (tag) => {
        return getToken().then((token) =>
            fetch(`/api/tags`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(tag),
            }));
    };

    const updateTag = (tag) => {
        return getToken().then((token) =>
            fetch(`/api/tags/${tag.id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(tag),
            }));
    };

    const deleteTag = (tagId) => {
        return getToken().then((token) =>
            fetch(`/api/tags/${tagId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }));
    };

    return (
        <TagContext.Provider
            value={{ tags, getAllTags, getTagById, addTag, updateTag, deleteTag }}
        >
            {props.children}
        </TagContext.Provider>
    );
};