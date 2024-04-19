const Book = require("../models/book.model");

exports.addBook = async (req, res) => {
  try {
    const { title, author, genre, description } = req.body;
    if (!title || !author || !genre || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    await Book.create({
      title,
      author,
      genre,
      description,
      reviews: [],
    });

    return res.status(400).json({
      success: true,
      message: "Book added successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server Error",
    });
  }
};

exports.getAllBook = async (req, res) => {
  try {
    const books = await Book.find()
      .populate({ path: "reviews" })
      .populate({
        path: "reviews",
        populate: { path: "user", select: "name" },
      });

    return res.status(400).json({
      success: true,
      message: "Books fetched successfully.",
      data: {
        books,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server Error",
    });
  }
};

exports.getBookDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findOne({ _id: id })
      .populate({ path: "reviews" })
      .populate({
        path: "reviews",
        populate: { path: "user", select: "name" },
      });

    return res.status(400).json({
      success: true,
      message: "Book details fetched successfully.",
      data: book,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server Error",
    });
  }
};
