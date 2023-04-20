import React from "react";
import Layout from "./../components/Layout/Layout";
import { useSearch } from "../context/SearchContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Search = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate()
  const [auth,setAuth] = useAuth()

  const addCart = async (e, product) => {
    try {
      e.preventDefault();
      console.log(product);
      const { _id: productId, price } = product;

      if (auth?.user) {
        const { data } = await axios.post(
          "http://localhost:8000/api/cart/add-cart",
          { productId, price }
        );

        if (data.success) console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.results?.length < 1
              ? "No Products"
              : `Found ${values?.results?.length}`}{" "}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {values?.results?.map((p) => (
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
                  <button className="btn btn-primary ms-1" onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                  <button className="btn btn-secondary ms-1"  onClick={(e) => addCart(e, p)}>
                    ADD TO CART
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
