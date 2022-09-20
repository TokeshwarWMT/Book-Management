"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ObjectId = mongoose_1.default.Schema.Types.ObjectId;
;
const reviewSchema = new mongoose_1.default.Schema({
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
const Review = mongoose_1.default.model('Review', reviewSchema);
exports.default = Review;
