import {useState} from 'react'
import {Form, Button} from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import { updateUser } from '../features/userSlice'

const ProfileSettings = () => {

    const {username, status} = useSelector(state=>state.user.data)
    const [formData, setFormData] = useState({
        name: username,
        status: status,
    })
    const dispatch = useDispatch()

    const handleChange = (e) =>{
        const {name, value} = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = (e) =>{
        e.preventDefault()

        dispatch(updateUser({
            username: formData.name,
            status: formData.status
        }))
    }

  return (
    <>
        <div className="mb-3">
            <h2 className='fs-3 text-1'>Edit Profile</h2>
        </div>
        <Form onSubmit={handleSubmit} className='d-flex flex-column'>
            <Form.Group controlId="form-name" className='mb-3'>
                <Form.Label className='text-1'>Name</Form.Label>
                <Form.Control 
                    name='name'
                    type="text" 
                    value={formData.name} 
                    onChange={handleChange} 
                    className='fs-6 py-2 py-sm-3 border-0 rounded-1 input-1'
                />
            </Form.Group>
            <Form.Group controlId="form-status" className='mb-3'>
                <Form.Label className='text-1'>Status</Form.Label>
                <Form.Control 
                    name='status'
                    type="text" 
                    value={formData.status} 
                    onChange={handleChange} 
                    className='fs-6 py-2 py-sm-3 border-0 rounded-1 input-1'
                />
            </Form.Group>
            <Button type='submit' className='fs-6 px-3 py-2 px-sm-4 py-sm-3 align-self-end text-1 btn-1 border-0 rounded-1'>Save Changes</Button>
        </Form>
    </>
  )
}

export default ProfileSettings