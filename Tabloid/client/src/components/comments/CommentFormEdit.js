import React, { useState, useContext, useEffect } from "react";
import { useParams, useHistory } from 'react-router-dom';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { CommentContext } from "../../providers/CommentProvider";

export const CommentFormEdit = ({ stateMethod }) => {
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');
    const [currentComment, setCurrentComment] = useState({})
    const { getAllCommentsByPostId, getCommentById, updateComment } = useContext(CommentContext);

    const { id } = useParams(); //use for comment id


    // for editing comments
    // send comment id in the edit button
    useEffect(() => {
        getCommentById(id)
            .then(setCurrentComment)

    }, [id]);

    //to fill the edit form
    useEffect(() => {
        if (currentComment) {
            setSubject(currentComment.subject);
            setContent(currentComment.content);
        }
    }, [currentComment])


    //add click handle edit/update comment 
    const handleClickEditButton = (evt) => {

        const comment = {
            id: currentComment.id,
            subject,
            content,
            postId: currentComment.postId,
        }
        updateComment(comment).then((c) => {
            getAllCommentsByPostId(parseInt(currentComment.postId)).then(() => {
                setSubject('')
                setContent('')
                stateMethod(false)
            })
        });
    };

    return (
        <Form className="container col-md-6">
            <h2> Edit Comment </h2>
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
                    Edit
                    </Button>
                :
                <Button active
                    style={{ cursor: 'pointer' }}
                    onClick={handleClickEditButton}>
                    Edit
                </Button>
            }
        </Form>
    );
};

export default CommentFormEdit;