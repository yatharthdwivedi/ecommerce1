import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const CategoryProduct = () => {

    const params = useParams()
    const [products,setProducts] = useState([])
    const [category,setCategory] = useState([])

    const getProductsByCat = async ()=>{
        try {
            const {data} = await axios.get(`http://localhost:8000/api/product/product-category/${params.slug}`)
            setProducts(data?.products)
            setCategory(data?.category)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        if(params?.slug) getProductsByCat()
    },[params?.slug])

  return (

    <Layout>
         <div className='container mt-3'>
         {/* <h1>hi</h1> */}
        <h1>{category?.name}</h1>
        <h1>{products?.length}  </h1>
    </div>
    </Layout>
   
  )
}

export default CategoryProduct