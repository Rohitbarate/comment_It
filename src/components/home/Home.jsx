import React, { useEffect, useState } from 'react'
import './Home.css'
import Post from '../post/Post'
import Loader from '../loader/Loader'
const baseUrl = "https://dummyapi.io/data/v1"

const Home = () => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchPost = () => {
        fetch(`${baseUrl}/post?page=10&limit=15`, {
            headers: {
                'app-id': '62b840cfcda001670c88fd2a'
            }
        }).then(response => {
            setLoading(false)
            return response.json()

        }).then((post) => setPosts(post.data))
            .catch((err) => console.log("error"));
    }
    useEffect(() => {
        fetchPost();
    }, [])

    return (
        <>
            <div className='container'>
                <div className='navbar' >
                    <h2 className='headerName'>Interactive comment section</h2>
                </div>
                <div className='postContainer'>
                    {loading ? <Loader /> : posts.map((item) => (
                        <Post img={item.image} picture={item.owner.picture} name={{ fName: item.owner.firstName, lName: item.owner.lastName }} likes={item.likes} tags={item.tags} text={item.text} time={item.publishDate} id={item.id} key={item.id} item={item} />
                    ))
                    }
                </div>
            </div>
        </>
    )
}

export default Home