import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IReview } from "../../models/Review";
import { fetchCurrentUser } from "../../common";
import { Navbar } from "../NavbarAndFooter/Navbar";
import { NewReviewForm } from "../PostDetail/NewReviewForm";

export const ReviewDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [curUser, setCurUser] = useState(null);
    const [curComment, setCurComment] = useState("");
    const [reviewDetails, setReviewDetails] = useState<IReview>({
        _id: "",
        post: "",
        user: {
            id: "",
            username: "",
        },
        content: "",
        likes: [],
        replies: [],
    });

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        setCurComment(newValue);
    };

    const fetchReview = async () => {
        const sessionUser = await fetchCurrentUser();
        setCurUser(sessionUser);
        const response = await fetch(
            `http://localhost:8000/api/reviews/${id}`
        );
        const responseData = await response.json();
        if (responseData.review) {
            setReviewDetails(responseData.review);
        }
    };

    // edit this function to enable replying to a comment!
    const postReview = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (curUser == null) {
            return navigate("/login");
        }
        // const updatedLikes = reviewDetails.replies.push(curComment)
        const response = await fetch(`http://localhost:8000/api/reviews/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id,
                reviewDetails,

            }),
        });
        const responseData = await response.json();
        if (responseData.success) {
            alert(responseData.success);
            fetchReview()
        } else {
            console.log(responseData.error);
        }
        setCurComment("");
    };

    const toggleLike = async () => {
        if (curUser == null) {
            return navigate("/login");
        }
        const liked = reviewDetails?.likes.includes(curUser);
        const updatedLikes = liked
            ? reviewDetails.likes.filter((item) => item !== curUser)
            : [...reviewDetails.likes, curUser];

        setReviewDetails({ ...reviewDetails, likes: updatedLikes });

        const response = await fetch(
            `http://localhost:8000/api/reviews/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...reviewDetails,
                    likes: updatedLikes,
                }),
            }
        );
        const responseData = await response.json();
        if (responseData.error) {
            console.log(responseData.error);
        }
    };

    useEffect(() => {
        fetchReview();
    }, [id]);

    return (
        <div className="d-flex flex-column bg-dark min-vh-100">
            <Navbar />
            <div className="d-flex justify-content-center">
                <h3 className="text-white mb-3">Review Details</h3>
            </div>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="mb-3">
                        <Link
                            to={`/detail/${reviewDetails.post}`}
                            className="text-primary fs-5 icon-link text-white text-decoration-none"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                fill="white"
                                className="bi bi-arrow-left me-2"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                                />
                            </svg>
                            Return to original post
                        </Link>
                    </div>
                    <div className="card">
                        <div className="card-body bg-dark">
                            <p className="card-title text-white fw-bold">
                                {reviewDetails.user.username}{" "}
                                <span className="card-subtitle mb-2 text-secondary">
                                    10min ago
                                </span>
                            </p>
                            <p className="card-text text-white">
                                {reviewDetails.content}
                            </p>
                            <div className="d-flex bg-dark ms-1 mb-1">
                                <button
                                    className={`btn btn-sm ${
                                        curUser != null &&
                                        reviewDetails.likes.includes(curUser)
                                            ? "btn-danger"
                                            : "btn-secondary"
                                    } me-3`}
                                    onClick={toggleLike}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className="bi bi-heart-fill me-1"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
                                        />
                                    </svg>
                                    {reviewDetails.likes.length}
                                </button>
                                <button className="btn btn-sm btn-secondary me-3 btn-disabled">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className="bi bi-chat-fill me-1"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9 9 0 0 0 8 15" />
                                    </svg>
                                    {reviewDetails.replies.length}
                                </button>
                            </div>
                        </div>
                    </div>
                    <NewReviewForm
                        curUser={curUser}
                        postComment={postReview}
                        curComment={curComment}
                        handleChange={handleChange}
                    />
                </div>
            </div>
        </div>
    );
};
