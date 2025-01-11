import {useState, useEffect, useCallback} from 'react'
import {Modal, Form, ListGroup, Image, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import { getUsers, clearUsers, addUser } from '../features/chatsSlice';


const AddUser = (props) => {
    const [userInput, setUserInput] = useState('')
    const dispatch = useDispatch()
    const {users: userList, chatList} = useSelector(state=>state.chats.data)
    const {uid} = useSelector(state=>state.user.data)
    const [filteredUsers, setFilteredUsers] = useState([])

    const searchUsers = useCallback(() =>{
        if(!userInput){
            dispatch(clearUsers())
        }else  dispatch(getUsers(userInput.trim()))
    }, [userInput])

    const handleAdd = (uid) =>{
        dispatch(addUser(uid))
        setUserInput('')
    }

    useEffect(()=>{

        const timeout = setTimeout(searchUsers, 1000)
        
        return ()=> clearTimeout(timeout)

    }, [searchUsers])

    useEffect(()=>{
        setFilteredUsers(userList.filter((user)=>user.uid !== uid).filter((user)=>{
            let flag = true
            chatList.forEach((chat) => {
                if(chat.receiverId === user.uid){
                    flag = false
                    return
                }
            })
            return flag
        }))
    }, [userList, uid, chatList])

  return (
    <Modal
    {...props}
    size="sm"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    data-bs-theme='dark'
    className='dialog-box'
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter" className='text-1'>
        Start a new Chat!
      </Modal.Title>
    </Modal.Header>
    <Modal.Body >
        <Form.Control 
            type="text" 
            placeholder="type username here" value={userInput} 
            onChange={(e)=>setUserInput(e.target.value)}
            className='fs-6 p-2 rounded-1 border-0 input-1'
        />
        <ListGroup style={{maxHeight: '150px'}} className='overflow-y-auto mt-2'>
            {
                filteredUsers.map((user)=>{

                    return <ListGroup.Item key={user.uid} className='d-flex align-items-center py-2 '>
                            <Image src={user.profileImg} alt={user.uid} className='profile-avatar object-fit-cover' roundedCircle/>
                            <h6 className='px-2 m-0 w-100 text-1'>{user.username}</h6>
                            <Button className='' onClick={handleAdd}>Add</Button>
                    </ListGroup.Item>
                })
            }
        </ListGroup>
    </Modal.Body>
  </Modal>
  )
}

export default AddUser