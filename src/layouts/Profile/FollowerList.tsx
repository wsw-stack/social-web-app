import { useParams, Link } from "react-router-dom";
import { PersonalProfile } from "./PersonalProfile";
import { ProfileNavBar } from "./ProfileNavBar";
import { useState, useEffect } from "react";
import { User } from "../../models/User";
import { Navbar } from "../NavbarAndFooter/Navbar";
import { fetchCurrentUser } from "../../common";
import { PersonOverview } from "./PersonOverview";

export const FollowerList = () => {
    const { id } = useParams();
    const [user, setUser] = useState<User>({
        _id: "",
        username: "",
        introduction: "",
        followers: [],
        following: [],
    });
    const [loggedUser, setLoggedUser] = useState(null);

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
    }, [id]);
    return (
        <div className="d-flex flex-column bg-dark min-vh-100">
            <Navbar />
            <div className="col-md-6 offset-md-3 border flex-column flex-grow-1">
                <PersonalProfile user={user} setUser={setUser} loggedUser={loggedUser} />
                <ProfileNavBar id={id + "/" || ""} curPage="followers" />
                {user.followers.length === 0 ? (
                    <h4 className="d-flex text-white justify-content-center mt-3">
                        {loggedUser != null && id === loggedUser
                            ? "You have not followed anyone yet!"
                            : "This user has not followed anyone yet."}
                    </h4>
                ) : (
                    user.followers.map((follower, index) => (
                        <PersonOverview key={index} />
                    ))
                )}
            </div>
        </div>
    );
};
