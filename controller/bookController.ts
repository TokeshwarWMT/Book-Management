import Book from '../model/bookModel';
import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';


export async function createBook(req: Request, res: Response, next: NextFunction) {
    const { id } = req.body;
    try {
        const book = await Book.create(id);
        return res
            .status(200)
            .send({ data: book })
    } catch (e) {
        next(e)
    }
}

export async function findBookById(req: Request, res: Response, next: NextFunction) {
    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res
                .status(400)
                .json({ errors: errors.array() });
        }

        const book = await Book.findById(req.params.bookId);
        if (!book) {
            return res
                .status(400)
                .send({ message: 'Error.. Book not found..' })
        };
        return res
            .status(200)
            .send({ bookDetails: book })
    } catch (e) {
        next(e);
    }
};

export async function findAllBook(req: Request, res: Response, next: NextFunction) {
    try {
        const book = await Book.find();
        return res
            .status(200)
            .send({ bookDetails: book })
    } catch (e) {
        next(e)
    }
};


export async function filterBook(req: Request, res: Response, next: NextFunction) {
    try {
        const book = await Book.find(req.query);
        if (!book) {
            return res
                .status(200)
                .send({ message: 'Error..Book not found' })
        };
        return res
            .status(200)
            .send({ bookDetails: book })
    } catch (e) {
        next(e)
    }
}

export async function updateBook(req: Request, res: Response, next: NextFunction) {
    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res
                .status(400)
                .json({ errors: errors.array() });
        }

        const book = await Book.findByIdAndUpdate(req.params.bookId, { $set: req.body }, { new: true });
        return res
            .status(201)
            .send({ bookDetails: book })

    } catch (e) {
        next(e)
    }
};

export async function deleteBook(req: Request, res: Response, next: NextFunction) {
    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const book = await Book.findByIdAndRemove(req.params.bookId);
        if (!book) {
            return res
                .status(400)
                .send({ message: 'Error..Book is already deleted..' })
        };
        return res
            .status(200)
            .send({ message: 'successfully deleted..' })
    } catch (e) {
        next(e)
    }
};

export async function deleteAllBook(req: Request, res: Response, next: NextFunction) {
    try {
        const book = await Book.deleteMany();
        return res
            .status(200)
            .send({ message: 'successfully all books deleted..' })
    } catch (e) {
        next(e)
    }
};