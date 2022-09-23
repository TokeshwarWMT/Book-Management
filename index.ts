import 'dotenv/config'
import express from 'express';
import mongoose from 'mongoose';
import routes from './routes/route';

const app = express();
app.use(express.json());
app.use('/', routes);

let uri: string = process.env.MONGODB_URL as string;

try {
    mongoose.connect(uri)
        .then(() => console.log('MongoDB connection successful..'))
        .catch(error => console.log(error))
} catch (error) {
    console.log(error)
};

app.listen(process.env.PORT, () => {
    console.log(`Express App is running on ${process.env.PORT}`)
});

