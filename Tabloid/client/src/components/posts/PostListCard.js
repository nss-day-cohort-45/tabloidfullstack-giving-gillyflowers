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
        <Card className="m-4">
            <p className="text-left px-2">
                Posted by: {post.userProfile.displayName}
            </p>

            <CardBody>
                <p>
                    <Link to={`/posts/${post.id}`}>
                        <strong style={{ textTransform: 'capitalize' }}>{post.title}</strong>
                    </Link>
                </p>

                <p>Category: {post.category.name}</p>
              <p>
                Tags: { postTags.length > 0? postTags.map((t)=> t.tag.name ).join(", ") : "None"}
            </p>
            </CardBody>
        </Card>
    );
};

export default Post;
