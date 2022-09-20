"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ObjectId = mongoose_1.default.Schema.Types.ObjectId;
;
const bookSchema = new mongoose_1.default.Schema({
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
const Book = mongoose_1.default.model('Book', bookSchema);
exports.default = Book;
