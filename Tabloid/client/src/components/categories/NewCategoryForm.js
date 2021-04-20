import React, {  useEffect, useState } from "react";
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

    const reset = () => {
        debugger
        setCategoryToUpdate({
            name:""
        })
    }

    return (
        <Card>
        <CardBody>
            <h3>Add Category</h3>
           <div >
               <fieldset>
                <Input type="text"
                        name="name"
                        id="name"
                        value={categoryToUpdate.name}
                        placeholder = "Name of New Category"
                        autoComplete="off"
                        onChange = {handleControlledInputChange}
                        />
               </fieldset>
               <Button style={{ cursor: 'pointer' }} 
                    onClick={() =>{
                        addNew(categoryToUpdate)
                            .then(reset)
                            }}>
                    Save
                    </Button>
           </div>
        </CardBody>
    </Card>
    )
}

export default NewCategoryForm;