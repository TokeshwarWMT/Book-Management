import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

interface iReview {
    userId: mongoose.Types.ObjectId,
    bookId: mongoose.Types.ObjectId,
    review: String
};

const reviewSchema = new mongoose.Schema<iReview>({
    userId: {
        type: ObjectId,
        ref: 'User'
    },
    bookId: {
        type: ObjectId,
        ref: 'Book'
    },
    review: String
});

const Review = mongoose.model('Review', reviewSchema);
export default Review;