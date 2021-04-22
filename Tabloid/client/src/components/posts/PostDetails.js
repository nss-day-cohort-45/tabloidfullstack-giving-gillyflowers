import React, { useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { PostContext } from '../../providers/PostProvider';
import CommentList from '../comments/CommentList'
import { UserProfileContext } from '../../providers/UserProfileProvider';


export const PostDetails = () => {
    const { id } = useParams();
    const [post, setPost] = useState();
    const [isHidden, setIsHidden] = useState(true);
    const { getPostById, deletePost } = useContext(PostContext);
    const { currentUserId } = useContext(UserProfileContext);
    const history = useHistory();

    useEffect(() => {
        getPostById(id).then((parsed) => {
            if (parsed.id) {
                setPost(parsed);
            } else {
                history.push('/posts');
            }
        });
    }, []);

    const handleDelete = () => {
        if (window.confirm('Are you sure?')) {
            deletePost(post.id).then(() => {
                history.push(`/posts/userposts/${currentUserId}`);
            });
        }
    };

    const handleDate = () => {
        let date = new Date(post.publishDateTime).toLocaleDateString('en-US');
        return date;
    };

    //on click show the comments 
    const HandleCommentOnClick = () => {
        if (isHidden) {
            setIsHidden(false);
        } else {
            setIsHidden(true);
        }

    };

    return post ? (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-sm-12 col-lg-6">
                    <img src={post.imageLocation} />
                    <h1>{post.title}</h1>
                    <div
                        className="post-byline"
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                        }}
                    >
                        <p>
                            <strong>Author:</strong>{' '}
                            {post.userProfile.displayName}
                        </p>
                        <p>
                            <strong>Publication Date:</strong> {handleDate()}
                        </p>
                        <p>
                            <strong>Category:</strong> {post.category.name}
                        </p>
                        {currentUserId === post.userProfileId ? (
                            <>
                                <i
                                    className="fas fa-trash-alt fa-2x"
                                    onClick={handleDelete}
                                    style={{ cursor: 'pointer' }}
                                ></i>
                                <i
                                    className="far fa-edit fa-2x"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => {
                                        history.push(`/posts/edit/${post.id}`);
                                    }}
                                ></i>
                            </>
                        ) : null}
                    </div>
                    <p style={{whiteSpace: 'pre-line'}} >{post.content}</p>
                    {/* tags go here */}
                    <div>
                        <button className="btn btn-primary"
                            onClick={HandleCommentOnClick} >
                            {isHidden ? "Show Comments" : "Hide Comments"}
                        </button>
                        <button className="btn btn-secondary m-5"
                            onClick={ }>Add Comment</button>
                    </div>
                    <div>
                        {!isHidden ? (< CommentList />) : null}
                    </div>
                </div>
            </div>
        </div>
    ) : null;
};

