import {useState, useEffect, useRef} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Image, Dropdown} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { signOutUser } from '../features/userSlice'
import { auth, signOut } from '../config/firebase'
import { clearAllChatData } from '../features/chatsSlice'

const UserInfoHeader = () => {

    const {uid, profileImg, username} = useSelector(state=>state.user.data)
    const dispatch = useDispatch()

    const logout = () =>{
        if(uid){
          signOut(auth).then(()=>{
            window.location.reload()
            dispatch(signOutUser())
            dispatch(clearAllChatData())
          })
        }
      }

  return (
    <div className="user-info-header px-2 px-sm-3 d-flex justify-content-between mb-3">
        <div className="user-info d-flex align-items-center">
            <Image
                src={profileImg} 
                alt={username} 
                roundedCircle
                className='profile-avatar object-fit-cover'
            />
            <h5 className='text-1 m-0 fs-6 px-2 fw-medium'>
                {username}
            </h5>
        </div>
        <Dropdown>
            <Dropdown.Toggle id="dropdown-basic" className='bg-dark border-0'>

            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item as={Link} to='/settings'>Settings</Dropdown.Item>
                <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    </div>
  )
}

export default UserInfoHeader