import { Link } from "react-router-dom"

export const ProfileNavBar: React.FC<{id: string, curPage: string}> = ({id, curPage}) => {
    return (
        <ul className="nav nav-pills border">
            <div className="row w-100">
                <div className="col-3 d-flex justify-content-center align-items-center">
                    <li className="nav-item">
                        <Link className={`nav-link text-white ${curPage === 'profile' ? 'active' : ''}`} to={`/profile/${id}`}>Posts</Link>
                    </li>
                </div>
                <div className="col-3 d-flex justify-content-center align-items-center">
                    <li className="nav-item">
                        <Link className={`nav-link text-white ${curPage === 'comments' ? 'active' : ''}`} to={`/profile/${id}comments`}>Comments</Link>
                    </li>
                </div>
                <div className="col-3 d-flex justify-content-center align-items-center">
                    <li className="nav-item">
                        <Link className={`nav-link text-white ${curPage === 'following' ? 'active' : ''}`} to={`/profile/${id}following`}>Following</Link>
                    </li>
                </div>
                <div className="col-3 d-flex justify-content-center align-items-center">
                    <li className="nav-item">
                        <Link className={`nav-link text-white ${curPage === 'followers' ? 'active' : ''}`} to={`/profile/${id}followers`}>Followers</Link>
                    </li>
                </div>
            </div>
        </ul>
    )
}