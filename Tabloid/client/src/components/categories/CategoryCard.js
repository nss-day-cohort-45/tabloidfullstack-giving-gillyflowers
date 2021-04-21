import React, {useContext} from 'react'
import { Card, CardBody } from 'reactstrap';
import { CategoryContext } from '../../providers/CategoryProvider'


const Category = ({category, callEdit}) => {

    const { deleteCategory, getAllCategories} = useContext(CategoryContext);



    const handleDelete = () => {
       if ( category.id !== 1 && window.confirm('Are you sure?')) {
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
               
               {category.id === 1? <div></div>: <i
                    className="fas fa-trash-alt fa text-right"
                    style={{ cursor: 'pointer' }}
                        onClick={handleDelete}
                ></i>}
                 
                     {category.id === 1? <div></div>:
                        <i className="far fa-edit fa"
                    style={{ cursor: 'pointer' }}
                        onClick={() =>{callEdit(category.id)}}
                    ></i> }
            </CardBody>
        </Card>
    )

};

export default Category;
