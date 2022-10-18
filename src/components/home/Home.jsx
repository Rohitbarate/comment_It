import React, { useEffect, useState } from "react";
import "./Home.css";
import Post from "../post/Post";
import Loader from "../loader/Loader";
import UserContainer from "../userContainer/userContainer";
const baseUrl = "https://dummyapi.io/data/v1";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(Math.ceil(Math.random() * 100 + 1));
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPost = () => {
    fetch(`${baseUrl}/post?page=${page}&limit=5`, {
      headers: {
        "app-id": "62b840cfcda001670c88fd2a",
      },
    })
      .then((response) => {
        setLoading(false);
        fetchUser();
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
        setUsers(user.data);
      })
      .catch((err) => console.log("error"));
  };
  useEffect(() => {
    fetchPost();
    // eslint-disable-next-line
  }, [page]);

  return (
    <>
      <div className="container">
        <div className="navbar">
          <div className="logoDiv">
            <span className="logo">Comment It</span></div>
          <div className="navRow">
            <div className="navLink">Home</div>
            <div className="navLink">About</div>
            <div className="navLink">Help</div>
          </div>
        </div>
        {loading ? (
          <Loader text="posts" />
        ) : (
          <div className="row">
            <div className="postContainer">
              {posts.map((item) => (
                <Post
                  key={item.id}
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
                  item={item}
                />
              ))}
              <button
                className="seeMoreBtn"
                onClick={() => {
                  setPage(page + 1)
                  setLoading(true);
                }}
              >
                see more
              </button>
            </div>
            <div className="usersContainer">
              <h4>Suggestions For You</h4>
              <div className="col">
                {users.map((user) => {
                  return <UserContainer user={user} key={user.id} />;
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
