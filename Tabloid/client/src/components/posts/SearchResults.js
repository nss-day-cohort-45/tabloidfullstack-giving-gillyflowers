import React, {useContext} from 'react';
import {PostContext} from '../../providers/PostProvider';
import Post  from './PostListCard';
import {Col} from 'reactstrap';




const SearchResults = () => {

const { searchResults } = useContext(PostContext);


return (
    <div className="container">
        <div className =" row justify-content-center">
            <Col xs="8">
                <h1>Search Results</h1>
                {searchResults.length > 0? searchResults.map( p =>  <Post key={p.id} post={p} />): null}
            </Col>   
        </div>
    </div>
)


}


export default SearchResults;