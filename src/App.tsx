import { Routes, Route } from "react-router-dom";
import { Login } from "./layouts/LoginRegister/Login";
import { Register } from "./layouts/LoginRegister/Register";
import { Home } from "./layouts/homepage/Home";
import { NewPost } from "./layouts/NewPost/NewPost";
import { Details } from "./layouts/PostDetail/Details";
import { Profile } from "./layouts/Profile/Profile";
import { FollowerList } from "./layouts/Profile/FollowerList";
import { FollowingList } from "./layouts/Profile/FollowingList";
import { HistoricComments } from "./layouts/Profile/HistoricComments";
import { ReviewDetails } from "./layouts/ReviewDetail/ReviewDetail";
import { EditProfile } from "./layouts/Profile/EditProfile";

export const App = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<NewPost />} />
            <Route path="/detail/:id" element={<Details />} />
            <Route path="/reviews/:id" element={<ReviewDetails />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/profile/:id/followers" element={<FollowerList />} />
            <Route
                path="/profile/:id/comments"
                element={<HistoricComments />}
            />
            <Route path="/profile/:id/following" element={<FollowingList />} />
            <Route path="/profile/edit" element={<EditProfile />} />
        </Routes>
    );
};
