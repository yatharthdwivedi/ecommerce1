import axios from "axios";
import { useEffect, useState } from "react";

export default function useCategory() {
    const [categories,setCategories] = useState([])

    const getCategories  = async ()=>{
        try {
            const {data} = axios.get('http://localhost:8000/api/category/categories')
            console.log(data);
            setCategories(data?.category)
        } catch (error) {
            console.log(error);
        }
    }


useEffect(()=>{
    getCategories()
},[])

return categories

}