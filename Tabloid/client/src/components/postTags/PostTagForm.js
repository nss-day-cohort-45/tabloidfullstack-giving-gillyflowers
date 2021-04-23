// Need to get a list of all the tags, need to get a list of all the postTags associated with this post,
// need to check boxes depending on what thos lists reveal. 

import React, { useContext, useEffect, useState } from 'react';
import { Form, FormGroup, Card, CardBody, Label, Input, Button } from "reactstrap";
import { PostTagContext } from '../../providers/PostTagProvider';
import { TagContext } from '../../providers/TagProvider';
import { useHistory, useParams } from "react-router-dom";

const PostTagForm = () => {
    const { postTags, getAllPostTagsByPostId, updatePostTag, setPostTags } = useContext(PostTagContext)
    const { tags, getAllTags, setTags } = useContext(TagContext)

    // Use this hook to allow us to programatically redirect users
    const { postId } = useParams();
    const history = useHistory();

    useEffect(() => {
        getAllTags()
            .then(() => {
                getAllPostTagsByPostId(postId)
            })
    }, []);

    console.log(postId);
    console.log(tags);
    console.log(postTags);

    // TO DO - Get the tags that are checked -> Make an array of checked tag objects to 
    // pass into updatePostTag()

    const handleInputChange = (event) => {
        console.log(event.target.id)
        console.log(event.target)
    }

    const handleSaveTags = () => {

        // https://www.techiedelight.com/retrieve-checked-checkboxes-values-javascript/

        var checkedBoxes = document.querySelectorAll('input[type="checkbox"]:checked');
        let arrayOfTagIds = Array.from(checkedBoxes).map(c => c.defaultValue);

        let tagIds = arrayOfTagIds.map(t => {
            return parseInt(t)
        })

        console.log(tagIds);

        updatePostTag(tagIds, parseInt(postId))
        setPostTags()
        // .then(() => {
        history.push(`/posts/${postId}`)
        // ------
        //  })
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
                                <Input type="checkbox" onChange={handleInputChange} id={t.id} value={t.id} defaultChecked /> {t.name}
                            </Label>
                        </FormGroup>
                    } else {
                        return <FormGroup key={t.id} check>
                            <Label check>
                                <Input type="checkbox" onChange={handleInputChange} id={t.id} value={t.id} /> {t.name}
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