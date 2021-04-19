import React, { useState, useContext, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { CategoryContext } from "../../providers/CategoryProvider";

export const CategoryForm = () => {

    const { updateCategory } = useContext(CategoryContext);

    const [currentCategory, setCurrentCategory] = useState();
    const [name, setName] = useState("");


    
}