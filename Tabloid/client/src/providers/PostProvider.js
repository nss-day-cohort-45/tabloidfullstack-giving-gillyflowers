import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const PostContext = React.createContext();

export const PostProvider = (props) => {
    const { getToken } = useContext(UserProfileContext); //every provider needs the token
    const [posts, setPosts] = useState([]);


    const getAllPosts = () => {
        return getToken()
            .then(token =>
                fetch("/api/posts", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }))
            .then((res) => res.json())
            .then(setPosts);
    }

    const getPostById = (id) => {
        return getToken()
            .then(token =>
                fetch(`/api/posts/${id}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }))
            .then((res) => res.json())
    }



    return (
        <PostContext.Provider value={{ posts, getAllPosts, getPostById }}>
            {props.children}
        </PostContext.Provider>
    );
};