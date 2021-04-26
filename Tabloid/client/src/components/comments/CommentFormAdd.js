import React, { useState, useContext, useEffect } from "react";
import { useParams, useHistory } from 'react-router-dom';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { CommentContext } from "../../providers/CommentProvider";


export const CommentFormAdd = ({ stateMethod }) => {
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');
    const { addComment, getAllCommentsByPostId } = useContext(CommentContext);

    const { id } = useParams(); //post id

    //add click handle submit comment 
    const handleClickSaveButton = (evt) => {

        const comment = {
            subject,
            content,
            postId: id,
        }
        addComment(comment).then((c) => {
            getAllCommentsByPostId(id).then(() => {
                setSubject('')
                setContent('')
                stateMethod(false)
            })
        });
    };

    return (
        <Form className="container col-md-6">
            <h2> Add New Comment</h2>
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
            {subject.replace(/ /g, '').length === 0 ?
                <Button disabled
                    style={{ cursor: 'pointer' }}
                >
                    Save
                    </Button>
                :
                <Button active
                    style={{ cursor: 'pointer' }}
                    onClick={handleClickSaveButton}>
                    Save
                </Button>
            }
        </Form>
    );
};

export default CommentFormAdd;