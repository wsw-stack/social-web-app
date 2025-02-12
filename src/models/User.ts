export class User {
    _id: string
    username: string
    email?: string
    introduction: string
    following: string[]
    followers: string[]

    constructor(_id: string,
        username: string,
        email: string,
        introduction: string,
        following: string[] = [],
        followers: string[] = []) {
            this._id = _id
            this.username = username
            this.email = email
            this.introduction = introduction
            this.following = following
            this.followers = followers
    }
}