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
        setCategoryToUpdate({
            name:""
        })
    }

    return (
        <Card>
        <CardBody>
            <h3>Add Category</h3>
           <div >
               <fieldset className="mb-2">
                <Input type="text"
                        name="name"
                        id="name"
                        value={categoryToUpdate.name}
                        placeholder = "Name of New Category"
                        autoComplete="off"
                        onChange = {handleControlledInputChange}
                        />
               </fieldset>
              {categoryToUpdate.name.replace(/ /g,'').length === 0? 
                    <Button disabled 
                        style={{ cursor: 'pointer' }} 
                        onClick={() =>{
                            addNew(categoryToUpdate)
                            .then(reset)
                        }}>
                    Save
                    </Button> 
                    : 
                    <Button active 
                        style={{ cursor: 'pointer' }} 
                        onClick={() =>{
                            addNew(categoryToUpdate)
                            .then(reset)
                        }}>
                    Save
                    </Button> }
           </div>
        </CardBody>
    </Card>
    )
}

export default NewCategoryForm;