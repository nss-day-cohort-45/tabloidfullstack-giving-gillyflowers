import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody } from 'reactstrap';
import { PostTagContext } from '../../providers/PostTagProvider';


const Post = ({ post }) => {
    const { getAllPostTagsByPostId } = useContext(PostTagContext);

    const [postTags, setPostTags] = useState([]);

    useEffect(() =>{
        getAllPostTagsByPostId(post.id)
        .then(setPostTags);
    },[])


    return (
        <Card className="m-4" style={{ backgroundColor: '#dddddd' }}>
            <CardBody className="px-2">
                <h2>
                    <Link to={`/posts/${post.id}`}>
                        <strong style={{ textTransform: 'capitalize' }}>{post.title}</strong>
                    </Link>
                </h2>

                <p>Category: {post.category.name}</p>
              <p>
                Tags: { postTags.length > 0? postTags.map((t)=> t.tag.name ).join(", ") : "None"}
            </p>
            </CardBody>
        </Card>
    );
};

export default Post;
