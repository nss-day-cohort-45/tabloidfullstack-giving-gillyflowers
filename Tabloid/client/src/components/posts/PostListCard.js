import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Card, CardImg, CardBody } from 'reactstrap';
import { PostContext } from '../../providers/PostProvider';

const Post = ({ post }) => {
    const { deletePost, getAllPosts } = useContext(PostContext);
    const history = useHistory();

    const handleDelete = () => {
        if (window.confirm('Are you sure?')) {
            deletePost(post.id).then(getAllPosts);
            history.push('/posts');
        }
    };

    return (
        <Card className="m-4">
            <p className="text-left px-2">
                Posted by: {post.userProfile.displayName}
            </p>

            <CardBody>
                <p>
                    <Link to={`/posts/${post.id}`}>
                        <strong>{post.title}</strong>
                    </Link>
                </p>

                <p>Category: {post.category.name}</p>
                <Link to="/">Edit</Link>
                <i
                    className="fas fa-trash-alt fa-2x"
                    onClick={handleDelete}
                    style={{ cursor: 'pointer' }}
                ></i>
            </CardBody>
        </Card>
    );
};

export default Post;
