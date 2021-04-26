import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Card, CardImg, CardBody } from 'reactstrap';
import { TagContext } from '../../providers/TagProvider';

const Tag = ({ tag }) => {
    const { deleteTag, getAllTags } = useContext(TagContext);
    const history = useHistory();

    const handleDelete = () => {
        if (window.confirm('Are you sure?')) {
            deleteTag(tag.id).then(getAllTags);
            history.push('/tags');
        }
    };

    return (
        <Card className="m-4">
            <CardBody>
                <p>
                    <strong>{tag.name}</strong>
                </p>
                <div style={{display: 'flex'}}>
                    <i
                        className="far fa-edit fa-2x mr-4"
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                            history.push(`/tags/${tag.id}`);
                        }}
                    ></i>
                    <i
                        className="fas fa-trash-alt fa-2x"
                        onClick={handleDelete}
                        style={{ cursor: 'pointer' }}
                    ></i>
                </div>
            </CardBody>
        </Card>
    );
};

export default Tag;
