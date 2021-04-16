import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { PostContext } from "../../providers/PostProvider";

export const PostDetails = () => {
    const { id } = useParams();
    const [post, setPost] = useState({});
    const { getPostById } = useContext(PostContext);
    const history = useHistory();

    useEffect(() => {
        getPostById(id)
            .then(setPost)
    }, [])

    //think about asyn
    if (!post) {
        return null;
        // history.push("/posts");
    }


}