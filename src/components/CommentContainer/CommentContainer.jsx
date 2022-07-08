import React, { useState, useEffect } from 'react'
import './CommentContainer.css'
import { Link, useLocation } from 'react-router-dom'
import { ImCross } from 'react-icons/im'
import { BsThreeDots, BsEmojiSmile } from 'react-icons/bs'
import { RiDeleteBinLine } from "react-icons/ri";
import Loader from '../loader/Loader'
const baseUrl = "https://dummyapi.io/data/v1"

function CommentContainer() {
    const location = useLocation()
    const { item, comments } = location.state
    const [cmnts, setCmnts] = useState(comments)
    const [msg, SetMsg] = useState("")
    const [loading, setLoading] = useState(true)

    //  fetch all coments 
    const fetchComments = () => {
        fetch(`${baseUrl}/post/${item.id}/comment`, {
            headers: {
                'app-id': '62b840cfcda001670c88fd2a'
            }
        }).then(response => {
            setLoading(false)
            return response.json()
        }).then((comnt) => setCmnts(comnt.data))
            .catch((err) => console.log("error", err));

    }
    useEffect(() => {
        fetchComments();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cmnts])

    //  create comment logic 
    const createComment = async () => {
        const postId = item.id;
        const ownerId = item.owner.id;
        const msgInput = document.getElementById('msgInput')
        if (!msg) {
            msgInput.placeholder = " *message can not be blank"
        }
        else {
            msgInput.placeholder = "Add a comment..."
            let bodyData = {
                post: postId,
                owner: ownerId,
                message: msg
            }
            fetch(`${baseUrl}/comment/create`, {
                method: "POST",
                headers: {
                    "app-id": "62b840cfcda001670c88fd2a",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(bodyData),

            }).then(response => {
                return (
                    response.json()
                )
            }).then((comnt) => { setCmnts([...cmnts, comnt]) })
                .catch((err) => console.log("error", err));
            SetMsg("")


        }
    }
    //  delete comment logic 
    const deleteComment = (id) => {
        fetch(`${baseUrl}/comment/${id}`, {
            method: 'DELETE',
            headers: {
                "app-id": "62b840cfcda001670c88fd2a"
            },
        }).then((data) => { return data.json() })

    }

    return (
        <div className='commentContainer'>
            <Link to="/" ><ImCross className='icon cancelIcon' /></Link>
            <div className="commentBox">
                <div className="postBox">
                    <img src={item.image} className="postImgChat" alt='error' />
                </div>
                <div className="chatBox">
                    <div className="headerChatBox">
                        <div className="user">
                            <img src={item.owner.picture} alt="error" className='UserImg' />
                            <span className='userName'>{item.owner.firstName}_{item.owner.lastName}</span>
                        </div>
                        <span className='moreButton'> <BsThreeDots className='icon' /></span>
                    </div>
                    <div className="col">
                        <div className="commentChatBox">
                            {loading
                                ?
                                <Loader />
                                :
                                [cmnts.length === 0
                                    ?
                                    <p>No comments till now. 😥😥</p>
                                    :
                                    [cmnts.map((ele) => {
                                        return (
                                            <div className="CmntChatBox">
                                                <div className="cmntUser">
                                                    <div className='row'>
                                                        <img src={ele.owner.picture} alt="error" className='comntUserImg' />
                                                        <span className='userName'>{ele.owner.firstName}_{ele.owner.lastName}</span>
                                                    </div>
                                                    <span className='moreButton'> <RiDeleteBinLine className='icon deleteIcon ' onClick={() => deleteComment(ele.id)} /></span>
                                                </div>
                                                <span className='cmntText'>{ele.message}</span>

                                            </div>
                                        )
                                    })
                                    ]
                                ]
                            }

                        </div>
                        <div className="chatBottom">
                            <BsEmojiSmile className='icon smileIcon' />
                            <input type="text" value={msg} onChange={(e) => SetMsg(e.target.value)} id='msgInput' placeholder='Add a comment...' />
                            <span onClick={createComment}>Post</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommentContainer