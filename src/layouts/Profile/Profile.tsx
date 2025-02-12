import { useParams } from "react-router-dom";
import { ProfileNavBar } from "./ProfileNavBar";
import { PersonalProfile } from "./PersonalProfile";
import { Navbar } from "../NavbarAndFooter/Navbar";
import { useEffect, useState } from "react";
import { User } from "../../models/User";
import { fetchCurrentUser } from "../../common";
import { IPost } from "../../models/Post";
import { Post } from "./Post";

export const Profile = () => {
    const { id } = useParams();
    const [user, setUser] = useState<User>({
        _id: "",
        username: "",
        introduction: "",
        followers: [],
        following: [],
    });
    const [loggedUser, setLoggedUser]: any = useState(null);
    const [allPosts, setAllPosts] = useState<IPost[]>([]);

    const follow = async () => {
        const updatedFollowers = user.followers
        updatedFollowers.push(loggedUser)
        setUser(oldUser => {
            return {
                ...oldUser,
                followers: updatedFollowers
            }
        })
        const response = await fetch(`http://localhost:8000/api/users/follow/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                followerId: loggedUser
            }),
        });
        const responseData = await response.json();
        if(responseData.success) {
            alert('success')
        }
    }

    const getAllPosts = async (id: any) => {
        const response = await fetch(
            `http://localhost:8000/api/posts/user/${id}`
        );
        const responseData = await response.json();
        if (responseData.posts) {
            setAllPosts(responseData.posts);
        }
    };

    useEffect(() => {
        const getProfileUser = async (id: any) => {
            const response = await fetch(
                `http://localhost:8000/api/users/${id}`
            );
            const responseData = await response.json();
            const sessionUser = await fetchCurrentUser();
            setLoggedUser(sessionUser);
            setUser(responseData);
        };
        getAllPosts(id);
        getProfileUser(id);
    }, [id, user]);

    return (
        <div className="d-flex flex-column bg-dark min-vh-100">
            <Navbar />
            <div className="col-md-6 offset-md-3 border flex-column flex-grow-1">
                <PersonalProfile user={user} setUser={setUser} loggedUser={loggedUser}/>
                <ProfileNavBar id={id + "/" || ""} curPage="profile" />
                {allPosts.length === 0 ? (
                    <h4 className="d-flex text-white justify-content-center mt-3">
                        {loggedUser != null && id === loggedUser ? 
                            "You have no posts yet! Ready to make your first post?"
                        :
                            "This user has no posts yet."
                        }
                    </h4>
                ) : (
                    allPosts.map((post, index) => (
                        <Post post={post} key={index} username={user.username} />
                    ))
                )}
            </div>
        </div>
    );
};
