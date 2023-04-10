import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = () => {
  const [product, setProduct] = useState([]);

  const getProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/product/get-product"
      );
      setProduct(data?.products);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center ">All Products</h1>
          <div className="d-flex">
            {product.map((p) => (
              <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`} className="product-link">
                <div className="card m-2" style={{ width: "18rem" }}> 
                  <img src={`http://localhost:8000/api/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
