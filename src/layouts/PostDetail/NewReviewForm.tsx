import { useState } from "react";
import { Link } from "react-router-dom";

export const NewReviewForm: React.FC<{curUser: string | null, postComment: any, curComment: string, handleChange: any}> = ({curUser, postComment, curComment, handleChange}) => {
    return (
        <>
            {curUser === null ? <div className="card bg-dark border border-white">
                                    <div className="card-body text-white fw-bold">
                                        You must <Link className="btn text-light border-light fw-bold" style={{ borderWidth: "2px" }} to='/login'>login</Link> to review or upvote a post!
                                    </div>
                                </div>:
                                <form className="border border-white" onSubmit={postComment}>
                                <div className="m-2">
                                    <label
                                        htmlFor="comment"
                                        className="form-label text-white fs-6"
                                    >
                                        Leave your comment here
                                    </label>
                                    <textarea
                                        className={`form-control bg-dark text-white ${curComment === '' ? 'disabled' : ''}`}
                                        id="comment"
                                        rows={3}
                                        onChange={handleChange}
                                        value={curComment}
                                        required
                                    ></textarea>
                                    <button
                                        type="submit"
                                        className="btn mt-3 text-light border-light fw-bold"
                                        style={{ borderWidth: "2px" }}
                                    >
                                        Comment
                                    </button>
                                </div>
                            </form>}
        </>
    )
}