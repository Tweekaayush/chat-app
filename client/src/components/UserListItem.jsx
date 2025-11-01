import React from 'react'
import { getChatDetails, getLastMessageText } from "../utils/chat.utils";
import { useNavigate } from "react-router-dom";
import { CircleCheck } from 'lucide-react';

const UserListItem = ({avatar, name, about, handleClick, member=false}) => {
    const navigate = useNavigate();

  return (
    <div
      className="flex items-center px-2 py-4 cursor-pointer hover:bg-primary/10 relative"
      onClick={handleClick}
    >
      <div className="user-icon mr-4">
        <img src={avatar} alt={name} />
      </div>
      <div>
        <h3 className="text-base text-black dark:text-white">{name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {about}
        </p>
      </div>
      {member && <CircleCheck className='w-7 h-7 ml-auto text-green-700'/>}
    </div>
  )
}

export default UserListItem