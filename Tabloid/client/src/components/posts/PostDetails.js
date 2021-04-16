import React, { useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { PostContext } from '../../providers/PostProvider';

export const PostDetails = () => {
    const { id } = useParams();
    const [post, setPost] = useState();
    const { getPostById } = useContext(PostContext);
    const history = useHistory();

    useEffect(() => {
        getPostById(id).then(setPost);
    }, []);

    const handleDate = () => {
        let date = new Date(post.publishDateTime).toLocaleDateString('en-US');
        return date;
    };

    //think about asyn
    if (!post) {
        return null;
        // history.push("/posts");
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-sm-12 col-lg-6">
                    <img src={post.imageLocation} />
                    <h1>{post.title}</h1>
                    <div
                        className="post-byline"
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                        }}
                    >
                        <p>
                            <strong>Author:</strong>{' '}
                            {post.userProfile.displayName}
                        </p>
                        <p>
                            <strong>Publication Date:</strong> {handleDate()}
                        </p>
                        <p>
                            <p>
                                <strong>Category:</strong> {post.category.name}
                            </p>
                        </p>
                    </div>

                    <p>{post.content}</p>
                    {/* tags go here */}
                </div>
            </div>
        </div>
    );
};
