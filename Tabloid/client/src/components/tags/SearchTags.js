import React, {useState} from 'react';
import { Button,InputGroup, InputGroupAddon, Input } from 'reactstrap';

const TagSearchBar = () =>
{

    const [searchTerms, setSearchTerms] = useState([]);



   
   
    const handleControlledInputChange = (event) => {
        const newSearch = event.target.value.split(' ');
        setSearchTerms(newSearch);

    }
    
    //https://stackoverflow.com/questions/46700862/trying-to-prevent-duplicate-values-to-be-added-to-an-array/46700870
    // stack overflow for dismissing duplicates could be helpful
    const activateSearch = (searchTerms) => {
        console.log(searchTerms)
        for(let i = 0; i < searchTerms.length; i++)
        {
             console.log("searched", searchTerms[i]);
        }
    }

    return(
        <InputGroup>
        <InputGroupAddon addonType="prepend"><Button onClick={()=>{activateSearch(searchTerms)}} >Search</Button></InputGroupAddon>
        <Input placeholder="Enter Tag Name"
                name="tagSearch"
                id="tagSearch"
                onChange = {handleControlledInputChange}
                />
      </InputGroup>
    )

}

export default TagSearchBar;