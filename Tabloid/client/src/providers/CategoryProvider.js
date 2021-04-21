import React,  { createContext, useContext, useState } from "react"
import { UserProfileContext } from "./UserProfileProvider"


export const CategoryContext = createContext();

export const CategoryProvider = (props) => {

    const { getToken } = useContext(UserProfileContext); //every provider needs the token
    const [categories, setCategories ] = useState([]);

    const getAllCategories = () => {
        return getToken()
            .then((token) =>
                fetch('/api/Category', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            )
            .then((res) => res.json())
            .then(setCategories);
    };

    const updateCategory = (category) => {
        return getToken()
            .then((token) => 
                fetch(`/api/Category/${category.id}`,{
                    method: `PUT`, 
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(category),
                })
            );
    };

    const addCategory = (category) => {
        return getToken()
            .then((token) => 
                fetch(`api/Category`,{
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(category),
                })
            );
    };

    return (
        <CategoryContext.Provider
            value={{ categories, getAllCategories, updateCategory, addCategory }}>
                {props.children}
            </CategoryContext.Provider>
    )


}
