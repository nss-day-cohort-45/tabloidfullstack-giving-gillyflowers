import React, { useContext, useEffect, useState } from "react";
import { Form, FormGroup, Card, CardBody, Label, Input, Button } from "reactstrap";
import { TagContext } from '../../providers/TagProvider';
import { useHistory } from "react-router-dom";

const TagForm = () => {
    const { addTag, getAllTags } = useContext(TagContext)

    // wait for data before button is active. Look at the button to see how it's setting itself to disabled or not based on this state
    // const [isLoading, setIsLoading] = useState(true);

    // Use this hook to allow us to programatically redirect users
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
        addTag({
            name: tag.name
        })
            // Calling two functions inside the anonymous .then function
            .then(() => {
                // Navigate the user back to the tags route
                history.push("/tags");
                getAllTags();
                setTag({
                    name: ""
                });
            })
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <Form className="postForm">
                    <h2 className="postForm__title">Add A Tag</h2>
                    <FormGroup>
                        <div className="form-group">
                            <Label htmlFor="postTitle">Name: </Label>
                            <Input type="text" id="name" required autoFocus className="form-control"
                                placeholder="Your future starts now... with the name of this tag."
                                onChange={handleControlledInputChange}
                                value={tag.name} />
                        </div>
                    </FormGroup>
                    <Button className="btn btn-primary"
                        // disabled={isLoading}
                        onClick={
                            event => {
                                event.preventDefault() // Prevent browser from submitting the form and refreshing the page
                                handleSavePost()
                            }}>Save</Button>
                </Form>
            </div>
        </div>
    )
}

export default TagForm;