import React, { useState, useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import "./log.scss";

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
    <div>
      <h1>Hello !! {user.name}</h1>
      <h1>See all the Books</h1>

      <button>
        <Link to="/books/add"> Add Book</Link>
      </button>

      <div>
        <p>Search Here</p>
        <SearchBar />
      </div>

      {allBooksData.length === 0 ? (
        <p>No book to show</p>
      ) : (
        <div>
          {allBooksData.map((book) => (
            <div
              key={book._id}
              className="bg-red-300 flex gap-5 m-5 flex-col w-[30%]"
            >
              <p>Book Cover</p>
              <p> Book name: {book.title}</p>
              <p> Book Author: {book.title}</p>
              <span
                onClick={() => {
                  viewDetails(book._id);
                }}
                className="bg-green-500 cursor-pointer"
              >
                Know More
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
