import React from "react";
import Layout from "./../components/Layout/Layout";
import { useSearch } from "../context/SearchContext";

const Search = () => {
  const [values, setValues] = useSearch();

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
                  <button className="btn btn-primary ms-1">More Details</button>
                  <button className="btn btn-secondary ms-1">
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
