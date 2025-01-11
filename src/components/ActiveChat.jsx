import React from 'react'
import {Container, Image} from 'react-bootstrap'
import ActiveChatHeader from './ActiveChatHeader'
import ActiveChatInput from './ActiveChatInput'
import {useSelector, useDispatch} from 'react-redux'
import {format} from 'timeago.js'

const ActiveChat = ({setChatInfo}) => {

  const {messages, currentChat: {admin, profileImg: receiverImg}} = useSelector(state=>state.chats.data)
  const {uid, profileImg} = useSelector(state=>state.user.data)

  return (
    <Container fluid={true} className='p-0 d-flex flex-column h-100'>
      <ActiveChatHeader setChatInfo={setChatInfo}/>
      <Container className='overflow-y-auto h-100 d-flex flex-column p-3' fluid>
        {
          messages?.map((message)=>{
            return admin===undefined?(
              <div 
                className={`message d-flex align-items-end mb-4 ${message.senderId === uid?'flex-row-reverse owner':''}`}
              >
                <Image 
                  src={message.senderId === uid?profileImg:receiverImg} 
                  className='profile-avatar object-fit-cover mb-3'
                  roundedCircle
                />
                <div className="text-box px-2 mw-100 text-break">
                  <p className="text fs-6 text-1 p-3 m-0">
                    {
                      message?.text
                    }
                  </p>
                  <p className='m-0 text-2' style={{fontSize: '12px'}}>
                    {
                      format(message.createdAt.toDate())
                    }
                  </p>
                </div>
              </div>
            ):(
              <div 
                className={`message d-flex align-items-end mb-4 ${message.senderId === uid?'flex-row-reverse owner':''}`}
              >
                <Image 
                  src={message.profileImg} 
                  className='profile-avatar object-fit-cover mb-3'
                  roundedCircle
                />
                <div className="text-box px-2 mw-100 text-break">
                  <p className="text fs-6 text-1 p-3 m-0 d-flex flex-column">
                    <span className='fw-bolder mb-2'>{message.username}</span>
                    {
                      message?.text
                    }
                  </p>
                  <p className='m-0 text-2' style={{fontSize: '12px'}}>
                    {
                      format(message.createdAt.toDate())
                    }
                  </p>
                </div>
              </div>
            )
          })
        }
      </Container>
      <ActiveChatInput/>
    </Container>
  )
}

export default ActiveChat