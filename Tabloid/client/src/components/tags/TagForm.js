import React, { useContext, useEffect, useState } from "react";
import { Form, FormGroup, Card, CardBody, Label, Input, Button } from "reactstrap";
import { TagContext } from '../../providers/TagProvider';
import { useHistory, useParams } from "react-router-dom";

const TagForm = () => {
    const { addTag, updateTag, getAllTags, getTagById } = useContext(TagContext)

    // Use this hook to allow us to programatically redirect users
    const { tagId } = useParams();
    const history = useHistory();

    const [tag, setTag] = useState({
        name: ""
    })

    //when field changes, update state. This causes a re-render and updates the view.
    //Controlled component
    const handleControlledInputChange = (event) => {
        //When changing a state object or array,
        //always create a copy make changes, and then set state.
        const newTag = { ...tag }
        //animal is an object with properties.
        //set the property to the new value
        newTag[event.target.id] = event.target.value
        //update state
        setTag(newTag)
    }

    const handleSavePost = () => {
        if (tagId) {
            updateTag({
                id: parseInt(tagId),
                name: tag.name
            })
                .then(() => {
                    // Navigate the user back to the tags route
                    history.push("/tags");
                    getAllTags();
                    setTag({
                        name: ""
                    });
                })
        } else {
            addTag({
                name: tag.name
            })
                .then(() => {
                    history.push("/tags");
                    getAllTags();
                    setTag({
                        name: ""
                    });
                })
        }
    }

    useEffect(() => {
        if (tagId) {
            getTagById(tagId)
                .then(tag => {
                    setTag(tag)
                })
                .then(window.scrollTo(0, 0));
        } else {
            setTag({
                name: ""
            })
        }
    }, [tagId])

    return (
        <Form className="container col-md-6">
            <h2>{tagId ? 'Edit Tag' : 'New Tag'}</h2>
            <FormGroup>
                <Label for="title">Name: </Label>
                <Input
                    type="text"
                    name="title"
                    id="name"
                    placeholder="Your future starts now... with the name of this tag."
                    autoComplete="off"
                    onChange={handleControlledInputChange}
                    value={tag.name} />
            </FormGroup>
            { tag.name !== "" ?
            <Button
                active
                onClick={
                    event => {
                        event.preventDefault() // Prevent browser from submitting the form and refreshing the page
                        handleSavePost()
                    }}>Save</Button>
                :
                <Button
                disabled
                onClick={
                    event => {
                        event.preventDefault() // Prevent browser from submitting the form and refreshing the page
                        handleSavePost()
                    }}>Save</Button> }
            <Button
                onClick={
                    event => {
                        event.preventDefault() // Prevent browser from submitting the form and refreshing the page
                        setTag({
                            name: ""
                        })
                        history.push("/tags");
                    }}>Cancel</Button>
        </Form>
    )
}

export default TagForm;