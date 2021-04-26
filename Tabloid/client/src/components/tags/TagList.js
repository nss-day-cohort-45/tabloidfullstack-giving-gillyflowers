import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TagContext } from '../../providers/TagProvider';
import Tag from './TagListCard';

const TagList = () => {
    const { tags, getAllTags } = useContext(
        TagContext
    );

    useEffect(() => {
        getAllTags();
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="cards-column">
                    <h1 style={{ textAlign: 'center' }}>Tags</h1>
                    {tags.map((tag) => {
                        return <Tag key={tag.id} tag={tag} style={{width: '400px'}} />;
                    })}
                </div>
            </div>
        </div>
    );
};

export default TagList;