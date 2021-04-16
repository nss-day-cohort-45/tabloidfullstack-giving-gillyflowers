import React from "react";
import { Card, CardImg, CardBody } from "reactstrap";

const Post = ({ post }) => {
    return (
        <Card className="m-4">
            <p className="text-left px-2">Posted by: {post.userProfile.displayName}</p>

            <CardBody>
                <p>
                    <strong>{post.title}</strong>
                </p>

                <p>Category: {post.category.name}</p>
            </CardBody>
        </Card>
    );
};

export default Post;