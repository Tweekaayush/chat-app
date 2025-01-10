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
    <div className="active-chat-input p-3">
      {
        isCurrentUserBlocked ? (
          <p className='blocked-message text-secondary m-0 p-3 text-center rounded-1'>
            You cannot reply to this conversation.
          </p>
        ): isReceiverBlocked?(
          <p className='blocked-message text-secondary m-0 p-3 text-center rounded-1'>
            You have blocked this user.
          </p>
        ):(
          <Form className='d-flex gap-3' onSubmit={handleSend}>
            <InputGroup controlId="form-group-id" className='w-100'>
              <Form.Control 
                type="text" 
                placeholder="Type Your Message Here..." 
                className='p-3 fs-6 border-0'
                value={text}
                onChange={handleChange}
                aria-describedby="basic-addon1"
              />
              <InputGroup.Text id="basic-addon1" onClick={()=>setOpen(prev=>!prev)} className='border-0'>
                <i class="bi bi-emoji-smile"></i>
              </InputGroup.Text>
              <EmojiPicker open={open} onEmojiClick={handleEmoji} />
            </InputGroup>
            <Button className='rounded-circle px-3 fs-5'>
              <i class="bi bi-send-fill"></i>
            </Button>
          </Form>)
      }
    </div>
  )
}

export default ActiveChatInput