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
exports.login = exports.register = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let data = req.body;
            const { fName, lName, mobile, email, password } = data;
            const salt = yield bcrypt_1.default.genSalt(10);
            const encryptedPassword = yield bcrypt_1.default.hash(password, salt);
            const userData = { fName: fName, lName: lName, mobile: mobile, email: email, password: encryptedPassword };
            const user = yield userModel_1.default.create(userData);
            return res.status(201).send({ status: true, data: user });
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.register = register;
;
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let email = req.body.email;
            let pass = req.body.password;
            const user = yield userModel_1.default.findOne({ email: email });
            if (!user)
                return res.status(400).send({ status: false, message: 'Error..Email is incorrect..!!' });
            const password = user === null || user === void 0 ? void 0 : user.password;
            const passMatch = yield bcrypt_1.default.compare(pass, password);
            if (!passMatch) {
                return res.status(400).send({ status: false, message: 'Error.. Password is not correct..!!' });
            }
            let key = process.env.SECRET_KEY;
            const token = jsonwebtoken_1.default.sign({
                id: user === null || user === void 0 ? void 0 : user._id,
            }, key);
            return res.status(201).send({ status: true, data: token });
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.login = login;
;
