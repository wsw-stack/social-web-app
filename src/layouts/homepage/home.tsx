import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { Navbar } from "../NavbarAndFooter/Navbar";
import { Footer } from "../NavbarAndFooter/Footer";

export const Home = () => {
    const navigate = useNavigate();
    const [liked, setLiked] = useState([false, false]);
    const [likeCount, setLikeCount] = useState([2, 3]);

    const toggleLike = (index: number) => {
        const newLiked = [...liked];
        const newLikeCount = [...likeCount];

        if (newLiked[index]) {
            newLiked[index] = false;
            newLikeCount[index] -= 1;
        } else {
            newLiked[index] = true;
            newLikeCount[index] += 1;
        }

        setLiked(newLiked);
        setLikeCount(newLikeCount);
    };

    return (
        <div className="d-flex flex-column bg-dark min-vh-100">
            <Navbar />
            {[0, 1].map((index) => (
                <div className="row mb-1" key={index}>
                    <div className="col-6 offset-3">
                        <div className="card">
                            <div className="card-body bg-dark">
                                <p className="card-title text-white fw-bold">
                                    Routers <span className="card-subtitle mb-2 text-secondary">10min ago</span>
                                </p>
                                <p className="card-text text-white">
                                    Swedish teenager Lucas Bergvall opened his Tottenham Hotspur account in thrilling fashion with the winner in Wednesday's League Cup semi-final first leg but should not even have been on the pitch according to Liverpool captain Virgil van Dijk.
                                </p>
                                <div className="d-flex justify-content-between align-items-center">
                                    <button
                                        className={`btn btn-sm ${liked[index] ? 'btn-danger' : 'btn-secondary'}`}
                                        onClick={() => toggleLike(index)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart-fill me-1" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                                        </svg>
                                        {likeCount[index]}
                                    </button>
                                    <button className="btn btn-sm btn-primary" onClick={() => navigate(`/detail/${index}`)}>View Details</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};