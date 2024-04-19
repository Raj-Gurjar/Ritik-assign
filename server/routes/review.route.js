const express = require("express");
const router = express.Router();
const authentication = require("../middleware/authentication");
const {
  addReview,
  getAllReviews,
} = require("../controllers/review.controller");

router.post("/add", authentication, addReview);
router.get("/allReview/:id", authentication, getAllReviews);

module.exports = router;
