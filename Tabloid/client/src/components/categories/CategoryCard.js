import React, {useContext} from 'react'
import {useHistory} from 'react-router-dom'
import { Card, CardBody } from 'reactstrap';
import { CategoryContext } from '../../providers/CategoryProvider'


const Category = ({category}) => {

    const {/* deleteCategory,*/ getAllCategories} = useContext(CategoryContext);
    const history = useHistory();

/*
    const handleDelete = () => {
        if (window.confirm('Are you sure?')) {
            deletePost(category.id).then(getAllCategories);
            history.push('/categories');
        }
    };
*/
    const titleMargin = {
        margin: `10px`,
    };

    return (
        <Card className="m-4">
            <CardBody>
               
                <strong style={titleMargin}>{category.name}</strong>
               
                <i
                    className="fas fa-trash-alt fa text-right"
                    style={{ cursor: 'pointer' }}
                ></i>
                 <i
                    className="far fa-edit fa"
                    style={{ cursor: 'pointer' }}
                            onClick={() => {
                                history.push(`/Category/edit/${category.id}`);
                            }}
                    ></i>
            </CardBody>
        </Card>
    )

};

export default Category;
