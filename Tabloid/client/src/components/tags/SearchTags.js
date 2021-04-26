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

  
    //https://stackoverflow.com/questions/46700862/trying-to-prevent-duplicate-values-to-be-added-to-an-array/46700870
    // stack overflow for dismissing duplicates could be helpful
    const activateSearch = () => {
        
        searchPostByTag(searchTerms)
        .then(textInput.value = "");
       

    }

    return(
        <InputGroup>
        <InputGroupAddon addonType="prepend"><Button onClick={()=>{activateSearch()}} >Search</Button></InputGroupAddon>
        <Input placeholder="Enter Tag Name"
                value={searchTerms}
                name="tagSearch"
                id="tagSearch"
                onChange = {handleControlledInputChange}
                />
                
      </InputGroup>
    )

}

export default TagSearchBar;