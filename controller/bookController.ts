import Book from '../model/bookModel';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

export async function createBook(req: Request, res: Response) {
    try {
        const book = await Book.create(req.body);
        return res.status(201).send({ status: true, bookDetails: book })
    } catch (error) {
        console.log(error)
    }
};

export async function findBookById(req: Request, res: Response) {
    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const book = await Book.findById(req.params.bookId);
        if (!book) {
            return res.status(400).send({ status: false, message: 'Error.. Book not found..' })
        };
        return res.status(200).send({ status: true, message: 'successful', bookDetails: book })
    } catch (error) {
        console.log(error);
    }
};

export async function findAllBook(req: Request, res: Response) {
    try {
        const book = await Book.find();
        return res.status(200).send({ status: true, bookDetails: book })
    } catch (error) {
        console.log(error)
    }
};

export async function filterBook(req: Request, res: Response) {
    try {
        const book = await Book.find(req.query);
        if (!book) {
            return res.status(200).send({ status: false, message: 'Error..Book not found' })
        };
        return res.status(200).send({ status: true, message: 'successful..', bookDetails: book })
    } catch (error) {
        console.log(error)
    }
}

export async function updateBook(req: Request, res: Response) {
    try {
        const book = await Book.findByIdAndUpdate(req.params.bookId, { $set: req.body }, { new: true });
        return res.status(201).send({ status: true, message: 'updated successfully..', bookDetails: book })

    } catch (error) {
        console.log(error)
    }
};

export async function deleteBook(req: Request, res: Response) {
    try {
        const book = await Book.findByIdAndRemove(req.params.bookId);
        if (!book) {
            return res.status(400).send({ status: false, message: 'Error..Book is already deleted..' })
        };
        return res.status(200).send({ status: true, message: 'successfully deleted..' })
    } catch (error) {
        console.log(error)
    }
};

export async function deleteAllBook(req: Request, res: Response) {
    try {
        const book = await Book.deleteMany();
        return res.status(200).send({ status: true, message: 'successfully all books deleted..' })
    } catch (error) {
        console.log(error)
    }
};