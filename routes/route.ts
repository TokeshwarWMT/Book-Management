import express from 'express';

const router = express.Router();

import { register, login } from '../controller/userController';

import { createBook, findBookById, findAllBook, filterBook, updateBook, deleteBook, deleteAllBook } from '../controller/bookController';

import { review, updateReview, deleteReview } from '../controller/reviewController';

import { authentication, bookAuthorization, reviewAuthorization } from '../middleware/auth';

router.post('/register', register);
router.post('/login', login);

router.post('/createBook', authentication, createBook);
router.get('/findBookById/:bookId', authentication, findBookById);
router.get('/findAllBook', authentication, findAllBook);
router.get('/filterBook', authentication, filterBook);
router.put('/updateBook/:bookId', authentication, bookAuthorization, updateBook);
router.delete('/deleteBook/:bookId', authentication, bookAuthorization, deleteBook);
router.delete('/deleteAllBook', authentication, deleteAllBook);

router.post('/review', authentication, review);
router.put('/updateReview/:reviewId', authentication, reviewAuthorization, updateReview);
router.delete('/deleteReview/:reviewId', authentication, reviewAuthorization, deleteReview);

export default router;