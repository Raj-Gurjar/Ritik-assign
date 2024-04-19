import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import About from "./Pages/About";
import Error from "./Pages/Error";
import BookGallery from "./Pages/BookGallery";
import Navbar from "./Components/Navbar/Navbar";
import AddBook from "./Pages/AddBook";
import BookDetails from "./Pages/BookDetails";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="pt-14">
        <Routes>
          <Route index element={<Home />} />

          <Route path="/about" element={<About />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/books/allBooks" element={<BookGallery />} />
          <Route path="/books/add" element={<AddBook />} />
          <Route path="/books/:id" element={<BookDetails />} />

          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
