import React from 'react'
import {Form } from 'react-bootstrap'

const SearchUsers = ({search, setSearch}) => {
  return (
    <div className="search-user-container p-2 my-2">
        <Form.Control 
            type="text" 
            placeholder="search users" 
            className='border-0 rounded-1 text-white fs-6 p-3'
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
        />
    </div>
  )
}

export default SearchUsers