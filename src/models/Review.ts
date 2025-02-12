export interface IReview {
    _id?: string
    post: string
    user: {
        _id: string,
        username: string
    }
    content: string
    likes: string[]
    replies: IReview[]
}