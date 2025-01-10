import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import {useSelector} from 'react-redux'

const PrivateRoutes = () => {

    const {uid} = useSelector(state=>state.user.data)

  return (
    <>
        {
            uid?<Outlet/>:<Navigate to='/login' replace={true}/>
        }
    </>
  )
}

export default PrivateRoutes