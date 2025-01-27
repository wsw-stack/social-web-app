import { IReview } from "./Review";

export interface IPost {
    user: { username: "" };
    content: "";
    likes: string[];
    reviews: IReview[]
}