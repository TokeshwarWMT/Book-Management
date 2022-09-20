import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

interface iBook {
    title: String,
    userId: mongoose.Types.ObjectId
    ISBN: Number,
    category: String,
    subcategory: String,
    reviews: Number
};

const bookSchema = new mongoose.Schema<iBook>({
    title: String,
    userId: {
        type: ObjectId,
        ref: 'User'
    },
    ISBN: Number,
    category: String,
    subcategory: String,
    reviews: {
        type: Number, 
        default: 0
    }
});

const Book = mongoose.model('Book', bookSchema);
export default Book;