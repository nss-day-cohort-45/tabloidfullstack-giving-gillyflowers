import React, { useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Card, CardTitle, CardImg, CardBody } from 'reactstrap';
import CardText from 'reactstrap/lib/CardText';
import { CommentContext } from '../../providers/CommentProvider';

const CommentCard = ({ comment }) => {
    const { getAllCommentsByPostId, deleteComment } = useContext(CommentContext);
    const history = useHistory();
    const { id } = useParams();

    const dateFormatter = (date) => {
        let format = new Date(date).toLocaleDateString('en-US');
        return format;
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure?')) {
            deleteComment(comment.id).then(getAllCommentsByPostId);
            history.push(`/post/${id}`);
        }
    };

    return (
        <Card className="m-4">
            <CardBody style={{ width: "35" }}>
                <div className="col-sm-15 col-lg-20">
                    <CardTitle tag="h5"><strong>{comment.subject}</strong> | {dateFormatter(comment.createDateTime)} | {comment.userProfile.displayName}
                        <i
                            className="fas fa-trash-alt float-right"
                            onClick={handleDelete}
                            style={{ cursor: 'pointer' }}
                        ></i>
                    </CardTitle>
                    <CardText>
                        {comment.content}
                    </CardText>
                </div>
            </CardBody>
        </Card>
    );
};

export default CommentCard;