import 'dotenv/config'
import express from 'express';
import mongoose from 'mongoose';
import routes from './routes/route'
import { Request, Response, NextFunction } from 'express';
const app = express();
app.use(express.json());
app.use('/', routes);

let uri: string = process.env.MONGODB_URL as string;

try {
    mongoose.connect(uri);
    console.log('MongoDB connection successfull..')
} catch (error) {
    console.log(error)
};

app.use((err:any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.message)
    res.status(500).send('Something broke!')
  })

app.listen(process.env.PORT, () => {
    console.log(`Express App is running on ${process.env.PORT}`)
});

