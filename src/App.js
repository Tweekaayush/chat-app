import {useEffect} from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Chats from './pages/Chats';
import Login from './pages/Login';
import Register from './pages/Register';
import Settings from './pages/Settings';
import {Container} from 'react-bootstrap'
import Layout from './components/Layout/Layout';
import { auth, onAuthStateChanged } from './config/firebase';
import { getUserDetails } from './features/userSlice';
import { useDispatch, useSelector} from 'react-redux' 
import PrivateRoutes from './components/PrivateRoutes';

const App = () => {

  const {uid} = useSelector(state=>state.user.data)
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

  return (
    <Router>
      <Layout>
        <Container className='h-100 d-flex justify-content-center align-items-center p-0'>
          <Routes>
            <Route exact path='/login' element={<Login/>}/>
            <Route exact path='/register' element={<Register/>}/>
            <Route element={<PrivateRoutes/>}>
                <Route exact path='/' element={<Chats/>}/>
                <Route exact path='/settings' element={<Settings/>}/>
            </Route>
          </Routes>
        </Container>
      </Layout>
    </Router>
  )
}

export default App