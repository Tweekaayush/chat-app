import {useEffect, lazy, Suspense} from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'
import {Container} from 'react-bootstrap'
import Layout from './components/Layout/Layout';
import { auth, onAuthStateChanged } from './config/firebase';
import { getUserDetails } from './features/userSlice';
import { useDispatch, useSelector} from 'react-redux' 
import PrivateRoutes from './components/PrivateRoutes';
import Loader from './components/Loader';
const Chats = lazy(()=> import('./pages/Chats'))
const Login = lazy(()=> import('./pages/Login'))
const Register = lazy(()=> import('./pages/Register'))
const Settings= lazy(()=> import('./pages/Settings'))

const App = () => {

  const {uid} = useSelector(state=>state.user.data)
  const {theme} = useSelector(state=>state.theme)
  const dispatch = useDispatch()

  useEffect(()=>{
    onAuthStateChanged(auth, async(user)=>{
      if(user){
        dispatch(getUserDetails({
          uid: user.uid,
          username: user.displayName,
          email: user.email,
          profileImg: user.photoURL
        }))
      }
    }, [uid])
  }, [])

  useEffect(()=>{
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <Router>
      <Layout>
        <Suspense fallback={<Loader />}>
          <Container 
            fluid
            className='h-100 d-flex justify-content-center align-items-center p-0 flex-column overflow-hidden'
            style={{maxWidth: '1024px', height: '70vh'}}
          >
            <Routes>
              <Route exact path='/login' element={<Login/>}/>
              <Route exact path='/register' element={<Register/>}/>
              <Route element={<PrivateRoutes/>}>
                  <Route exact path='/' element={<Chats/>}/>
                  <Route exact path='/settings' element={<Settings/>}/>
              </Route>
              <Route exact path='/*' element={<Navigate to='/' replace/>}/>
            </Routes>
          </Container>
        </Suspense>
      </Layout>
    </Router>
  )
}

export default App