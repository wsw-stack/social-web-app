import { ChangeEvent, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export const Details = () => {
    const {id} = useParams()
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(2);
    const [comments, setComments] = useState([{
        user: 'usagi',
        comment: 'Yahayaha',
        time: '10h ago'
    }, {
        user: 'John',
        comment: 'Amazing young star!',
        time: '5min ago'
    }])
    const [curComment, setCurComment] = useState('')
    const [postDetail, setPostDetail] = useState({
        user: { username: "" },
        content: "",
    })

    const toggleLike = () => {
        let newLiked = liked;
        let newLikeCount = likeCount;

        if (newLiked) {
            newLiked = false;
            newLikeCount -= 1;
        } else {
            newLiked = true;
            newLikeCount += 1;
        }

        setLiked(newLiked);
        setLikeCount(newLikeCount);
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value
        setCurComment(newValue)
    }

    const postComment = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setComments(comments => ([...comments, {
            user: 'unknown',
            comment: curComment,
            time: '10s ago'
        }]))
        setCurComment('')
    }

    useEffect(() => {
        const getContent = async () => {
            const response = await fetch(`http://localhost:8000/api/posts/${id}`)
            const responseData = await response.json()
            console.log(responseData)
            console.log(responseData.content)
            setPostDetail(responseData)
        }
        getContent()
    }, [id])

    return (
        <div className="d-flex flex-column bg-dark min-vh-100 pt-3">
            <div className="d-flex justify-content-center">
                <h3 className="text-white mb-3">Post Details</h3>
            </div>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="mb-3">
                        <Link to='/' className="text-primary fs-5 icon-link text-white text-decoration-none">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" className="bi bi-arrow-left me-2" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                            </svg>
                            Return to all posts
                        </Link>
                    </div>
                    <div className="card">
                        <div className="card-body bg-dark">
                            <p className="card-title text-white fw-bold"> {postDetail.user.username} <span className="card-subtitle mb-2 text-secondary">10min ago</span></p>
                            <p className="card-text text-white">{postDetail.content}</p>
                            <div className="d-flex bg-dark ms-1 mb-1">
                                <button
                                    className={`btn btn-sm ${liked ? 'btn-danger' : 'btn-secondary'} me-3`}
                                    onClick={toggleLike}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart-fill me-1" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                                    </svg>
                                    {likeCount}
                                </button>
                                <button
                                    className='btn btn-sm btn-secondary me-3 btn-disabled'
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat-fill me-1" viewBox="0 0 16 16">
                                        <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9 9 0 0 0 8 15" />
                                    </svg>
                                    {comments.length}
                                </button>
                            </div>
                            <form onSubmit={postComment}>
                                <div className="mb-2">
                                    <label htmlFor="comment" className="form-label text-white">Leave your comment here</label>
                                    <textarea className="form-control bg-dark text-white" id="comment" rows={3} onChange={handleChange} value={curComment}></textarea>
                                    <button type="submit" className="btn mt-3 text-light border-light fw-bold" style={{ borderWidth: '2px' }}>
                                        Comment
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    {
                        comments.map((value, index) => (
                            <div className="card mb-1" key={index}>
                                <div className="card-body bg-dark">
                                    <p className="card-title text-white fw-bold">
                                        {value.user} <span className="card-subtitle mb-2 text-secondary">{value.time}</span>
                                    </p>
                                    <p className="card-text text-white">
                                        {value.comment}
                                    </p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}