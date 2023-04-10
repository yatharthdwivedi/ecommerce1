import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const ProductDetails = () => {

    const navigate = useNavigate()

    const params = useParams()
    const [product,setProduct] = useState({})
    const [related, setRelated] = useState([])

    const getProduct = async()=> {
        try {
            const {data} = await axios.get(`http://localhost:8000/api/product/get-product/${params.slug}`)
            console.log(data);
            setProduct(data?.product)
            getSimilar(data?.product._id, data?.product.category._id)
        } catch (error) {
            console.log(error);
        }
    }

    const getSimilar = async(pid,cid) =>{
        try {
            const {data} = await axios.get(`http://localhost:8000/api/product/similar-product/${pid}/${cid}`)
            setRelated(data?.products)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        // if(params?.slug)
        getProduct()
    },[params?.slug])

  return (
    <Layout>
       <div className='container'>
       <div className='row mt-2'>
            <div className='col-md-6'>
            <img
                  src={`http://localhost:8000/api/product/product-photo/${product._id}`}
                  className="card-img-top"
                  alt={product.name}
                />
            </div>
            <div className='col-md-6 text-center'>
                <h2>Product Details</h2>
                <h4>{product.name}</h4>
                <h4>{product.description}</h4>
                <h4>{product.price}</h4>
                <h4>{product.category?.name}</h4>
                <button className="btn btn-secondary ms-1">
                    ADD TO CART
                  </button>
            </div>
        </div>
        <hr/>
        <div className='row'>
            <h2>Similar</h2>
            {related?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`http://localhost:8000/api/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substr(0, 60)} ...</p>
                  <p className="card-text">$ {p.price}</p>
                  <button className="btn btn-primary ms-1" onClick={()=> navigate(`/product/${p.slug}`)}>More Details</button>
                  {/* <button className="btn btn-secondary ms-1"> */}
                    {/* ADD TO CART
                  </button> */}
                </div>
              </div>
            ))}
        </div>
       </div>
    </Layout>
  )
}

export default ProductDetails