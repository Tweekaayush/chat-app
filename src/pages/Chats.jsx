import {useEffect} from 'react'
import {Container, Row, Col, ButtonGroup, Button} from 'react-bootstrap'
import UserInfoHeader from '../components/UserInfoHeader'
import ChatList from '../components/ChatList'
import SearchUsers from '../components/SearchUsers'
import { useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import ActiveChat from '../components/ActiveChat'
import CurrentChatInfo from '../components/CurrentChatInfo'
import AddUser from '../components/AddUser'
import AddGroup from '../components/AddGroup'

const Chats = () => {

  const [search, setSearch] = useState('')
  const [addUserStatus, setAddUserStatus] = useState(false)
  const [addGroupStatus, setAddGroupStatus] = useState(false)
  const [chatInfo, setChatInfo] = useState(false)
  const {currentChat} = useSelector(state=>state.chats.data)

  useEffect(()=>{
    if(Object.keys(currentChat).length !== 0) {
        setChatInfo(false)
    }
}, [currentChat])

  useEffect(()=>{
    document.title = 'ChatApp | Chats'    
  },[])

  return (
    <Row
    style={{width: '1024px', height: '70vh'}} 
    className='container-c p-0 m-0 position-relative'>
      <AddUser show={addUserStatus} onHide={()=>setAddUserStatus(false)}/>
      <AddGroup show={addGroupStatus} onHide={()=>setAddGroupStatus(false)}/>
        <Col 
          lg={4} 
          className='container-cl px-0 py-2 d-flex flex-column'
        >
          <UserInfoHeader />
          <SearchUsers setSearch={setSearch} search={search}/>
          <ChatList search={search}/>
          <div className="btn-groups p-2 d-flex justify-content-end gap-2">
            <Button className='fs-4 py-1 px-2 border-0' onClick={()=>setAddUserStatus(true)}>
              <i class="bi bi-plus"></i>
            </Button>
            <Button className='fs-4 py-1 px-2 border-0' onClick={()=>setAddGroupStatus(true)}>
              <i class="bi bi-people"></i>
            </Button>
          </div>
        </Col>
        <Col 
          lg={8} 
          className='container-cr p-0 h-100'
        >
          {
                Object.keys(currentChat).length !== 0?(
                        !chatInfo?<ActiveChat setChatInfo={setChatInfo}/>: <CurrentChatInfo setChatInfo={setChatInfo}/>
                ): (
                    <div className='empty-chat-container d-flex justify-content-center align-items-center h-100 w-100'>
                        <h1 className='fs-4 text-center text-secondary'>Select a chat to start a conversation.</h1>
                    </div>
                )
            }
        </Col>
      </Row>
  )
}

export default Chats