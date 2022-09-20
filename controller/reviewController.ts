import Review from '../model/reviewModel';
import { Request, Response } from 'express';

export async function review(req: Request, res: Response) {
    try {
        const review = await Review.create(req.body);
        return res.status(201).send({ status: true, reviewDetails: review });
    } catch (error) {
        console.log(error)
    }
};

export async function updateReview(req: Request, res: Response) {
    try {
        const review = await Review.findByIdAndUpdate(req.params.reviewId, { $set: req.body }, { new: true });
        return res.status(201).send({ status: true, message: 'successfully updated..', reviewDetails: review });
    } catch (error) {
        console.log(error)
    }
};

export async function deleteReview(req: Request, res: Response) {
    try {
        const review = await Review.findByIdAndRemove(req.params.reviewId);
        return res.status(200).send({ status: true, message: 'successfully deleted..' })
    } catch (error) {
        console.log(error)
    }
};