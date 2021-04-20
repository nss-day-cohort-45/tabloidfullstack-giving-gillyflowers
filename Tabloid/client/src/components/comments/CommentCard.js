import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Card, CardImg, CardBody } from 'reactstrap';
import { CommentContext } from '../../providers/CommentProvider';

const CommentCard = ({ comment }) => {
    const { getAllCommentsByPostId } = useContext(CommentContext);
    const history = useHistory();

    return (
        <Card className="m-4">
            <CardBody>
                <p>
                    <strong>{comment.subject}</strong>
                    {comment.creationDate}
                    {comment.userProfile.displayName}
                </p>
                <p>
                    {comment.Content}
                </p>
            </CardBody>
        </Card>
    );
};

export default Comment;