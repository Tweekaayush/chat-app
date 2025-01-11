import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const Footer = () => {

  const [date, setDate] = useState('')

  useEffect(()=>{
    setDate(()=>new Date().getUTCFullYear())
  }, [])

  return (
    <footer className='text-2 text-center p-2'>
      {date} &copy; Aayush Dobriyal
    </footer>
  )
}

export default Footer