import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody } from 'reactstrap';

const Post = ({ post }) => {
    return (
        <Card className="m-4" style={{ backgroundColor: '#dddddd' }}>
            <CardBody className="px-2">
                <h2>
                    <Link to={`/posts/${post.id}`}>
                        <strong>{post.title}</strong>
                    </Link>
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <p className="text-left">
                        <strong>Posted by: </strong>
                        {post.userProfile.displayName}
                    </p>
                    <p>
                        <strong>Category: </strong>
                        {post.category.name}
                    </p>
                </div>
            </CardBody>
        </Card>
    );
};

export default Post;
