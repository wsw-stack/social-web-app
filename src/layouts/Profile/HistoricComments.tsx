import { useNavigate, useParams } from "react-router-dom";
import { PersonalProfile } from "./PersonalProfile";
import { ProfileNavBar } from "./ProfileNavBar";
import { useState, useEffect } from "react";
import { User } from "../../models/User";
import { Navbar } from "../NavbarAndFooter/Navbar";
import { fetchCurrentUser } from "../../common";
import { IReview } from "../../models/Review";
import { ReviewComponent } from "./ReviewComponent";

export const HistoricComments = () => {
    const { id } = useParams();
    const [user, setUser] = useState<User>({
        _id: "",
        username: "",
        introduction: "",
        followers: [],
        following: [],
    });
    const [loggedUser, setLoggedUser] = useState(null);
    const [allReviews, setAllReviews] = useState<IReview[]>([]);

    const getAllReviews = async (id: any) => {
        const response = await fetch(
            `http://localhost:8000/api/reviews/user/${id}`
        );
        const responseData = await response.json();
        if (responseData.reviews) {
            setAllReviews(responseData.reviews);
        }
    };
    useEffect(() => {
        const getProfileUser = async (id: any) => {
            const response = await fetch(
                `http://localhost:8000/api/users/${id}`
            );
            const responseData = await response.json();
            const sessionUser = await fetchCurrentUser();
            setLoggedUser(sessionUser);
            setUser(responseData);
        };
        getProfileUser(id);
        getAllReviews(id);
    }, [id]);

    return (
        <div className="d-flex flex-column bg-dark min-vh-100">
            <Navbar />
            <div className="col-md-6 offset-md-3 border flex-column flex-grow-1">
                <PersonalProfile user={user} loggedUser={loggedUser} setUser={setUser}/>
                <ProfileNavBar id={id + "/" || ""} curPage="comments" />
                {allReviews.length === 0 ? (
                    <h4 className="d-flex text-white justify-content-center mt-3">
                        {loggedUser != null && id === loggedUser
                            ? "You have no reviews yet!"
                            : "This user has no reviews yet."}
                    </h4>
                ) : (
                    allReviews.map((review, index) => (
                        <ReviewComponent review={review} key={index} username={user.username}/>
                    ))
                )}
            </div>
        </div>
    );
};
