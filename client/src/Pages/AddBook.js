import React, { useState, useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./log.scss";
import { Link } from "react-router-dom";

import GlobalContext from "../Context/GlobalContext";
import Loader from "../Components/Loader/Loader";

export default function AddBook() {
  const { setIsLoggedIn, addBook } = useContext(GlobalContext);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    description: "",
  });
  const [isLoading, setLoading] = useState(false);

  const authToken = localStorage.getItem("token");

  const onSubmitForm = async () => {
    setLoading(true);
    try {
      const response = await fetch(addBook, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(formData),
      });

      console.log("resp of add book :", response);

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      toast.success("Loan Request is Created");
    } catch (error) {
      console.error("Error in adding new book : ", error);
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  function changeHandler(event) {
    const { name, value, checked, type } = event.target;

    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }

  return (
    <div className="log-container" data-aos="fade-right" data-dos-delay="10">
      <p>Here you can add a Book</p>

      <form className="log-form" onSubmit={onSubmitForm}>
        <h4>Add Book</h4>

        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={changeHandler}
          required
        />

        <label htmlFor="author">Author:</label>
        <input
          type="text"
          id="author"
          name="author"
          value={formData.author}
          onChange={changeHandler}
          required
        />

        <label htmlFor="genre">Genre:</label>
        <input
          type="text"
          id="genre"
          name="genre"
          value={formData.genre}
          onChange={changeHandler}
          required
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          className="text-black-500 bg-slate-400"
          name="description"
          value={formData.description}
          onChange={changeHandler}
          required
        />

        <button type="submit">Add Book</button>
{/* 
        {isLoading && (
          <div className="loader-container">
            <Loader />
          </div>
        )} */}
      </form>
    </div>
  );
}
