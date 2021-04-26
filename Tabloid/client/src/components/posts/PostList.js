import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PostContext } from '../../providers/PostProvider';
import { UserProfileContext } from '../../providers/UserProfileProvider';
import { CategoryContext } from '../../providers/CategoryProvider';
import SearchByCat from './SearchByCategory';
import Post from './PostListCard';
import { Row, Col } from 'reactstrap';

const PostList = () => {
    const {
        posts,
        getAllPosts,
        getPostsByUserProfileId,
        getPostByCategory,
    } = useContext(PostContext);
    const { categories, getAllCategories } = useContext(CategoryContext);
    const { currentUserId } = useContext(UserProfileContext);
    const { id } = useParams();

    useEffect(() => {
        if (!id) {
            getAllPosts();
            getAllCategories();
        } else {
            getPostsByUserProfileId(id);
        }
    }, [id]);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <Row>
                    <Col xs="4">
                        {!id ? (
                            <SearchByCat
                                getByCat={getPostByCategory}
                                cats={categories}
                            />
                        ) : (
                            <i></i>
                        )}
                    </Col>
                    <Col xs={!id ? '8' : '12'}>
                        <div className="cards-column">
                            {parseInt(id) === currentUserId ? (
                                <h1 style={{ textAlign: 'center' }}>
                                    My Posts
                                </h1>
                            ) : null}
                            {posts.length !== 0 ? (
                                posts.map((post) => {
                                    return <Post key={post.id} post={post} />;
                                })
                            ) : (
                                <h3> There Are No Posts Under This Category</h3>
                            )}
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default PostList;
