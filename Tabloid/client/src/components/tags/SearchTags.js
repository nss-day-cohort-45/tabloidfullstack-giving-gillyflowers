import React, {useState, useContext} from 'react';
import {PostContext} from '../../providers/PostProvider';

import { Button,InputGroup, InputGroupAddon, Input } from 'reactstrap';

const TagSearchBar = () =>
{

    const [searchTerms, setSearchTerms] = useState([]);

    const { searchPostByTag } = useContext(PostContext);
    const textInput = document.querySelector("#tagSearch");
   
   
    const handleControlledInputChange = (event) => {
        const newSearch = event.target.value.split(' ');
        setSearchTerms(newSearch);

    }

  

    const activateSearch = () => {
        
        searchPostByTag(searchTerms)
        textInput.value = "";

    }

    return(
        <InputGroup>
        <InputGroupAddon addonType="prepend"><Button onClick={()=>{activateSearch()}} >Search</Button></InputGroupAddon>
        <Input placeholder="Enter Tag Name"
                autocomplete="off"
                name="tagSearch"
                id="tagSearch"
                onChange = {handleControlledInputChange}
                />
                
      </InputGroup>
    )

}

export default TagSearchBar;