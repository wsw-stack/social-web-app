import { useNavigate } from "react-router-dom";
import { IReview } from "../../models/Review"
import { useState } from "react";

export const Review: React.FC<{id: string, review: IReview, curUser: string | null}> = ({id, review, curUser}) => {
    const navigate = useNavigate()
    const [curReview, setCurReview] = useState<IReview>({...review})

    const toggleLike = async () => {
            if (curUser == null) {
                return navigate("/login");
            }
            const liked = curUser != null && review?.likes.includes(curUser);
    
            if (liked) {
                setCurReview((item: IReview) => {
                    item.likes = item?.likes?.filter(
                        (item: any) => item !== curUser
                    );
                    return { ...item };
                });
            } else {
                setCurReview((item: IReview) => {
                    item.likes.push(curUser);
                    return { ...item };
                });
            }
    
            const response = await fetch(`http://localhost:8000/api/reviews/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...curReview,
                }),
            });
            const responseData = await response.json();
            if (responseData.error) {
                console.log(responseData.error);
            }
        };

    return (
        <div className="card mb-1">
            <div className="card-body bg-dark">
                <p className="card-title text-white fw-bold">
                    {review.user.username}{" "}
                    <span className="card-subtitle mb-2 text-secondary">
                        10min ago
                    </span>
                </p>
                <p className="card-text text-white">
                    {review.content}
                </p>
                <div className="d-flex bg-dark ms-1 mb-1">
                    <button
                        className={`btn btn-sm ${
                            (curUser != null && review.likes.includes(curUser)) ? "btn-danger" : "btn-secondary"
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
                        {review.likes.length}
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
                        {review.replies.length}
                    </button>
                </div>
            </div>
        </div>
    )
}