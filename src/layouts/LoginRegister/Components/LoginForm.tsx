import { Link } from "react-router-dom"

export const LoginForm = () => {
    return (
        <div className="col-md-6">
            <form>
                <div className="card bg-dark border-white">
                    <div className="card-body">
                        <div className="d-flex justify-content-center">
                            <h3 className="card-title text-white">Login</h3>
                        </div>
                        <div className="m-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label text-white fs-5">Email address</label>
                            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                        </div>
                        <div className="m-3">
                            <label htmlFor="exampleFormControlInput2" className="form-label text-white fs-5">Password</label>
                            <input type="password" className="form-control" id="exampleFormControlInput2" />
                        </div>
                        <div className="d-flex justify-content-center">
                            <Link to='/register' className="fw-bold">Don't have an account yet? Click here to register.</Link>
                        </div>
                        <div className="d-flex justify-content-center">
                            <button type="submit" className="btn mt-3 text-light border-light fw-bold" style={{ borderWidth: '2px' }}>
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}