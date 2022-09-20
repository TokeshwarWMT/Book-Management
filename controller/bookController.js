"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllBook = exports.deleteBook = exports.updateBook = exports.filterBook = exports.findAllBook = exports.findBookById = exports.createBook = void 0;
const bookModel_1 = __importDefault(require("../model/bookModel"));
function createBook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const book = yield bookModel_1.default.create(req.body);
            return res.status(201).send({ status: true, bookDetails: book });
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.createBook = createBook;
;
function findBookById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const book = yield bookModel_1.default.findById(req.params.bookId);
            if (!book) {
                return res.status(400).send({ status: false, message: 'Error.. Book not found..' });
            }
            ;
            return res.status(200).send({ status: true, message: 'successful', bookDetails: book });
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.findBookById = findBookById;
;
function findAllBook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const book = yield bookModel_1.default.find();
            return res.status(200).send({ status: true, bookDetails: book });
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.findAllBook = findAllBook;
;
function filterBook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const book = yield bookModel_1.default.find(req.query);
            if (!book) {
                return res.status(200).send({ status: false, message: 'Error..Book not found' });
            }
            ;
            return res.status(200).send({ status: true, message: 'successful..', bookDetails: book });
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.filterBook = filterBook;
function updateBook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const book = yield bookModel_1.default.findByIdAndUpdate(req.params.bookId, { $set: req.body }, { new: true });
            return res.status(201).send({ status: true, message: 'updated successfully..', bookDetails: book });
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.updateBook = updateBook;
;
function deleteBook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const book = yield bookModel_1.default.findByIdAndRemove(req.params.bookId);
            if (!book) {
                return res.status(400).send({ status: false, message: 'Error..Book is already deleted..' });
            }
            ;
            return res.status(200).send({ status: true, message: 'successfully deleted..' });
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.deleteBook = deleteBook;
;
function deleteAllBook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const book = yield bookModel_1.default.deleteMany();
            return res.status(200).send({ status: true, message: 'successfully all books deleted..' });
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.deleteAllBook = deleteAllBook;
;
