const Review = require("../models/review.model");
const Book = require("../models/book.model");

exports.addReview = async (req, res) => {
  try {
    const { rating, comment, bookId } = req.body;
    const loggedInUser = req.user;
    if (!rating || !comment) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const book = await Book.findOne({ _id: bookId });

    if (!book) {
      return res.status(400).json({
        success: false,
        message: "Book must be exist.",
      });
    }

    const review = await Review.create({
      user: loggedInUser._id,
      rating,
      comment,
      bookId,
    });
    book.reviews.push(review._id);
    await book.save();

    return res.status(400).json({
      success: true,
      message: "Thanks for reviewing.",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server Error",
    });
  }
};

exports.getAllReviews = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findOne({ _id: id });

    if (!book) {
      return res.status(400).json({
        success: false,
        message: "Book must be exist.",
      });
    }

    const review = await Review.find(
      {
        bookId: id,
      },
      { user: 1, rating: 1, comment: 1 }
    ).populate({
      path: "user",
      select: "name",
    });

    return res.status(400).json({
      success: true,
      message: "Thanks for reviewing.",
      data: { reviews: review },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server Error",
    });
  }
};
