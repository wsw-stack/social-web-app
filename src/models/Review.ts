export interface IReview {
    _id: string
    post: string
    user: {
        id: string,
        username: string
    }
    content: string
    likes: string[]
    replies: IReview[]
}