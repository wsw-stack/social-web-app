import { IReview } from "./Review";

interface IUser {
    _id: string
    username: string
}

export class IPost {
    _id?: string
    user: IUser;
    content: string;
    likes: string[];
    reviews: IReview[]

    constructor(
        _id: string = '', 
        user: IUser,
        content: string,
        likes: string[] = [],
        reviews: IReview[] = []
      ) {
        this._id = _id;
        this.user = user;
        this.content = content;
        this.likes = likes;
        this.reviews = reviews;
      }
}