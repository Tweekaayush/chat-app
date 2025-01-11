import React from 'react'
import {Container, Button, Image, ListGroup} from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import { toggleBlock, exitGroup } from '../features/chatsSlice'

const CurrentChatInfo = ({setChatInfo}) => {

  const {currentChat:{username, profileImg, status, admin, groupName, groupImg, members}, commonGroups, isCurrentUserBlocked, isReceiverBlocked} = useSelector(state=>state.chats.data)
  const {data} = useSelector(state=>state.user)
  const dispatch = useDispatch()

  return (
    <Container fluid className='d-flex flex-column p-0 h-100 w-100'>
      <Button className='border-0 bg-transparent px-3 pt-3 fs-5 align-self-start' onClick={()=>setChatInfo(false)}>
        <i class="bi bi-arrow-left"></i>
      </Button>
      <div className='d-flex flex-column align-items-center p-3' style={{borderBottom: '1px solid gray'}}>
        <Image 
          src={admin?groupImg:profileImg} 
          alt={admin?groupName:username}
          roundedCircle
          className='object-fit-cover mb-2'
          style={{height: '100px', width: '100px'}}
        />
        <h1 className='fs-3 text-1 text-center'>{admin?groupName:username}</h1>
        {status && <p className='fs-6 text-2 text-center m-0'>{status}</p>}
      </div>
      <div className='d-flex flex-column h-100'>
        <h3 className='text-1 fs-6 p-3'>
          {admin?'Members':`You have ${commonGroups.length} Group(s) in common.`}
        </h3>
        <ListGroup
          className='overflow-y-auto h-100'
        > 
        {
          admin?(
            [data, ...members]?.map((member)=>{
              return <ListGroup.Item 
                        key={member.uid} 
                        className='d-flex bg-transparent p-3'
                      >
                          <Image
                            src={member.profileImg} 
                            alt={member.username} 
                            className='profile-avatar' 
                            roundedCircle
                          />
                          <div className='px-2 d-flex justify-content-between w-100 align-items-center'>
                              <h2 className='fs-6 text-1 m-0'>{member.username}</h2>
                              {admin === member.uid && <span style={{fontSize: '12px'}} className='text-2'>Admin</span>}
                          </div>
                      </ListGroup.Item>
            })
          ):(
            commonGroups?.map((group)=>{
              return <ListGroup.Item 
                        key={group.chatId} 
                        className='d-flex align-items-center bg-transparent p-3'
                      >
                          <Image 
                            src={group.groupImg} 
                            alt={group.groupName} 
                            className='profile-avatar' 
                            roundedCircle
                          />
                          <div className='px-2'>
                              <h2 className='fs-6 text-1 m-0'>{group.groupName}</h2>
                          </div>
                      </ListGroup.Item>
            })
          )
        }
        </ListGroup>
      </div>
      <div className='p-3'>
        {
          admin?
          <Button 
            variant='danger'
            onClick={()=>dispatch(exitGroup())}
            className='w-100'
          >
            Exit Group
          </Button> 
          :
          <Button 
            variant='danger' 
            disabled={isCurrentUserBlocked} 
            onClick={()=>dispatch(toggleBlock())} 
            className='w-100'
          >
            {isReceiverBlocked?'Blocked':'Block'}
          </Button>
        }
      </div>
    </Container>
  )
}

export default CurrentChatInfo