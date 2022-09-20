import express from 'express';
const router = express.Router();

import { register, login } from '../controller/userController';
import { createBook, findBookById, findAllBook, filterBook, updateBook, deleteBook, deleteAllBook } from '../controller/bookController';
import { review, updateReview, deleteReview } from '../controller/reviewController';
import { authentication, bookAuthorization, reviewAuthorization } from '../middleware/auth';
import { userValidation, findBookValidation, updateBookValidation, deleteBookValidation, reviewValidation, updateReviewValidation, deleteReviewValidation } from '../middleware/validation';

router.post('/register', userValidation(), register);
router.post('/login', login);

router.post('/createBook', authentication, createBook);
router.get('/findBookById/:bookId', findBookValidation(), authentication, findBookById);
router.get('/findAllBook', authentication, findAllBook);
router.get('/filterBook', authentication, filterBook);
router.put('/updateBook/:bookId', updateBookValidation(), authentication, bookAuthorization, updateBook);
router.delete('/deleteBook/:bookId', deleteBookValidation(), authentication, bookAuthorization, deleteBook);
router.delete('/deleteAllBook', authentication, deleteAllBook);

router.post('/review', reviewValidation(), authentication, review);
router.put('/updateReview/:reviewId', updateReviewValidation(), authentication, reviewAuthorization, updateReview);
router.delete('/deleteReview/:reviewId', deleteReviewValidation(), authentication, reviewAuthorization, deleteReview);

export default router;