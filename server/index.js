require("dotenv").config();
require("./config/mongoose");
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use("*", cors());

app.use("/user", require("./routes/user.route"));
app.use("/reviews", require("./routes/review.route"));
app.use("/books", require("./routes/book.route"));

app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
});
