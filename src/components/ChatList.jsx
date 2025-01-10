import {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { checkBlocked, clearBlocked, getChatList, getCommonGroups, getGroupList, getMessages, updateChatList, updateGroupList } from '../features/chatsSlice'
import {ListGroup, Image} from 'react-bootstrap'
import {format} from 'timeago.js'

const ChatList = ({search}) => {
    const {chatList, groupList, currentChat} = useSelector(state=>state.chats.data)
    const {uid, blocked} = useSelector(state=>state.user.data)
    const dispatch = useDispatch()
    const [list, setList] = useState([])

    const handleGroupClick = (group) =>{

        dispatch(getMessages(group))
        dispatch(clearBlocked())
        const chatIndex = chatList.findIndex(
            (item) => item.chatId === group.chatId
        );

        if(groupList[chatIndex]?.isSeen) return;

        let newChatList = []

        groupList.forEach((c)=>{
            if(c.chatId === group.chatId){
                newChatList = [...newChatList, {...c, isSeen: true}]
            }else{
                newChatList = [...newChatList, c]
            }
        })

        dispatch(updateGroupList(newChatList))

    }

    const handleClick = (chat) =>{

        if(chat.chatId === currentChat.chatId) return

        dispatch(getMessages(chat))
        dispatch(getCommonGroups(chat.uid))
        
        const chatIndex = chatList.findIndex(
            (item) => item.chatId === chat.chatId
        );

        dispatch(checkBlocked({
            currentId: uid,
            currentBlockList: blocked, 
            receiverId: chatList[chatIndex].receiverId, 
            receiverBlockList: chatList[chatIndex].blocked}))
        
        if(chatList[chatIndex]?.isSeen) return;

        let newChatList = []

        chatList.forEach((c)=>{
            if(c.chatId === chat.chatId){
                newChatList = [...newChatList, {...c, isSeen: true}]
            }else{
                newChatList = [...newChatList, c]
            }
        })

        dispatch(updateChatList(newChatList))
    }

    useEffect(()=>{
        dispatch(getChatList())
        dispatch(getGroupList())
    }, [])


    useEffect(()=>{
        setList([...chatList, ...groupList].sort((a,b)=> b.updatedAt - a.updatedAt))
    }, [chatList, groupList])

    useEffect(()=>{
        if(search !== ''){
            setList([...chatList.filter((item)=>{
                    return item.username.toLowerCase().includes(search.toLowerCase())
                }),
                ...groupList.filter((item)=>{
                    return item.groupName.toLowerCase().includes(search.toLowerCase())
                })
            ].sort((a,b)=> b.updatedAt - a.updatedAt))
        }else{
            setList([...chatList, ...groupList].sort((a,b)=> b.updatedAt - a.updatedAt))
        }
    }, [search, groupList, chatList])

  return (
    <ListGroup className='border-0 flex-grow-1 overflow-y-auto'>
        {
            list?.length !== 0?(
                list?.map((chat)=>{
                    return chat?.admin === undefined?(
                        <ListGroup.Item 
                            key={chat.chatId}
                            className='bg-transparent px-2 py-3 d-flex align-items-center' 
                            role='button'
                            onClick={()=>handleClick(chat)}
                        >
                            <Image 
                                src={chat.profileImg} 
                                className='profile-avatar' 
                                roundedCircle
                            />
                            <div className='w-100 px-2'>
                                <h4 className='mb-1 fs-6 text-white ellipses'>{chat.username}</h4>
                                {  
                                    chat.lastMessage &&             
                                    <p className='ellipses m-0 text-secondary'>
                                        {chat.lastMessage}  
                                    </p>
                                }
                            </div>
                            <p className='m-0 fw-light text-secondary text-end' style={{fontSize: '12px', width: '100px'}}>
                                {format(chat.updatedAt)}
                            </p>
                        </ListGroup.Item>
                    ):(
                        <ListGroup.Item 
                            key={chat.chatId}
                            className='bg-transparent px-2 py-3 d-flex align-items-center' 
                            role='button'
                            onClick={()=>handleGroupClick(chat)}
                        >
                            <Image 
                                src={chat.groupImg} 
                                className='profile-avatar' 
                                roundedCircle
                            />
                            <div className='w-100 px-2'>
                                <h4 className='mb-1 fs-6 text-white ellipses'>{chat.groupName}</h4>
                                {  
                                    chat.lastMessage &&             
                                    <p className='ellipses m-0 text-secondary'>
                                        {chat.lastMessage}  
                                    </p>
                                }
                            </div>
                            <p className='m-0 fw-light text-secondary text-end' style={{fontSize: '12px', width: '100px'}}>
                                {format(chat.updatedAt)}
                            </p>
                        </ListGroup.Item>
                    )
                })
            ): (
                <></>
            )
        }
    </ListGroup>
  )
}

export default ChatList