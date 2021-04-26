import React, { useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { PostContext } from '../../providers/PostProvider';
import CommentList from '../comments/CommentList'
import CommentFormAdd from '../comments/CommentFormAdd'
import { UserProfileContext } from '../../providers/UserProfileProvider';
import { PostTagContext } from '../../providers/PostTagProvider';


export const PostDetails = () => {
    const { id, showComments } = useParams();
    const [post, setPost] = useState();
    const [isHiddenComment, setIsHiddenComment] = useState(!showComments);
    const [isHiddenAddNewComment, setIsHiddenAddNewComment] = useState(true);

    const { getPostById, deletePost } = useContext(PostContext);
    const { currentUserId } = useContext(UserProfileContext);
    const { postTags, getAllPostTagsByPostId } = useContext(PostTagContext);
    const history = useHistory();

    useEffect(() => {
        getPostById(id).then((parsed) => {
            if (parsed.id) {
                setPost(parsed)
                getAllPostTagsByPostId(parsed.id)
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
        if (isHiddenComment) {
            setIsHiddenComment(false);
        } else {
            setIsHiddenComment(true);
        }
    };

    //on click show the comments add a comment
    const HandleAddCommentOnClick = () => {
        if (isHiddenAddNewComment) {
            setIsHiddenAddNewComment(false);
        } else {
            setIsHiddenAddNewComment(true);
        }
    };


    return post ? (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-sm-6 col-lg-10">
                    <div className="text-center">
                        <img src={post.imageLocation} style={{ maxWidth: "800px", maxHeight: "600px" }}
                            className="rounded mx-auto d-block img-fluid" alt="random picture probably not relating to the post" />
                    </div>
                    <h1 style={{ textTransform: 'capitalize' }}>{post.title}</h1>
                    <div
                        className="post-byline col-lg-10"
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

                    <p style={{ whiteSpace: 'pre-line' }} >{post.content}</p>

                    {/*TAGS STUFF*/}
                    <div>
                        <h4>Tags</h4>
                        {
                            postTags.length > 0 ? postTags.map(t => t.tag.name).join(", ") : "No tags for this post at the moment."
                        }
                        {currentUserId === post.userProfileId ? (
                            <button className="btn btn-primary"
                                onClick={() => {
                                    history.push(`/posts/tags/${post.id}`);
                                }}>Manage Tags</button>
                        ) : null}
                    </div>
                    {/* Comments form and list live here */}
                    <div>
                        <button className="btn btn-primary m-4"
                            onClick={HandleCommentOnClick} >
                            {isHiddenComment ? "Show Comments" : "Hide Comments"}
                        </button>
                        <button className="btn btn-secondary m-5"
                            onClick={HandleAddCommentOnClick} >
                            {isHiddenAddNewComment ? "Add Comment" : "Hide Comment Form"}
                        </button>
                    </div>
                    <div>
                        {!isHiddenAddNewComment ? (< CommentFormAdd stateMethod={setIsHiddenComment} />) : null}
                    </div>
                    <div>
                        {!isHiddenComment ? (< CommentList commentState={setIsHiddenComment} />) : null}
                    </div>
                </div>
            </div>
        </div >
    ) : null;
};

