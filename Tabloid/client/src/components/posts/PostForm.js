import React, { useState, useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { PostContext } from '../../providers/PostProvider';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { CategoryContext } from '../../providers/CategoryProvider';

export const PostForm = () => {
    const dateFormatter = (date) => {
        const [yyyymmdd, time] = date.split('T');
        return yyyymmdd;
    };

    const { categories, getAllCategories } = useContext(CategoryContext);
    const { addPost, getPostById, updatePost, uploadFile } = useContext(
        PostContext
    );
    const [imageLocation, setImageLocation] = useState('');
    const [categoryId, setCategoryId] = useState(1); // TODO: update this when we have categories
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [publishDateTime, setPublishDateTime] = useState(
        dateFormatter(new Date().toISOString())
    );
    const [currentPost, setCurrentPost] = useState();
    const [file, setFile] = useState();
    const [imageMethod, setImageMethod] = useState('upload');

    const history = useHistory();

    const { id } = useParams();

    useEffect(() => {
        setTitle('');
        setImageLocation('');
        setContent('');
        setCategoryId(1);
        setPublishDateTime(dateFormatter(new Date().toISOString()));
        setCurrentPost();
        if (id) {
            getPostById(id)
                .then(setCurrentPost)
                .then(() => {
                    if (imageLocation.startsWith('http')) {
                        setImageMethod('url');
                    }
                });
        }
    }, [id]);

    useEffect(() => {
        if (imageLocation.startsWith('http')) {
            setImageMethod('url');
        }
    }, [imageLocation]);

    useEffect(() => {
        if (currentPost) {
            setPublishDateTime(dateFormatter(currentPost.publishDateTime));
            setCategoryId(currentPost.categoryId);
            setImageLocation(currentPost.imageLocation);
            setTitle(currentPost.title);
            setContent(currentPost.content);
        }
    }, [currentPost]);

    useEffect(() => {
        getAllCategories();
    }, []);

    const clearForm = () => {
        setTitle('');
        setImageLocation('');
        setContent('');
        setCategoryId(1);
        setPublishDateTime(dateFormatter(new Date().toISOString()));
        setCurrentPost();
        history.push('/posts');
    };

    const handleClickSaveButton = (evt) => {
        if (imageMethod === 'upload') {
            if (!id) {
                handleUpload()
                    .then((imagePath) => {
                        const post = {
                            title,
                            content,
                            categoryId,
                            publishDateTime,
                        };
                        if (imagePath.length > 0) {
                            post.imageLocation = imagePath;
                        } else {
                            post.imageLocation = imageLocation;
                        }
                        addPost(post).then((p) => {
                            history.push('/posts');
                        });
                    })
                    .catch((error) => {
                        window.alert(error);
                    });
            } else {
                handleUpload()
                    .then((imagePath) => {
                        const newPost = { ...currentPost };
                        newPost.title = title;
                        newPost.categoryId = categoryId;
                        newPost.content = content;
                        newPost.publishDateTime = publishDateTime;
                        if (imagePath.length > 0) {
                            newPost.imageLocation = imagePath;
                        } else {
                            newPost.imageLocation = imageLocation;
                        }
                        updatePost(newPost).then(() => {
                            history.push(`/posts/${newPost.id}`);
                        });
                    })
                    .catch((error) => {
                        window.alert(error);
                    });
            }
        } else {
            if (!id) {
                const post = {
                    title,
                    content,
                    categoryId,
                    publishDateTime,
                    imageLocation,
                };
                addPost(post).then(() => {
                    history.push('/posts');
                });
            } else {
                const newPost = { ...currentPost };
                newPost.title = title;
                newPost.imageLocation = imageLocation;
                newPost.categoryId = categoryId;
                newPost.content = content;
                newPost.publishDateTime = publishDateTime;
                updatePost(newPost).then(() => {
                    history.push(`/posts/${newPost.id}`);
                });
            }
        }
    };

    const handleUpload = () => {
        if (file) {
            return uploadFile(file)
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    } else {
                        throw new Error('Image upload failed');
                    }
                })
                .then((parsed) => {
                    if (parsed) {
                        let [unused, path] = parsed.outputPath.split(
                            'public\\'
                        );
                        setImageLocation('..\\' + path);
                        return '..\\' + path;
                    }
                });
        }
    };

    return (
        <Form className="container col-md-6">
            <h2>{id ? 'Edit Post' : 'New Post'}</h2>
            <FormGroup>
                <Label for="title">Title</Label>
                <Input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Post Title"
                    autoComplete="off"
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                    value={title}
                />
            </FormGroup>
            <FormGroup style={{ display: 'flex', flexDirection: 'column' }}>
                <Label for="imageSelect">
                    Upload header image or add by URL?
                </Label>
                <select
                    style={{ width: '250px' }}
                    value={imageMethod}
                    onChange={(evt) => setImageMethod(evt.target.value)}
                >
                    <option value="upload">Upload image</option>
                    <option value="url">Add by URL</option>
                </select>
            </FormGroup>
            {imageMethod === 'upload' ? (
                <div style={{ backgroundColor: '#dddddd', padding: '6px' }}>
                    <FormGroup>
                        <Label for="file">Upload Header Image</Label>
                        <Input
                            type="file"
                            accept=".png, .jpg, .gif, .bmp"
                            name="file"
                            id="fileInput"
                            placeholder="Choose image to upload"
                            onChange={(evt) => {
                                if (evt.target.files.length > 0) {
                                    setFile(evt.target.files);
                                }
                            }}
                        />
                    </FormGroup>
                </div>
            ) : (
                <FormGroup
                    style={{ backgroundColor: '#dddddd', padding: '6px' }}
                >
                    <Label for="imageLocation">Image URL</Label>
                    <Input
                        type="text"
                        name="imageLocation"
                        id="imageLocation"
                        placeholder="Header Image URL"
                        autoComplete="off"
                        onChange={(e) => {
                            setImageLocation(e.target.value);
                        }}
                        value={imageLocation}
                    />
                </FormGroup>
            )}
            <FormGroup>
                <Label for="publishDateTime">Publication Date</Label>
                <Input
                    type="date"
                    name="publishDateTime"
                    id="publishDateTime"
                    onChange={(e) => {
                        setPublishDateTime(e.target.value);
                    }}
                    value={publishDateTime}
                />
            </FormGroup>
            <FormGroup>
                <Label for="categoryId">Category</Label>
                <Input
                    type="select"
                    name="categoryId"
                    id="categoryId"
                    value={categoryId}
                    onChange={(e) => {
                        setCategoryId(e.target.value);
                    }}
                >
                    <option value="1">Select A Category</option>
                    {categories.map((cat) => {
                        return (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        );
                    })}
                </Input>
            </FormGroup>
            <FormGroup>
                <Label for="content">Content</Label>
                <Input
                    type="textarea"
                    name="content"
                    id="content"
                    rows="10"
                    wrap="hard"
                    placeholder="Content"
                    autoComplete="off"
                    onChange={(e) => {
                        setContent(e.target.value);
                    }}
                    value={content}
                />
            </FormGroup>
            <Button onClick={handleClickSaveButton} color="success">
                Submit
            </Button>
            <Button
                onClick={clearForm}
                color="danger"
                style={{ marginLeft: '10px' }}
            >
                Cancel
            </Button>
        </Form>
    );
};
