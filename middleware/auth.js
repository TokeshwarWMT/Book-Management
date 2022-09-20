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
exports.reviewAuthorization = exports.bookAuthorization = exports.authentication = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bookModel_1 = __importDefault(require("../model/bookModel"));
const reviewModel_1 = __importDefault(require("../model/reviewModel"));
function authentication(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let token = req.headers['x-api-key'];
            if (!token) {
                return res.status(400).send({ status: false, message: 'Error.. Please input token..!!' });
            }
            ;
            let key = process.env.SECRET_KEY;
            let decodedToken = jsonwebtoken_1.default.verify(token, key);
            if (!decodedToken) {
                return res.status(400).send({ status: false, message: 'Error.. Please input vailid token..!!' });
            }
            ;
            next();
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.authentication = authentication;
;
function bookAuthorization(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let token = req.headers['x-api-key'];
            let key = process.env.SECRET_KEY;
            let decodedToken = jsonwebtoken_1.default.verify(token, key);
            let loggingIn = req.params.bookId;
            let loggedIn = decodedToken.id;
            let value = yield bookModel_1.default.findById(loggingIn);
            if (!value) {
                return res.status(200).send({ status: false, message: 'Error..Book not found' });
            }
            ;
            if (value.userId.toString() !== loggedIn) {
                return res.status(400).send({ status: false, message: 'Error..You can not access' });
            }
            ;
            next();
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.bookAuthorization = bookAuthorization;
;
function reviewAuthorization(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let token = req.headers['x-api-key'];
            let key = process.env.SECRET_KEY;
            let decodedToken = jsonwebtoken_1.default.verify(token, key);
            let loggingIn = req.params.reviewId;
            let loggedIn = decodedToken.id;
            let value = yield reviewModel_1.default.findById(loggingIn);
            if (!value) {
                return res.status(200).send({ status: false, message: 'Error..Review not found' });
            }
            ;
            if (value.userId.toString() !== loggedIn) {
                return res.status(400).send({ status: false, message: 'Error..You can not access' });
            }
            ;
            next();
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.reviewAuthorization = reviewAuthorization;
