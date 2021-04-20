import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Card, CardImg, CardBody } from 'reactstrap';
import { CommentContext } from '../../providers/CommentProvider';

const CommentCard = ({ comment }) => {
    const { getAllCommentsByPostId } = useContext(CommentContext);
    const history = useHistory();

    const dateFormatter = (date) => {
        let format = new Date(date).toLocaleDateString('en-US');
        return format;
    };

    return (
        <Card className="m-4">
            <CardBody>
                <p>
                    <strong>{comment.subject}</strong> | {dateFormatter(comment.createDateTime)} | {comment.userProfile.displayName}
                </p>
                <p>
                    {comment.content}
                </p>
            </CardBody>
        </Card>
    );
};

export default CommentCard;