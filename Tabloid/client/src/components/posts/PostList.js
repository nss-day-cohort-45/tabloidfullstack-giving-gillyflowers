import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PostContext } from '../../providers/PostProvider';
import { UserProfileContext } from '../../providers/UserProfileProvider';
import { CategoryContext } from '../../providers/CategoryProvider';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Post from './PostListCard';

const PostList = () => {
    const { getAllCategories, categories } = useContext(CategoryContext);
    const { posts, getAllPosts, getPostsByUserProfileId, getPostByCategory } = useContext(
        PostContext
    );
    const { currentUserId } = useContext(UserProfileContext);
    const { id } = useParams();

    useEffect(() => {
         getAllCategories();
        if (!id) {
            getAllPosts();
           
        } else {
            getPostsByUserProfileId(id);
            
        }
    }, [id]);

    return (
        <div className="container">
            <div className="row justify-content-center">
            <FormGroup>
                <Label for="categoryId">Search By Category</Label>
                <Input
                    type="select"
                    name="categoryId"
                    id="categoryId"
                    onChange={(e) => {
                        if(e.target.value === 0)
                        {
                            getAllPosts();
                        }
                        else{

                            getPostByCategory(e.target.value);
                        }
                    }}
                >
                    <option value="0">All Categories</option>
                    {categories.map((cat) => {
                        return (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        );
                    })}
                </Input>
            </FormGroup>
                <div className="cards-column">
                    {parseInt(id) === currentUserId ? (
                        <h1 style={{ textAlign: 'center' }}>My Posts</h1>
                    ) : null}
                    {posts.map((post) => {
                        return <Post key={post.id} post={post} />;
                    })}
                </div>
            </div>
        </div>
    );
};

export default PostList;
