import { IReview } from "./Review";

export interface IPost {
    _id: string
    user: { username: "" };
    content: "";
    likes: string[];
    reviews: IReview[]
}