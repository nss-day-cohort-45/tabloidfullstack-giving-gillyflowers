import React, { useContext } from 'react';
import { Card, CardBody } from 'reactstrap';
import { CategoryContext } from '../../providers/CategoryProvider';

const Category = ({ category, callEdit }) => {
    const { deleteCategory, getAllCategories } = useContext(CategoryContext);

    const handleDelete = () => {
        if (category.id !== 1 && window.confirm('Are you sure?')) {
            deleteCategory(category.id).then(getAllCategories);
        }
    };

    const titleMargin = {
        margin: `10px`,
    };

    return (
        <Card className="m-4">
            <CardBody>
                <strong style={titleMargin}>{category.name}</strong>
                <div className="float-right">
                    {category.id === 1 ? (
                        <div></div>
                    ) : (
                        <i
                            className="far fa-edit fa-2x"
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                                callEdit(category.id);
                            }}
                        ></i>
                    )}
                    {category.id === 1 ? (
                        <div></div>
                    ) : (
                        <i
                            className="fas fa-trash-alt text-right fa-2x mx-3"
                            style={{ cursor: 'pointer' }}
                            onClick={handleDelete}
                        ></i>
                    )}{' '}
                </div>
            </CardBody>
        </Card>
    );
};

export default Category;
