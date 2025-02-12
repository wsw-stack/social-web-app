import { Link } from "react-router-dom";
import { User } from "../../models/User";

export const PersonalProfile: React.FC<{
    user: User;
    loggedUser: string | null;
}> = ({ user, loggedUser }) => {
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
                    {loggedUser !== null && user._id !== loggedUser && (
                        <div className="ms-auto">
                            <button type="button" className="btn btn-primary">
                                Follow
                            </button>
                        </div>
                    )}
                    {loggedUser !== null && user._id === loggedUser && (
                        <div className="ms-auto">
                            <Link to="/profile/edit" className="btn btn-primary">
                                Edit Profile
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
