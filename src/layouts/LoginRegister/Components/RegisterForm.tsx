import { Link } from "react-router-dom"

export const RegisterForm = () => {
    return (
        <div className="col-md-6">
            <form>
                <div className="card bg-dark border-white">
                    <div className="card-body">
                        <div className="d-flex justify-content-center">
                            <h3 className="card-title text-white">Register</h3>
                        </div>
                        <div className="m-3">
                            <label htmlFor="email" className="form-label text-white fs-5">Email address</label>
                            <input type="email" className="form-control" id="email" placeholder="name@example.com" />
                        </div>
                        <div className="m-3">
                            <label htmlFor="username" className="form-label text-white fs-5">Username</label>
                            <input type="text" className="form-control" id="username" />
                        </div>
                        <div className="m-3">
                            <label htmlFor="password" className="form-label text-white fs-5">Password</label>
                            <input type="password" className="form-control" id="password" />
                        </div>
                        <div className="d-flex justify-content-center">
                            <Link to='/login' className="fw-bold">Already have an account? Click here to login.</Link>
                        </div>
                        <div className="d-flex justify-content-center">
                            <button type="submit" className="btn mt-3 text-light border-light fw-bold" style={{ borderWidth: '2px' }}>
                                Create New Account
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}