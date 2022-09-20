import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import Book from '../model/bookModel';
import Review from '../model/reviewModel';
import { idecodedToken, iBook, iDecodedToken, iReview } from '../interfaces/interface';

export async function authentication(req: Request, res: Response, next: NextFunction) {
    try {
        let token: any = req.headers['x-api-key'];
        if (!token) {
            return res.status(400).send({ status: false, message: 'Error.. Please input token..!!' })
        };
        let key: string = process.env.SECRET_KEY as string;
        let decodedToken = jwt.verify(token, key);
        if (!decodedToken) {
            return res.status(400).send({ status: false, message: 'Error.. Please input vailid token..!!' })
        };
        next()
    } catch (error) {
        console.log(error)
    }
};

export async function bookAuthorization(req: Request, res: Response, next: NextFunction) {

    try {

        let token: any = req.headers['x-api-key'];
        let key: string = process.env.SECRET_KEY as string;
        let decodedToken = jwt.verify(token, key) as iDecodedToken;

        let loggingIn = req.params.bookId;
        let loggedIn = decodedToken.id;

        let value = await Book.findById(loggingIn) as iBook;
        if (!value) {
            return res.status(200).send({ status: false, message: 'Error..Book not found' })
        };

        if (value.userId.toString() !== loggedIn) {
            return res.status(400).send({ status: false, message: 'Error..You can not access' })
        };

        next();

    } catch (error) {
        console.log(error)
    }
};

export async function reviewAuthorization(req: Request, res: Response, next: NextFunction) {

    try {

        let token: any = req.headers['x-api-key'];
        let key: string = process.env.SECRET_KEY as string;
        let decodedToken = jwt.verify(token, key) as idecodedToken;

        let loggingIn = req.params.reviewId;
        let loggedIn = decodedToken.id;

        let value = await Review.findById(loggingIn) as iReview;
        
        if (!value) {
            return res.status(200).send({ status: false, message: 'Error..Review not found' })
        };

        if (value.userId.toString() !== loggedIn) {
            return res.status(400).send({ status: false, message: 'Error..You can not access' })
        };

        next();

    } catch (error) {
        console.log(error)
    }
}

