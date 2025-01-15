import {useState} from 'react'
import {Form, Button, InputGroup} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import { sendGroupMessages, sendMessages } from '../features/chatsSlice'
import EmojiPicker from 'emoji-picker-react'

const ActiveChatInput = () => {

  const [text, setText] = useState('')
  const dispatch = useDispatch()
  const {isCurrentUserBlocked, isReceiverBlocked, currentChat} = useSelector(state=>state.chats.data)
  const [open, setOpen] = useState(false)

  const handleEmoji = (e) =>{
    setText(prev => prev + e.emoji)
    setOpen(false)
  }

  const handleChange = (e) => {
    setText(e.target.value)
  }

  const handleSend = (e) =>{
    e.preventDefault()

    if(text === '') return;

    if(currentChat?.admin !== undefined) dispatch(sendGroupMessages(text))
    else dispatch(sendMessages(text))

    setText("")
  }
  return (
    <div className="active-chat-input px-2 px-sm-3 py-3">
      {
        isCurrentUserBlocked ? (
          <p className='blocked-message text-2 m-0 p-2 p-sm-3 text-center rounded-1'>
            You cannot reply to this conversation.
          </p>
        ): isReceiverBlocked?(
          <p className='blocked-message text-2 m-0 p-2 p-sm-3 text-center rounded-1'>
            You have blocked this user.
          </p>
        ):(
          <Form className='d-flex gap-3' onSubmit={handleSend}>
            <InputGroup className='w-100'>
              <Form.Control 
                type="text" 
                placeholder="Type Your Message Here..." 
                className='p-2 p-sm-3 fs-6 border-0 input-1'
                value={text}
                onChange={handleChange}
                aria-describedby="basic-addon1"
              />
              <InputGroup.Text id="basic-addon1" onClick={()=>setOpen(prev=>!prev)} className='border-0 emoji-picker text-1'>
                <i class="bi bi-emoji-smile"></i>
              </InputGroup.Text>
              <EmojiPicker open={open} onEmojiClick={handleEmoji}/>
            </InputGroup>
            <Button className='rounded-circle px-sm-3 fs-5 btn-1 border-0 shadow text-1' type='submit'>
              <i class="bi bi-send-fill"></i>
            </Button>
          </Form>)
      }
    </div>
  )
}

export default ActiveChatInput