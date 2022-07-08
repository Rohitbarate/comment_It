import React, { useState, useEffect } from 'react'
import './Post.css'
import { BsThreeDots, BsHeart, BsChat, BsSave } from 'react-icons/bs';
import { FiSend } from 'react-icons/fi';
import { Link } from 'react-router-dom'


const Post = (props) => {
        const [comments, setComments] = useState([])
        const { img, picture, name, text, tags, likes, time, id, item } = props;

        const fetchComments = () => {
                fetch(`https://dummyapi.io/data/v1/post/${id}/comment`, {
                        headers: {
                                'app-id': '62b840cfcda001670c88fd2a'
                        }
                }).then(response => {
                        return response.json()
                }).then((comnt) => setComments(comnt.data))
                        .catch((err) => console.log("error", err));
        }
        useEffect(() => {
                fetchComments();
                // eslint-disable-next-line
        }, [])

        return (
                <div className='mainBox'>
                        <div className="headerBox">
                                <div className="user">
                                        <img src={picture} alt="error" className='userImg' />
                                        <span className='userName'>{name.fName}_{name.lName}</span>
                                </div>
                                <span className='moreButton'> <BsThreeDots /></span>
                        </div>

                        <div className="bodyBox">
                                <img src={img} alt="error" className='postImg' />
                        </div>
                        <div className="footerBox">
                                <div className="buttons">
                                        <BsHeart className='icon' />
                                        <Link to="./CommentContainer" state={{ item: item, comments: comments }} > <BsChat className='icon' /></Link>
                                        <FiSend className='icon' />
                                </div>
                                <BsSave className='icon' />
                        </div>
                        {/* comment component  */}
                        <div className="commCont">
                                <div className="likes bold">
                                        {likes} likes
                                </div>
                                <div className="title">
                                        <span className='bold'>{name.fName}_{name.lName}</span>: {text}
                                </div>
                                <div className="tags bold">
                                        #{tags}
                                </div>
                                <div className="comtNum">
                                        <Link to='./CommentContainer' state={{ item: item, comments: comments }} >{comments && comments.length !== 0 ? `see all ${comments.length} comments` : `no comments`}</Link>
                                </div>
                                <div className="time" >
                                        {new Date(time).toUTCString()}
                                </div>

                        </div>

                </div>
        )
}

export default Post