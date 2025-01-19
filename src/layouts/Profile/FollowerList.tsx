import { useParams, Link } from "react-router-dom";
import { PersonalProfile } from "./PersonalProfile";
import { ProfileNavBar } from "./ProfileNavBar";
import { useState, useEffect } from "react";

export const FollowerList = () => {
    const { id } = useParams();
    const [user, setUser] = useState({
        username: "",
        introduction: "",
    });
    useEffect(() => {
        const getCurUser = async (id: any) => {
            const response = await fetch(
                `http://localhost:8000/api/users/${id}`
            );
            const responseData = await response.json();
            console.log(responseData)
            const newUser = {
                username: responseData.username,
                introduction: responseData.introduction,
            };
            setUser(newUser);
        };
        getCurUser(id);
    }, [id]);
    return (
        <div className="d-flex flex-column bg-dark min-vh-100 pt-3">
            <div className="col-md-6 offset-md-3 border min-vh-100">
                <PersonalProfile username={user.username} introduction={user.introduction}/>
                <ProfileNavBar id={id + "/" || ""} curPage="followers" />
                <div className="card">
                    <div className="card-body bg-dark">
                        <p className="card-title text-white fw-bold">
                            老周横眉
                        </p>
                        <p className="card-text text-white">
                            原本是墙内时政批判类头部主播，微信视频号被下架几十个10万+，目前墙内已全面封杀。油管4个月破10万订阅。大马华人，美国8年，上海15年（2008~2023），现在新加坡；斯坦福计算机系，前金融企业CEO。{" "}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
