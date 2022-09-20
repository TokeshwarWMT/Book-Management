"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReviewValidation = exports.updateReviewValidation = exports.reviewValidation = exports.deleteBookValidation = exports.updateBookValidation = exports.findBookValidation = exports.userValidation = void 0;
const express_validator_1 = require("express-validator");
const userModel_1 = __importDefault(require("../model/userModel"));
function userValidation() {
    return [(0, express_validator_1.check)('fName').not().isEmpty().withMessage('Error..fname is required..!!'),
        (0, express_validator_1.check)('lName').not().isEmpty().withMessage('Error..lname is required..!!'),
        (0, express_validator_1.check)('mobile').not().isEmpty().withMessage('Error..invailid email..!!'),
        (0, express_validator_1.check)('email').isEmail().withMessage('Error..invailid email..!!'),
        (0, express_validator_1.check)('mobile').custom(value => {
            return userModel_1.default.findOne({ mobile: value }).then((user) => {
                if (user) {
                    return Promise.reject('Error..Mobile already in use..!!');
                }
            });
        }),
        (0, express_validator_1.check)('email').custom(value => {
            return userModel_1.default.findOne({ email: value }).then((user) => {
                if (user) {
                    return Promise.reject('Error..Email already is use..!!');
                }
            });
        }),
        (0, express_validator_1.check)('password').isLength({ min: 5 }).withMessage('Error..invailid password..!!'),];
}
exports.userValidation = userValidation;
;
function findBookValidation() {
    return [(0, express_validator_1.check)('bookId').not().isEmpty().withMessage('Error..bookdId is required!!').isMongoId().withMessage('Error...Please input vailid objectId!!')];
}
exports.findBookValidation = findBookValidation;
;
function updateBookValidation() {
    return [(0, express_validator_1.check)('bookId').isMongoId().withMessage('Error..Please input vailid objectId!!')];
}
exports.updateBookValidation = updateBookValidation;
;
function deleteBookValidation() {
    return [(0, express_validator_1.check)('bookId').isMongoId().withMessage('Error..Please input vailid objectId!!')];
}
exports.deleteBookValidation = deleteBookValidation;
;
function reviewValidation() {
    return [(0, express_validator_1.check)('userId').not().isEmpty().withMessage('Error..userId is required..!!'),
        (0, express_validator_1.check)('bookId').not().isEmpty().withMessage('Error..bookId is required..!!'),
        (0, express_validator_1.check)('review').not().isEmpty().withMessage('Error..review is required..!!')];
}
exports.reviewValidation = reviewValidation;
;
function updateReviewValidation() {
    return [(0, express_validator_1.check)('reviewId').not().isEmpty().withMessage('Error..reviewId is required..!!'),
        (0, express_validator_1.check)('review').not().isEmpty().withMessage('Error..Please input review in body..!!')];
}
exports.updateReviewValidation = updateReviewValidation;
;
function deleteReviewValidation() {
    return [(0, express_validator_1.check)('reviewId').isMongoId().withMessage('Error..Please input vailid reviewId!!')];
}
exports.deleteReviewValidation = deleteReviewValidation;
;
