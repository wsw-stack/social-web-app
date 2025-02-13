import { Link } from "react-router-dom";
import { User } from "../../models/User";

export const PersonOverview: React.FC<{ person: User }> = ({ person }) => {
    return (
        <div className="card">
            <div className="card-body bg-dark">
                <Link to={`/profile/${person._id}`} className="card-title text-white fw-bold">{person.username}</Link>
                <p className="card-text text-white">
                    {person.introduction === ""
                        ? "This user has no introduction yet"
                        : person.introduction}
                </p>
            </div>
        </div>
    );
};
