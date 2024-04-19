import { useParams } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";

import { Outlet, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../Components/Loader/Loader";
import GlobalContext from "../Context/GlobalContext";

export default function BookDetails() {
  const params = useParams();
  const bookId = params.id;

  //   console.log("id :", bookId);

  const { getBook } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [bookDetails, setBookDetails] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const authToken = localStorage.getItem("token");
  const User = localStorage.getItem("user");
  const user = JSON.parse(User);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${getBook}${bookId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        toast.error("Error in fetching Book Details");
        return;
      }
      const data = await response.json();

      const bookData = data?.data || [];
      setBookDetails(bookData);
      console.log("book data", bookData);

      toast.success(data.message);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching book details :", error);
      toast.error("Error in fetching this Book Details");
    }
  };
  return (
    <div className="flex justify-center align-middle text-center flex-col">
      <h1 className="text-3xl my-5 font-semibold">
        Full Details of
        <span className="text-[#38BDF8] font-bold text-4xl"> {bookDetails.title}</span>
      </h1>

      <div className="text-2xl my-10">
        <p>Book Cover</p>

        <p>Book Name : {bookDetails.title}</p>
        <p>Book Author : {bookDetails.author}</p>
        <p>Book Genre : {bookDetails.genre}</p>
        <p>Book Description : {bookDetails.description}</p>
      </div>

      <div>
        <p>Book's Reviews</p>
        {}
      </div>
    </div>
  );
}
