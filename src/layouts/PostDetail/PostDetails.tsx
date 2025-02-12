import { useEffect, useState } from "react";
import { fetchCurrentUser } from "../../common";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IPost } from "../../models/Post";

export const PostDetails: React.FC<{ postDetails: IPost, toggleLikePost: any, curUser: string | null, reviewCount: number}> = ({postDetails, toggleLikePost, curUser, reviewCount}) => {
    const { id } = useParams();
    
    return (
        <div className="card">
            <div className="card-body bg-dark">
                <p className="card-title text-white fw-bold">
                    <Link to={`/profile/${postDetails.user._id}`} className="text-white">{postDetails.user.username}</Link>
                    <span className="card-subtitle mb-2 text-secondary">
                        {" "}10min ago
                    </span>
                </p>
                <p className="card-text text-white">{postDetails.content}</p>
                <div className="d-flex bg-dark ms-1 mb-1">
                    <button
                        className={`btn btn-sm ${
                            (curUser != null && postDetails.likes.includes(curUser)) ? "btn-danger" : "btn-secondary"
                        } me-3`}
                        onClick={toggleLikePost}
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
                        {postDetails.likes.length}
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
                        {reviewCount}
                    </button>
                </div>
            </div>
        </div>
    );
};
