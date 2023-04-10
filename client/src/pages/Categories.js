import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import useCategory from "../hooks/useCategory";
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
    <Layout>
      <h1>Categories</h1>
      <div className="container">
        <div className="row">
          {categories?.map((c) => (
            <div className="col-md-6 mt-5 mb-3 gx-3 gy-3">
              <button className="btn btn-primary" key={c._id}>
                <Link to={`/category/${c.slug}`} className="btn btn-primary">{c.name}</Link>
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
