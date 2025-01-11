import { useState, useEffect } from 'react'
import {Container, Form, Button} from 'react-bootstrap'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {auth, signInWithEmailAndPassword} from '../config/firebase'
import {getUserDetails} from '../features/userSlice'

const Login = () => {

    const {uid} = useSelector(state=>state.user.data)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const [formErrors, setFormErrors] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const validateForm = () =>{

        let emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/
  
        const obj = {
            email: '',
            password: '',
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
  
        setFormErrors({...obj})
  
        return obj.email === '' && obj.password === ''
        
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
            signInWithEmailAndPassword(auth, formData.email, formData.password).then((userCredential)=>{
                const user = userCredential.user
                dispatch(getUserDetails({
                    uid: user.uid,
                    username: user.displayName,
                    email: user.email,
                    profileImg: user.photoURL
                }))
            }).catch(e=>console.log(e))
        }
    }

    useEffect(()=>{
        if(uid){
            navigate('/')
        }
    }, [uid])

    useEffect(()=>{
        document.title = 'ChatApp | Login'
    }, [])

  return (
    <Container 
        className='form-container p-4 rounded-1'
        style={{maxWidth: '450px'}}
    >
        <h1 
            className='text-1 fs-3 text-center'
        >
            Welcome
        </h1>
        <p className='text-2 text-center'>
            We are so excited to see you!
        </p>
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="form-group-id" className='mb-3'>
                <Form.Label className='text-1 '>Email</Form.Label>
                <Form.Control 
                    name='email'
                    type="email" 
                    value={formData.email}
                    className='p-2 rounded-1 border-0 fs-5 input-1'
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group controlId="form-group-id" className='mb-3'>
                <Form.Label className='text-1 '>Password</Form.Label>
                <Form.Control 
                    name='password'
                    type="password" 
                    value={formData.password}
                    className='p-2 rounded-1 border-0 fs-5 input-1'
                    onChange={handleChange}
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
            Don't have an Account? <Link to='/register'>Register</Link>
        </p>
    </Container>
  )
}

export default Login