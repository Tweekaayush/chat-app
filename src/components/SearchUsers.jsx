import React from 'react'
import {Form } from 'react-bootstrap'

const SearchUsers = ({search, setSearch}) => {
  return (
    <div className="search-user-container px-2 px-sm-3 mb-3">
        <Form.Control 
            type="text" 
            placeholder="search users" 
            className='border-0 rounded-1 fs-6 p-sm-3 p-2 input-1'
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
        />
    </div>
  )
}

export default SearchUsers