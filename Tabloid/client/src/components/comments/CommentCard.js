import React, { useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Card, CardTitle, CardBody } from 'reactstrap';
import CardText from 'reactstrap/lib/CardText';
import { CommentContext } from '../../providers/CommentProvider';

const CommentCard = ({ comment, commentState }) => {
    const { getAllCommentsByPostId, deleteComment } = useContext(CommentContext);
    const history = useHistory();
    const { id } = useParams();

    const dateFormatter = (date) => {
        let format = new Date(date).toLocaleDateString('en-US');
        return format;
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this comment?')) {
            deleteComment(comment.id).then(() => getAllCommentsByPostId(id));
            commentState(false);
            history.push(`/posts/${id}`);
        }
    };

    //change the route to have the comment id in route
    //instead of the post id
    const handleEdit = (comment) => {

    };

    return (
        <Card className="m-4">
            <CardBody style={{ width: "35em" }}>
                <CardTitle tag="h5"><strong>{comment.subject}</strong> | {dateFormatter(comment.createDateTime)} | {comment.userProfile.displayName}
                    <i
                        className="fas fa-trash-alt float-right"
                        onClick={handleDelete}
                        style={{ cursor: 'pointer' }}
                    ></i>
                    <i
                        className="fas fa-edit float-right "
                        // onClick={handleEdit}
                        style={{ cursor: 'pointer' }}
                    ></i>
                </CardTitle>
                <CardText>
                    {comment.content}
                </CardText>
            </CardBody>
        </Card>
    );
};

export default CommentCard;