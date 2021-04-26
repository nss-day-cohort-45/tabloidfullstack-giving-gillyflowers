import React, {  useState } from "react";
import { Button, Form, FormGroup, Input, Card, CardBody } from 'reactstrap';


export const CategoryForm = ({category, callSaveCat, resetState}) => {
    

    const [ categoryToUpdate, setCategoryToUpdate] = useState({
        id: category.id,
        name: category.name
    });
   
    const handleControlledInputChange = (event) => {
        const newCategory = { ...categoryToUpdate };
        newCategory[event.target.id] = event.target.value;
        setCategoryToUpdate();
      };

    return (
        <Card className="m-4">
        <CardBody>
           <Form>
               <FormGroup>
                <Input type="text"
                        name="name"
                        id="name"
                        placeholder = {category.name}
                        autoComplete="off"
                        onChange = {handleControlledInputChange}
                        />
               </FormGroup>
               
                  
               <Button style={{ cursor: 'pointer' }} 
                    onClick={() =>{callSaveCat(categoryToUpdate)}}>
                    Save
                    </Button>
                    
               <Button style={{ cursor: 'pointer' }} 
                    onClick={() =>{resetState(0)}}>
                    Cancel
                    </Button>
           </Form>
        </CardBody>
    </Card>
    )
}

export default CategoryForm;