import React, {useContext, useEffect, useState} from "react"
import { CategoryContext } from "../../providers/CategoryProvider"
import Category from './CategoryCard'
import CategoryForm from './CategoryForm'
import NewCategoryForm from "./NewCategoryForm"
import { Col, Row, Container } from 'reactstrap';

const CategoryList = () => {
    const { categories, getAllCategories, updateCategory, addCategory} = useContext(CategoryContext);
    const [ catInEdit, setCatInEdit] = useState(0);
    useEffect(() => {

     getAllCategories();

    }, [categories]);

    
    //function passes id from category card in order to set state and render inline edit form
    const setEditId = (id) => {
        return setCatInEdit(id);
    };
    const setStateZero = () => {
        return setCatInEdit(0);
    }

    //function passes category object form category form in order to update and re-render
    const saveEdit = (categoryUpdate) => {
       return updateCategory(categoryUpdate)
                .then(setCatInEdit(0))
                .then(getAllCategories());
    }

    return (
        
        <Container>
        <Row>
        <Col xs="8" className="container">
            <div className="row justify-content-center">
                <div className="cards-column">
                  
                    <h1 style={{ textAlign: 'center' }}>Categories</h1>
                   
                    {categories.map((category) => {
                        
                           return  catInEdit == category.id?
                                <CategoryForm key={category.id} category={category} callSaveCat={saveEdit} resetState={setStateZero}/>
                                : <Category key={category.id}  callEdit={setEditId} category={category}/>
                           
                    })}
                </div>
            </div>
        </Col>
        <Col xs="4" className="container">
            <NewCategoryForm addNew={addCategory}/>
        </Col>
        </Row>
        </Container>
        
    )

}

export default CategoryList;