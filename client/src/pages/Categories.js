import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
// import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/category/categories"
      );
      console.log(data);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <Layout title={"All Categories"}>
    <div className="container" style={{ marginTop: "100px" }}>
      <div className="row container">
        {categories.map((c) => (
          <div className="col-md-4 mt-5 mb-3 gx-3 gy-3" key={c._id}>
            <div className="card">
              <button className="btn btn-secondary shadow" color="white">
              <Link to={`/category/${c.slug}`}  className="btn cat-btn">
                {c.name}
              </Link>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </Layout>
  );
};

export default Categories;
