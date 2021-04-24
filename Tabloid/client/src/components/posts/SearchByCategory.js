import React, { useContext } from 'react';
import {FormGroup, Label, Input } from 'reactstrap';
import { PostContext } from '../../providers/PostProvider';



const SearchByCat = ({getByCat, cats}) => {
   const { getAllPosts} = useContext(PostContext);
    
   return (

       <FormGroup>
                <Label for="categoryId">Search By Category</Label>
                <Input
                    type="select"
                    name="categoryId"
                    id="categoryId"
                    onChange={(e) => {
                        if(parseInt(e.target.value) === 0)
                        {
                            getAllPosts();
                          
                        }
                        else{
                            
                           getByCat(e.target.value);
                        }
                    }}
                    >
                    <option value="0">All Categories</option>
                    {cats.map((cat) => {
                        return (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        );
                    })}
                </Input>
            </FormGroup>
                 );
                };
export default SearchByCat;