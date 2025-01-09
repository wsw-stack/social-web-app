import '../../App.css'
import { Footer } from '../NavbarAndFooter/Footer'

export const NewPost = () => {
    return (
        <div className="d-flex flex-column bg-dark min-vh-100">
            <div className="row flex-grow-1 justify-content-center align-items-center">
                <div className="col-md-6">
                    <div className="d-flex justify-content-center">
                        <h3 className="card-title text-white">Create a New Post</h3>
                    </div>
                    <form>
                        <div className="mb-3">
                            <div className="col-6 offset-3">
                                <form>
                                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
                                    <textarea className="form-control" id="exampleFormControlTextarea1" rows={6} placeholder="Post your feelings here..."></textarea>
                                    <div className="d-flex justify-content-center">
                                        <button type="submit" className="btn mt-3 text-light border-light fw-bold" style={{ borderWidth: '2px' }}>
                                            Post
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    )
}