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

    const updateCategory = () => {
        return getToken()
            .then((token) => 
                )
    }

    return (
        <CategoryContext.Provider
            value={{ categories, getAllCategories }}>
                {props.children}
            </CategoryContext.Provider>
    )


}
