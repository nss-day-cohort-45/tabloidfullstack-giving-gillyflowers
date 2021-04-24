import React, { useContext, useEffect, useState } from 'react';
import { Form, FormGroup, Card, CardBody, Label, Input, Button } from "reactstrap";
import { PostTagContext } from '../../providers/PostTagProvider';
import { TagContext } from '../../providers/TagProvider';
import { useHistory, useParams } from "react-router-dom";

const PostTagForm = () => {
    const { postTags, getAllPostTagsByPostId, updatePostTag } = useContext(PostTagContext)
    const { tags, getAllTags } = useContext(TagContext)

    const { postId } = useParams();
    const history = useHistory();

    useEffect(() => {
        getAllTags()
            .then(() => {
                getAllPostTagsByPostId(postId)
            })
    }, []);

    const handleSaveTags = () => {

        // https://www.techiedelight.com/retrieve-checked-checkboxes-values-javascript/
        var checkedBoxes = document.querySelectorAll('input[type="checkbox"]:checked');
        let arrayOfTagIds = Array.from(checkedBoxes).map(c => c.defaultValue);

        let tagIds = arrayOfTagIds.map(t => {
            return parseInt(t)
        })

        console.log(tagIds);

        updatePostTag(tagIds, parseInt(postId))
            .then(() => {
                tags.map(t => {
                    return t.checked = false
                })
            })
        history.push(`/posts/${postId}`)
    }


    return (
        <Form className="container col-md-6">
            <h2>Add tags to your post!</h2>

            {
                tags.map(t => {

                    postTags.find(pt => {
                        if (pt.tagId === t.id) {
                            return t.checked = true
                        }
                    })

                    if (t.checked) {
                        return <FormGroup key={t.id} check>
                            <Label check>
                                <Input type="checkbox" id={t.id} value={t.id} defaultChecked /> {t.name}
                            </Label>
                        </FormGroup>
                    } else {
                        return <FormGroup key={t.id} check>
                            <Label check>
                                <Input type="checkbox" id={t.id} value={t.id} /> {t.name}
                            </Label>
                        </FormGroup>
                    }
                })
            }
            <Button
                onClick={
                    event => {
                        event.preventDefault() // Prevent browser from submitting the form and refreshing the page
                        handleSaveTags()
                    }}>Save</Button>
            <Button
                onClick={
                    event => {
                        event.preventDefault()
                        history.push(`/posts/${postId}`)
                    }}>Cancel</Button>
        </Form>
    )
}

export default PostTagForm;