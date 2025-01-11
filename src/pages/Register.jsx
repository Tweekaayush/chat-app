import { useState, useEffect } from 'react'
import {Container, Form, Button} from 'react-bootstrap'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { auth, updateProfile, createUserWithEmailAndPassword } from '../config/firebase'
import { getUserDetails } from '../features/userSlice'
import { profileImages } from '../datalist'

const Register = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
  })

  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
  })

  const dispatch = useDispatch()
  const {uid} = useSelector(state=>state.user.data)
  const navigate= useNavigate()

  const validateForm = () =>{
    
    let emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/

    const obj = {
      email: '',
      password: '',
      name: '',
      confirmPassword: '',
    }
    
    if(formData.name.trim() === ''){
        obj.name = 'Please enter your First Name.'
    }
    if(formData.email.trim() === ''){
        obj.email = 'Please enter an email address'
    }
    if(!(emailRegex.test(formData.email.trim()))){
        obj.email = 'Please enter a valid email address.'
    }
    if(formData.password.trim().length < 6){
        obj.password = 'Your password must have more than 6 characters'
    }
    if(formData.password.trim() !== formData.confirmPassword.trim()){
        obj.confirmPassword = 'Passwords do not match'
    }

    setFormErrors({...obj})

    return obj.name === '' && obj.email === '' && obj.password === '' && obj.confirmPassword === ''
  }

  const getProfilePicture = (name) =>{
    let image = 'https://i.pinimg.com/736x/2c/47/d5/2c47d5dd5b532f83bb55c4cd6f5bd1ef.jpg'
    profileImages.forEach((item)=>{
      if(item.id === name.charAt(0).toLowerCase()){
        image = item.image
        return
      }
    })
    return image
  }

  const handleChange = (e) =>{
    const {name, value} = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = (e) =>{
    e.preventDefault()

    const validate = validateForm()

    if(validate){
      const avatar = getProfilePicture(formData.name)
      createUserWithEmailAndPassword(auth, formData.email, formData.password).then((userCredential)=>{
        const user = userCredential.user
        updateProfile(user, {
          displayName: formData.name,
          photoURL: avatar
        });
        dispatch(getUserDetails({
            uid: user.uid,
            username: formData.name,
            email: user.email,
            profileImg: avatar
        }))
      }).catch(e=>console.log(e))
    }
  }

  useEffect(()=>{
    if(uid)
      navigate('/')
  }, [uid])

  useEffect(()=>{
    document.title = 'ChatApp | Register'
  }, [])

  return (
    <Container 
        className='form-container p-2 p-sm-3 rounded-1'
        style={{maxWidth: '450px'}}
    >
        <h1 
            className='text-1 fs-3 text-center mb-4'
        >
            Create an Account!
        </h1>
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="form-email" className='mb-3'>
                <Form.Label className='text-1 '>Email</Form.Label>
                <Form.Control 
                    name='email'
                    type="email" 
                    value={formData.email}
                    className='input-1 p-2 rounded-1 border-0 fs-5'
                    onChange={(e)=>setFormData({...formData, [e.target.name]: e.target.value})}
                />
            </Form.Group>
            <Form.Group controlId="form-name" className='mb-3'>
                <Form.Label className='text-1 '>Name</Form.Label>
                <Form.Control 
                    name='name'
                    type="text" 
                    value={formData.name}
                    className='p-2 rounded-1 border-0 fs-5 input-1'
                    onChange={(e)=>setFormData({...formData, [e.target.name]: e.target.value})}
                />
            </Form.Group>
            <Form.Group controlId="form-password" className='mb-3'>
                <Form.Label className='text-1 '>Password</Form.Label>
                <Form.Control 
                    name='password'
                    type="password" 
                    value={formData.password}
                    className='p-2 rounded-1 border-0 fs-5 input-1'
                    onChange={(e)=>setFormData({...formData, [e.target.name]: e.target.value})}
                />
            </Form.Group>
            <Form.Group controlId="form-confirm-password" className='mb-3'>
                <Form.Label className='text-1 '>Confirm Password</Form.Label>
                <Form.Control 
                    name='confirmPassword'
                    type="password" 
                    value={formData.confirmPassword}
                    className='p-2 rounded-1 border-0 fs-5 input-1'
                    onChange={(e)=>setFormData({...formData, [e.target.name]: e.target.value})}
                />
            </Form.Group>
            <Button 
                type='submit'
                className='w-100 mb-1 mt-2 fs-5 p-2 rounded-1'
            >
                Login
            </Button>
        </Form>
        <p className='text-2'>
            Already have an Account? <Link to='/'>Login</Link>
        </p>
    </Container>
  )
}

export default Register