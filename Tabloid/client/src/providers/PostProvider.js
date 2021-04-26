import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import { UserProfileContext } from './UserProfileProvider';

export const PostContext = React.createContext();

export const PostProvider = (props) => {
    const { getToken } = useContext(UserProfileContext); //every provider needs the token
    const [posts, setPosts] = useState([]);
    const [searchResults, setSearchResults] = useState([])
    let url = ""

    const history = useHistory();
    const getAllPosts = () => {
        return getToken()
            .then((token) =>
                fetch('/api/posts', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            )
            .then((res) => res.json())
            .then(setPosts);
    };

    const getPostById = (id) => {
        return getToken()
            .then((token) =>
                fetch(`/api/posts/${id}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            )
            .then((res) => res.json());
    };

    const getPostsByUserProfileId = (id) => {
        return getToken().then((token) =>
            fetch(`/api/posts/userprofileid/${id}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => res.json())
                .then(setPosts)
        );
    };

    const getPostByCategory = (categoryId) => {
        return getToken().then((token) => 
            fetch(`/api/posts/category/${categoryId}`,{
                method: 'GET',
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => res.json())
                .then(setPosts)
            );
    };


    const searchPostByTag = (terms) => {
        url = `/api/posts/search?q=`
        terms.forEach( (term, index) => {
            if(index > 0)
            {
                url += `+${term}`
            }
            else
            {
                url+=`${term}`
            } 
        }); 
        
        return getToken().then((token)=>{
            fetch(url,{
            method: "GET",
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => res.json())
            .then(setSearchResults)
            .then(() => {
                history.push('/searchResults')
            });
        })
    }

    const deletePost = (id) => {
        return getToken().then((token) =>
            fetch(`/api/posts/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
        );
    };

    const addPost = (post) => {
        return getToken().then((token) =>
            fetch('/api/posts', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(post),
            })
        );
    };

    const updatePost = (post) => {
        return getToken().then((token) =>
            fetch(`/api/posts/${post.id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(post),
            }).then((res) => {
                if (!res.ok) {
                    window.alert('You are unable to edit this post.');
                }
            })
        );
    };

  
    const uploadFile = (files) => {
        if (files.length === 0) {
            return;
        }

        let fileToUpload = files[0];
        const formData = new FormData();
        formData.append('file', fileToUpload, fileToUpload.name);

        return getToken().then((token) =>
            fetch('/api/upload', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            })
        );
    };

    return (
        <PostContext.Provider
            value={{
                posts,
                getAllPosts,
                getPostById,
                getPostsByUserProfileId,
                deletePost,
                addPost,
                updatePost,
                getPostByCategory,
                uploadFile,
                searchPostByTag,
                setSearchResults,
                searchResults
            }}
        >
            {props.children}
        </PostContext.Provider>
    );
};
