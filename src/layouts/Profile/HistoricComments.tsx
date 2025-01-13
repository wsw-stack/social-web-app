import { useNavigate, useParams } from "react-router-dom";
import { PersonalProfile } from "./PersonalProfile";
import { ProfileNavBar } from "./ProfileNavBar";

export const HistoricComments = () => {
    const navigate = useNavigate();
        const { id } = useParams()
    
        return (
            <div className="d-flex flex-column bg-dark pt-3">
                <div className="col-md-6 offset-md-3 border min-vh-100">
                    <PersonalProfile />
                    <ProfileNavBar id={id + "/" || ""} curPage='comments' />
                    <div className="card">
                        <div className="card-body bg-dark">
                            <p className="card-title text-white fw-bold">
                                Routers <span className="card-subtitle mb-2 text-secondary">10min ago</span>
                            </p>
                            <p className="card-text text-white">
                                Amazing young player!
                            </p>
                            <div className="d-flex justify-content-between align-items-center">
                                <button
                                    className='btn btn-sm btn-secondary'
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart-fill me-1" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                                    </svg>
                                    2
                                </button>
                                <button className="btn btn-sm btn-primary" onClick={() => navigate(`/detail/1`)}>View Original Post</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
}