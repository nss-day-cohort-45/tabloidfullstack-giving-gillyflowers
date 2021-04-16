import React, { useContext, useEffect } from "react";
import { PostContext } from "../../providers/PostProvider";
import Post from "./PostListCard";

const PostList = () => {
    const { posts, getAllPosts } = useContext(PostContext);

    useEffect(() => {
        getAllPosts();
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="cards-column">
                    {posts.map((post) => {
                        if (post.isApproved) {

                            return <Post key={post.id} post={post} />
                        }
                        else {
                            return null;
                        }
                    })}
                </div>
            </div>
        </div>
    );
};

export default PostList;