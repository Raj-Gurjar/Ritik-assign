import React, { useState, useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

import GlobalContext from "../Context/GlobalContext";
import SearchBar from "../Components/SearchBar";
import Loader from "../Components/Loader/Loader";
import AddBook from "./AddBook";

export default function BookGallary() {
  const { setIsLoggedIn, allBooks } = useContext(GlobalContext);
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(false);
  const [allBooksData, setAllBooksData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const authToken = localStorage.getItem("token");
  const User = localStorage.getItem("user");
  const user = JSON.parse(User);

  //   console.log(authToken);
  //   console.log(user);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(allBooks, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      const result = await response.json();

      console.log("result : ", result);

      const bookData = result.data?.books || [];

      setAllBooksData(bookData);
      console.log("book data: ", bookData[0].title);

      toast.success(result.message);
      setLoading(false);
    } catch (error) {
      toast.error(error);
      console.error("Error fetching customer loans:", error);
    }
  };

  const viewDetails = (bookId) => {
    navigate(`/books/${bookId}`);
  };

  return (
    <div className="flex flex-col justify-center align-middle text-center">
      <h1 className="my-3 text-2xl">Hello👋 {user.name}</h1>

      <div className="mx-5">
        <h1 className="float-left text-2xl ">See all the Books</h1>
        <button className="float-right">
          <Link to="/books/add"> Add Book</Link>
        </button>
      </div>

      <div className="bg-slate-300 my-5">
        <p>Search Here</p>
        <SearchBar />
      </div>

      {allBooksData.length === 0 ? (
        <p>No book to show</p>
      ) : (
        <div className="border-2 border-black-300  flex flex-wrap m-5 justify-evenly rounded-md">
          {allBooksData.map((book) => (
            <div
              key={book._id}
              className="bg-[#ffff] flex gap-5 m-5 flex-col w-[300px] p-5 rounded-md"
            >
              <p>Book Cover</p>
              <p> Book name: {book.title}</p>
              <p> Book Author: {book.title}</p>
              <button
                onClick={() => {
                  viewDetails(book._id);
                }}
                className="bg-green-500 cursor-pointer m-auto "
              >
                Know More
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
