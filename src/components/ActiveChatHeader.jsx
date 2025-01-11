import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Image, Button} from 'react-bootstrap'
import { toggleBlock, clearCurrentChat } from '../features/chatsSlice'

const ActiveChatHeader = ({setChatInfo}) => {

    const {currentChat: {admin, profileImg, username, status, groupImg, groupName}, isReceiverBlocked, isCurrentUserBlocked} = useSelector(state=>state.chats.data)
    const dispatch = useDispatch()

    const handleClick = () =>{
        setChatInfo(true)
    }
    const handleBlock = () =>{
        dispatch(toggleBlock())
      }
      
      const handleBack = () =>{
        dispatch(clearCurrentChat())
      }

  return (
        admin===undefined?(
            <div className='d-flex p-2 p-sm-3 align-items-center active-chat-header'>
                <Button className='border-0 bg-transparent p-0 pe-2 pe-sm-3 fs-5' onClick={handleBack}>
                    <i class="bi bi-arrow-left"></i>
                </Button>
                <Image 
                    src={profileImg} 
                    className='profile-avatar ' 
                    roundedCircle
                    onClick={handleClick}
                />
                <div className='ps-2 flex-grow-1' onClick={handleClick}>
                    <h1 className='fs-6 text-1 m-0 ellipses'>{username}</h1>
                    <p className='m-0 text-2 fs-6 ellipses'>{status}</p>
                </div>
                <Button 
                    className='border-0 bg-transparent p-0 fs-5 text-danger' 
                    disabled={isCurrentUserBlocked}
                    onClick={handleBlock}
                >
                    <i className="bi bi-ban"></i>
                </Button>
            </div>
        ):(
            <div className='d-flex p-2 p-sm-3 align-items-center active-chat-header'>
                <Button className='border-0 bg-transparent p-0 pe-2 pe-sm-3 fs-5' onClick={handleBack}>
                    <i class="bi bi-arrow-left"></i>
                </Button>
                <Image 
                    src={groupImg} 
                    className='profile-avatar ' 
                    roundedCircle
                    onClick={handleClick}
                />
                <div className='px-2 flex-grow-1' onClick={handleClick}>
                    <h1 className='fs-6 text-1 m-0'>{groupName}</h1>
                    <p className='m-0 text-2 fs-6 ellipses'>Tap to see group info!</p>
                </div>
            </div>
        )
    
  )
}

export default ActiveChatHeader