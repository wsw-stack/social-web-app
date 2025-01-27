export interface IReview {
    user: {
        id: string,
        username: string
    }
    content: string
    likes: string[]
    replies: IReview[]
}