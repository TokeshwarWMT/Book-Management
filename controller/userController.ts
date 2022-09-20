import User from '../model/userModel';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';


export async function register(req: Request, res: Response) {

    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let data = req.body;
        const { fName, lName, mobile, email, password } = data;

        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);

        const userData = { fName: fName, lName: lName, mobile: mobile, email: email, password: encryptedPassword }
        const user = await User.create(userData);

        return res.status(201).send({ status: true, data: user })
    } catch (error) {
        console.log(error)
    }
};

export async function login(req: Request, res: Response) {
    try {
        let email = req.body.email;
        let pass = req.body.password;

        const user = await User.findOne({ email: email });
        if (!user) return res.status(400).send({ status: false, message: 'Error..Email is incorrect..!!' });


        const password = user?.password as string;
        const passMatch = await bcrypt.compare(pass, password);
        if (!passMatch) {
            return res.status(400).send({ status: false, message: 'Error.. Password is not correct..!!' })
        }
        let key: string = process.env.SECRET_KEY as string;

        const token = jwt.sign({
            id: user?._id,
        }, key);
        return res.status(201).send({ status: true, data: token })

    } catch (error) {
        console.log(error)
    }
};