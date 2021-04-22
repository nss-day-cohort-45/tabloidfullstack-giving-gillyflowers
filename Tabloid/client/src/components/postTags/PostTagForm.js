// Need to get a list of all the tags, need to get a list of all the postTags associated with this post,
// need to check boxes depending on what thos lists reveal. 

import React, { useContext, useEffect, useState } from 'react';
import { Form, FormGroup, Card, CardBody, Label, Input, Button } from "reactstrap";
import { PostTagContext } from '../../providers/PostTagProvider';
import { TagContext } from '../../providers/TagProvider';
import { useHistory, useParams } from "react-router-dom";

const PostTagForm = () => {
    const { postTags, getAllPostTagsByPostId, addPostTag, deleteTag, setPostTags } = useContext(PostTagContext)
    const { tags, getAllTags } = useContext(TagContext)

    // Use this hook to allow us to programatically redirect users
    const { postId } = useParams();
    const history = useHistory();

    // const newPostTags = [...postTags]

    useEffect(() => {
        getAllTags()
            .then(() => {
                getAllPostTagsByPostId(postId)
            })
    }, [postId]);

    console.log(postId);
    console.log(tags);
    console.log(postTags);

    // //when field changes, update state. This causes a re-render and updates the view.
    // //Controlled component
    // const handleControlledInputChange = (event) => {
    //     //When changing a state object or array,
    //     //always create a copy make changes, and then set state.
    //     const newTag = { ...tag }
    //     //animal is an object with properties.
    //     //set the property to the new value
    //     newTag[event.target.id] = event.target.value
    //     //update state
    //     setTag(newTag)
    // }

    // // Need to delete all the current PostTags for the post and then
    // // This needs to map of the current array of postTags and save new objects for them
    // const handleSavePost = () => {
    //     if (tagId) {
    //         updateTag({
    //             id: parseInt(tagId),
    //             name: tag.name
    //         })
    //             .then(() => {
    //                 // Navigate the user back to the tags route
    //                 history.push("/tags");
    //                 getAllTags();
    //                 setTag({
    //                     name: ""
    //                 });
    //             })
    //     } else {
    //         addTag({
    //             name: tag.name
    //         })
    //             .then(() => {
    //                 history.push("/tags");
    //                 getAllTags();
    //                 setTag({
    //                     name: ""
    //                 });
    //             })
    //     }
    // }

    // useEffect(() => {
    //     if (tagId) {
    //         getTagById(tagId)
    //             .then(tag => {
    //                 setTag(tag)
    //             })
    //             .then(window.scrollTo(0, 0));
    //     } else {
    //         setTag({
    //             name: ""
    //         })
    //     }
    // }, [tagId])

    return (
        <Form className="container col-md-6">
            <h2>Add tags to your post!</h2>

            {
                tags.map((tag) => {
                    debugger
                    const pt.isChecked = postTags.map(pt => pt.tagId === tag.id)

                    if (pt.isChecked === true) {
                        return <FormGroup key={tag.id} check>
                <Label check>
                    <Input type="checkbox" checked /> {tag.name}
                </Label>
            </FormGroup>
                    } else {
                        return <FormGroup key={tag.id} check>
                <Label check>
                    <Input type="checkbox" /> {tag.name}
                </Label>
            </FormGroup>
                    }
                })
            }
            {/* <Button
                onClick={
                    event => {
                        event.preventDefault() // Prevent browser from submitting the form and refreshing the page
                        handleSavePost()
                    }}>Save</Button>
            <Button
                onClick={
                    event => {
                        event.preventDefault() // Prevent browser from submitting the form and refreshing the page
                        setTag({
                            name: ""
                        })
                        history.push("/tags");
                    }}>Cancel</Button> */}
        </Form>
    )
}

export default PostTagForm;