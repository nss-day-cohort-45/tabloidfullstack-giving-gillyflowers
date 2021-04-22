import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from 'react-router-dom';
import { Button, Form, FormGroup, Input, Label, Card, CardBody } from 'reactstrap';
import { CommentContext } from "../../providers/CommentProvider";
import { PostContext } from '../../providers/PostProvider'

export const CommentForm = () => {
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');
    const [currentPost, setCurrentPost] = useState();
    const { getPostById } = useContext(PostContext);
    const { addComment } = useContext(CommentContext);

    const history = useHistory();

    const { id } = useParams();


    // //add use effect this is for editing a comment different issue ticket
    // useEffect(() => {
    //     setSubject('');
    //     setContent('');
    //     setCurrentPost();
    //     if (id) {
    //         getPostById(id).then(setCurrentPost);
    //     }
    // }, [id]);

    const handleClickSaveButton = (evt) => {
        if (!id) {
            const comment = {
                subject,
                content,
                postId: id,
            };
            addComment(comment).then((c) => {
                history.push('/comments');
            });
        }
    }

    //add click handle submit comment 
    return (
        <Form className="container col-md-6">
            <h2>Add New Comment</h2>
            <FormGroup>
                <Label for="subject">Subject</Label>
                <Input
                    type="text"
                    name="subject"
                    id="subject"
                    placeholder="Post subject"
                    autoComplete="off"
                    onChange={(e) => {
                        setSubject(e.target.value);
                    }}
                    value={subject}
                />
            </FormGroup>

            <FormGroup>
                <Label for="content">Content</Label>
                <Input
                    type="textarea"
                    name="content"
                    id="content"
                    placeholder="Comments go here"
                    autoComplete="off"
                    onChange={(e) => {
                        setContent(e.target.value);
                    }}
                    value={content}
                />
            </FormGroup>
            <Button onClick={handleClickSaveButton}> Submit</Button>
        </Form>
    );
};

export default CommentForm;