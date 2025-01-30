import { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PostDetails } from "./PostDetails";
import { Navbar } from "../NavbarAndFooter/Navbar";
import { fetchCurrentUser } from "../../common";
import { IPost } from "../../models/Post";
import { IReview } from "../../models/Review";
import { Review } from "./Review";
import { NewReviewForm } from "./NewReviewForm";

export const Details = () => {
    const { id } = useParams();
    const [reviewCount, setReviewCount] = useState(0)
    const navigate = useNavigate();
    const [curUser, setCurUser] = useState(null);
    const [curComment, setCurComment] = useState("");
    const [postDetails, setPostDetails] = useState<IPost>({
        _id: "",
        user: { 
            _id: "",
            username: "" 
        },
        content: "",
        likes: [],
        reviews: [],
    });

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        setCurComment(newValue);
    };

    const postComment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (curUser == null) {
            return navigate("/login");
        }
        const response = await fetch(`http://localhost:8000/api/reviews`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                postId: id,
                user: curUser,
                content: curComment,
            }),
        });
        const responseData = await response.json();
        if (responseData.success) {
            alert(responseData.success);
            fetchPostDetails()
            getReviewCount()
        } else {
            console.log(responseData.error);
        }
        setCurComment("");
    };

    const toggleLikePost = async () => {
        if (curUser == null) {
            return navigate("/login");
        }
        const liked = curUser != null && postDetails?.likes?.includes(curUser);
        const updatedLikes = liked
            ? postDetails.likes.filter((item) => item !== curUser)
            : [...postDetails.likes, curUser];

        setPostDetails((prev) => ({ ...prev, likes: updatedLikes }))

        const response = await fetch(`http://localhost:8000/api/posts/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id,
                ...postDetails, 
                likes: updatedLikes
            }),
        });
        const responseData = await response.json();
        if (responseData.error) {
            console.log(responseData.error);
        }
    };

    const fetchPostDetails = async () => {
        const sessionUser = await fetchCurrentUser();
        setCurUser(sessionUser);
        const response = await fetch(
            `http://localhost:8000/api/posts/${id}`
        );
        const responseData = await response.json();
        setPostDetails(responseData);
    };

    const getReviewCount = async () => {
        const response = await fetch(`http://localhost:8000/api/posts/${id}/reviewCount`)
        const responseData = await response.json()
        if(responseData.reviewCount) {
            setReviewCount(responseData.reviewCount)
            console.log(reviewCount)
        }
    }

    useEffect(() => {
        fetchPostDetails()
        getReviewCount()
    }, [id]);

    return (
        <div className="d-flex flex-column bg-dark min-vh-100">
            <Navbar />
            <div className="d-flex justify-content-center">
                <h3 className="text-white mb-3">Post Details</h3>
            </div>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="mb-3">
                        <Link
                            to="/"
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
                            Return to all posts
                        </Link>
                    </div>
                    <PostDetails
                        postDetails={postDetails}
                        toggleLikePost={toggleLikePost}
                        curUser={curUser}
                        reviewCount={reviewCount}
                    />
                    <NewReviewForm
                        curUser={curUser}
                        postComment={postComment}
                        curComment={curComment}
                        handleChange={handleChange}
                    />
                    {postDetails.reviews.map((review: any, index) => (
                        <Review
                            review={review}
                            curUser={curUser}
                            key={index}
                            fetchPostDetails={fetchPostDetails}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
