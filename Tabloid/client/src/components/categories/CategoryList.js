import React, {useContext, useEffect} from "react"
import { useParams } from "react-router-dom"
import { CategoryContext } from "../../providers/CategoryProvider"
import Category from './CategoryCard'

const CategoryList = () => {
    const { categories, getAllCategories} = useContext(CategoryContext);

    useEffect(() => {

        getAllCategories();

    }, []);



    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="cards-column">
                  
                    <h1 style={{ textAlign: 'center' }}>Categories</h1>
                   
                    {categories.map((category) => {
                        return <Category key={category.id} category={category} />;
                    })}
                </div>
            </div>
        </div>
    )

}

export default CategoryList;