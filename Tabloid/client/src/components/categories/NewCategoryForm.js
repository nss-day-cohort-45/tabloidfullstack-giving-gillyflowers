import React, {  useState } from "react";
import { Button, Form, FormGroup, Input, Card, CardBody } from 'reactstrap';


export const NewCategoryForm = ({addNew}) => {


    const [ categoryToUpdate, setCategoryToUpdate] = useState({
      
        name: ""
    });
   
    const handleControlledInputChange = (event) => {
        const newCategory = { ...categoryToUpdate };
        newCategory[event.target.id] = event.target.value;
        setCategoryToUpdate(newCategory);
      };

    return (
        <Card>
        <CardBody>
            <h3>Add Category</h3>
           <Form>
               <FormGroup>
                <Input type="text"
                        name="name"
                        id="name"
                        placeholder = "Name of New Category"
                        autoComplete="off"
                        onChange = {handleControlledInputChange}
                        />
               </FormGroup>
               <Button style={{ cursor: 'pointer' }} 
                    onClick={() =>{addNew(categoryToUpdate)
                        .then(setCategoryToUpdate({
                            name:""
                        }))}}>
                    Save
                    </Button>
           </Form>
        </CardBody>
    </Card>
    )
}

export default NewCategoryForm;