import { Link, useParams } from "react-router-dom";
import { User } from "../../models/User";
import { useEffect, useState } from "react";

export const PersonalProfile: React.FC<{
    user: User;
    setUser: any;
    loggedUser: any;
}> = ({ user, loggedUser, setUser }) => {
    const {id} = useParams()
    const [followed, setFollowed] = useState(false)
    const follow = async () => {
        const updatedFollowers = user.followers;
        updatedFollowers.push(loggedUser);
        setUser((oldUser: User) => {
            return {
                ...oldUser,
                followers: updatedFollowers,
            };
        });
        const response = await fetch(
            `http://localhost:8000/api/users/follow/${id}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    followerId: loggedUser,
                }),
            }
        );
        const responseData = await response.json();
        if (responseData.success) {
            alert("success");
        }
    };
    const checkFollowed = () => {
        for(let follower of user.followers) {
            if(loggedUser != null && follower._id === loggedUser) {
                return true
            }
        }
        return false
    }
    useEffect(() => {
        setFollowed(checkFollowed())
    }, [user, loggedUser])
    return (
        <div className="card">
            <div className="card-body bg-dark">
                <h4 className="card-title text-white fw-bold">
                    {user.username}
                </h4>
                <p className="mb-3 text-light">
                    {user.introduction === ""
                        ? "This user has no introduction yet"
                        : user.introduction}
                </p>
                <div className="d-flex">
                    <span className="text-white fw-bold">
                        {user.following.length}{" "}
                    </span>
                    <span className="text-secondary ms-1">Following</span>
                    <span className="text-white fw-bold ms-2">
                        {user.followers.length}{" "}
                    </span>
                    <span className="text-secondary ms-1">Followers</span>
                    {loggedUser !== null && user._id === loggedUser && (
                        <div className="ms-auto">
                            <Link
                                to="/profile/edit"
                                className="btn btn-primary"
                            >
                                Edit Profile
                            </Link>
                        </div>
                    )}
                    {loggedUser !== null && !followed && (
                        <div className="ms-auto">
                            <button className="btn btn-primary" onClick={follow}>Follow</button>
                        </div>
                    )}
                    {loggedUser !== null && followed && (
                        <div className="ms-auto">
                            <button className="btn btn-primary">UnFollow</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
