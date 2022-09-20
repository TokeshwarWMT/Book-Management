import { check, validationResult } from "express-validator";
import User from "../model/userModel";

export function userValidation() {
    return [check('fName').not().isEmpty().withMessage('Error..fname is required..!!'),
    check('lName').not().isEmpty().withMessage('Error..lname is required..!!'),
    check('mobile').not().isEmpty().withMessage('Error..invailid email..!!'),
    check('email').isEmail().withMessage('Error..invailid email..!!'),
    check('mobile').custom(value => {
        return User.findOne({ mobile: value }).then((user: any) => {
            if (user) {
                return Promise.reject('Error..Mobile already in use..!!');
            }
        })
    }),
    check('email').custom(value => {
        return User.findOne({ email: value }).then((user: any) => {
            if (user) {
                return Promise.reject('Error..Email already is use..!!')
            }
        })
    }),
    check('password').isLength({ min: 5 }).withMessage('Error..invailid password..!!'),
    ]
};

export function findBookValidation() {
    return [check('bookId').not().isEmpty().withMessage('Error..bookdId is required!!').isMongoId().withMessage('Error...Please input vailid objectId!!')]
};

export function updateBookValidation() {
    return [check('bookId').isMongoId().withMessage('Error..Please input vailid objectId!!')]
};

export function deleteBookValidation() {
    return [check('bookId').isMongoId().withMessage('Error..Please input vailid objectId!!')]
};

export function reviewValidation() {
    return [check('userId').not().isEmpty().withMessage('Error..userId is required..!!'),
    check('bookId').not().isEmpty().withMessage('Error..bookId is required..!!'),
    check('review').not().isEmpty().withMessage('Error..review is required..!!')]
};

export function updateReviewValidation() {
    return [check('reviewId').not().isEmpty().withMessage('Error..reviewId is required..!!'),
    check('review').not().isEmpty().withMessage('Error..Please input review in body..!!')]
};

export function deleteReviewValidation() {
    return [check('reviewId').isMongoId().withMessage('Error..Please input vailid reviewId!!')]
};