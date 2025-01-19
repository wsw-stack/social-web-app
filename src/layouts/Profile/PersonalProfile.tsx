export const PersonalProfile: React.FC<{username: string, introduction: string}> = ({username, introduction}) => {
    return (
        <div className="card">
            <div className="card-body bg-dark">
                <h4 className="card-title text-white fw-bold">{username}</h4>
                <p className="mb-3 text-light">{introduction === '' ? 'This user has no introduction yet': introduction}</p>
                <p className="text-white fw-bold">1 <span className="text-secondary be-1 fw-normal">Following</span> 2 <span className="text-secondary fw-normal">Followers</span></p>
            </div>
        </div>
    )
}