import React, { useEffect, useState } from "react";
import "./Home.css";
import Post from "../post/Post";
import Loader from "../loader/Loader";
import UserContainer from "../userContainer/userContainer";
const baseUrl = "https://dummyapi.io/data/v1";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPost = () => {
    fetch(`${baseUrl}/post?page=12&limit=15`, {
      headers: {
        "app-id": "62b840cfcda001670c88fd2a",
      },
    })
      .then((response) => {
        setLoading(false);
        return response.json();
      })
      .then((post) => setPosts(post.data))
      .catch((err) => console.log("error"));
  };
  const fetchUser = () => {
    fetch(`${baseUrl}/user?limit=5`, {
      headers: {
        "app-id": "62b840cfcda001670c88fd2a",
      },
    })
      .then((res) => {
        setLoading(false);
        return res.json();
      })
      .then((user) => {
        console.log(user.data);
        setUsers(user.data);
      })
      .catch((err) => console.log("error"));
  };
  useEffect(() => {
    fetchPost();
    fetchUser();
  }, []);

  return (
    <>
      <div className="container">
        <div className="navbar">
          <h2 className="headerName">Interactive comment section</h2>
        </div>
        {loading ? (
          <Loader text="posts" />
        ) : (
          <div className="row">
            <div className="postContainer">
              {posts.map((item) => (
                <Post
                  img={item.image}
                  picture={item.owner.picture}
                  name={{
                    fName: item.owner.firstName,
                    lName: item.owner.lastName,
                  }}
                  likes={item.likes}
                  tags={item.tags}
                  text={item.text}
                  time={item.publishDate}
                  id={item.id}
                  key={item.id}
                  item={item}
                />
              ))}
            </div>
            <div className="usersContainer">
              <h4>Suggestions For You</h4>
              <div className="col">
                {users.map((user) => {
                  return <UserContainer user={user} />;
                })}
              </div>

              <h5> &copy; 2022 COMMENT_IT BY ROHIT</h5>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
