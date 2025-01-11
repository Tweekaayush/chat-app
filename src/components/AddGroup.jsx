import {useState, useEffect, useCallback} from 'react'
import {Modal, Form, Image, ListGroup, Button, CloseButton} from 'react-bootstrap' 
import {useDispatch, useSelector} from 'react-redux'
import { getUsers, clearUsers, addGroupChat } from '../features/chatsSlice';

const AddGroup = (props) => {
    const [userInput, setUserInput] = useState('')
    const dispatch = useDispatch()
    const [members, setMembers] = useState([])
    const {users: userList} = useSelector(state=>state?.chats?.data)
    const {data: {uid}, data} = useSelector(state=>state?.user)
    const [filteredUsers, setFilteredUsers] = useState([])
    const [groupName, setGroupName] = useState('')

    const searchUsers = useCallback(() =>{
        if(!userInput){
            dispatch(clearUsers())
        }else  dispatch(getUsers(userInput.trim()))
    }, [userInput])

    const handleAdd = (e, member) =>{
        e.preventDefault()
        setFilteredUsers(filteredUsers.filter((user)=>{
            let flag = true
            members.forEach((chat) => {
                if(chat.uid === user.uid){
                    flag = false
                    return
                }
            })
            return flag
        }))
        setMembers(prev => [...prev, member])
        if(!filteredUsers.length) setUserInput('')
    }

    const createGroup = (e) =>{
        e.preventDefault()

        if(groupName.trim() === '' || members.length === 0) return
        
        const groupData = {
            groupName: groupName,
            groupImg: 'https://i.pinimg.com/736x/71/26/7e/71267e196665cb6a2e48310bcf87f2c7.jpg',
            members: [{...data}, ...members],
            admin: uid
        }

        dispatch(addGroupChat(groupData))

        setGroupName('')
        setMembers([])
        props.onHide()
    }

    useEffect(()=>{

        const timeout = setTimeout(searchUsers, 1000)
        
        return ()=> clearTimeout(timeout)

    }, [searchUsers])

    useEffect(()=>{
        setFilteredUsers(userList.filter((user)=>user.uid !== uid).filter((user)=>{
            let flag = true
            members.forEach((chat) => {
                if(chat.uid === user.uid){
                    flag = false
                    return
                }
            })
            return flag
        }))
    }, [userList, members, uid])

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
            Create a new Group!
        </Modal.Title>
        </Modal.Header>
        <Modal.Body >
            <Form className='d-flex flex-column' onSubmit={createGroup}>
                <Form.Group controlId="form-group-id" className='d-flex gap-2 align-items-center mb-2'>
                    <Image 
                        src='https://i.pinimg.com/736x/71/26/7e/71267e196665cb6a2e48310bcf87f2c7.jpg'
                        className='profile-avatar'
                        roundedCircle
                    />
                    <Form.Control 
                        type="text" 
                        placeholder="Group Name" 
                        value={groupName} 
                        onChange={(e)=>setGroupName(e.target.value)} 
                        className='input-1 rounded-1 border-0'
                    />
                </Form.Group>
                <Form.Group controlId="form-name">
                    <div className="members mb-2 pb-1 overflow-x-auto d-flex gap-2">
                        {members.map((member)=>{
                            return <div 
                                        className='d-flex gap-2 p-1 align-items-center rounded-1 btn-1 text-1' 
                                        key={member.uid}
                                    >
                                        <h3 className='m-0' style={{fontSize: '14px', whiteSpace: 'nowrap'}}>
                                            {member.username}
                                        </h3>
                                        <CloseButton 
                                            className='p-0'
                                            onClick={()=>setMembers(members.filter((m)=>m.uid !== member.uid))}
                                        />
                                    </div>
                        })}
                    </div>
                    <Form.Control 
                        type="text" 
                        placeholder="search usernames here" value={userInput} 
                        onChange={(e)=>setUserInput(e.target.value)}
                        className='fs-6 p-2 rounded-1 border-0 input-1'
                        />
                    <ListGroup style={{maxHeight: '150px'}} className='overflow-y-auto mt-2'>
                        {
                            filteredUsers?.map((user)=>{
                                return <ListGroup.Item key={user.uid} className='d-flex align-items-center py-2 px-0'>
                                        <Image src={user.profileImg} alt={user.uid} className='profile-avatar object-fit-cover' roundedCircle/>
                                        <h6 className='px-2 m-0 w-100'>{user.username}</h6>
                                        <Button className='btn-1 rounded-1 border-0 fs-6' onClick={(e)=>handleAdd(e, user)}>Add</Button>
                                </ListGroup.Item>
                            })
                        }
                    </ListGroup>
                </Form.Group>
                <Button type='submit' className='mt-4 btn-1 border-0 rounded-1'>Create Group</Button>
            </Form>
        </Modal.Body>
    </Modal>
  )
}

export default AddGroup