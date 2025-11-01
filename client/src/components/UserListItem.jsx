import React from 'react'
import { getChatDetails, getLastMessageText } from "../utils/chat.utils";
import { useNavigate } from "react-router-dom";

const UserListItem = ({avatar, name, about, handleClick}) => {
    const navigate = useNavigate();

  return (
    <div
      className="flex items-center px-2 py-4 cursor-pointer hover:bg-primary/10"
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
    </div>
  )
}

export default UserListItem