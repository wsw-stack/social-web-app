import { useNavigate } from "react-router-dom";
import { IReview } from "../../models/Review";

export const ReviewComponent: React.FC<{review: IReview, username: string}> = ({review, username}) => {
    const navigate = useNavigate()
    return (
        <div className="card">
            <div className="card-body bg-dark">
                <p className="card-title text-white fw-bold">
                    {username}{" "}
                    <span className="card-subtitle mb-2 text-secondary">
                        10min ago
                    </span>
                </p>
                <p className="card-text text-white">{review.content}</p>
                <div className="d-flex justify-content-between align-items-center">
                    <button className="btn btn-sm btn-secondary">
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
                        {review.likes.length}
                    </button>
                    <button
                        className="btn btn-sm btn-primary"
                        onClick={() => navigate(`/detail/${review.post}`)}
                    >
                        View Original Post
                    </button>
                </div>
            </div>
        </div>
    );
};
