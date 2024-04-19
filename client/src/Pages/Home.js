import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome to the Book Reviewer.</h1>
      <h2>Login to See the Books and Review them.</h2>
      <button onClick={() => navigate("signin")}>Login</button>
    </div>
  );
}
