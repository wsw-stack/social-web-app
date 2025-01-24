import { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PostDetails } from "./PostDetails";
import { Navbar } from "../NavbarAndFooter/Navbar";
import { fetchCurrentUser } from "../../common";
import { IPost } from "../../models/Post";

export const Details = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [curUser, setCurUser] = useState(null);
    const [comments, setComments] = useState([
        {
            user: "usagi",
            comment: "Yahayaha",
            time: "10h ago",
        },
        {
            user: "John",
            comment: "Amazing young star!",
            time: "5min ago",
        },
    ]);
    const [curComment, setCurComment] = useState("");
    const [postDetails, setPostDetails] = useState<IPost>({
        user: { username: "" },
        content: "",
        likes: [],
    });

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        setCurComment(newValue);
    };

    const postComment = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setComments((comments) => [
            ...comments,
            {
                user: "unknown",
                comment: curComment,
                time: "10s ago",
            },
        ]);
        setCurComment("");
    };

    const toggleLike = async () => {
        const sessionUser = await fetchCurrentUser();
        if (sessionUser == null) {
            return navigate("/login");
        }
        setCurUser(sessionUser);
        const liked = curUser != null && postDetails?.likes?.includes(curUser);

        if (liked) {
            setPostDetails((postDetails: any) => {
                postDetails.likes = postDetails?.likes?.filter(
                    (item: any) => item !== curUser
                );
                return { ...postDetails };
            });
        } else {
            setPostDetails((postDetails: any) => {
                postDetails.likes.push(curUser);
                return { ...postDetails };
            });
        }

        const response = await fetch(`http://localhost:8000/api/posts/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id,
                ...postDetails,
            }),
        });
        const responseData = await response.json();
        if (responseData.error) {
            console.log(responseData.error);
        }
    };

    useEffect(() => {
        const getContent = async () => {
            const sessionUser = await fetchCurrentUser();
            setCurUser(sessionUser);
            const response = await fetch(
                `http://localhost:8000/api/posts/${id}`
            );
            const responseData = await response.json();
            setPostDetails(responseData);
        };
        getContent();
    }, [id])

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
                        toggleLike={toggleLike}
                    />
                    <form onSubmit={postComment}>
                        <div className="mb-2">
                            <label
                                htmlFor="comment"
                                className="form-label text-white"
                            >
                                Leave your comment here
                            </label>
                            <textarea
                                className="form-control bg-dark text-white"
                                id="comment"
                                rows={3}
                                onChange={handleChange}
                                value={curComment}
                            ></textarea>
                            <button
                                type="submit"
                                className="btn mt-3 text-light border-light fw-bold"
                                style={{ borderWidth: "2px" }}
                            >
                                Comment
                            </button>
                        </div>
                    </form>
                    {comments.map((value, index) => (
                        <div className="card mb-1" key={index}>
                            <div className="card-body bg-dark">
                                <p className="card-title text-white fw-bold">
                                    {value.user}{" "}
                                    <span className="card-subtitle mb-2 text-secondary">
                                        {value.time}
                                    </span>
                                </p>
                                <p className="card-text text-white">
                                    {value.comment}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
