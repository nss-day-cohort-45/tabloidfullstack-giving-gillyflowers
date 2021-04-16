import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PostContext } from '../../providers/PostProvider';
import Post from './PostListCard';

const PostList = () => {
    const { posts, getAllPosts, getPostsByUserProfileId } = useContext(
        PostContext
    );
    const { id } = useParams();

    useEffect(() => {
        if (!id) {
            getAllPosts();
        } else {
            getPostsByUserProfileId(id);
        }
    }, [id]);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="cards-column">
                    {posts.map((post) => {
                        return <Post key={post.id} post={post} />;
                    })}
                </div>
            </div>
        </div>
    );
};

export default PostList;
