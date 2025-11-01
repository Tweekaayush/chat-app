import React, { useEffect, useState } from "react";
import { User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../features/auth.slice";
import UserListItem from "./UserListItem";
import { createChat } from "../features/chat.slice";
import { useNavigate } from "react-router-dom";

const SearchUsers = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const {
    data: { usersList },
  } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUsers(search));
  }, [search]);
  return (
    <div className="w-full h-full flex flex-col">
      <div className="form-input px-2">
        <div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <User />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-2 pb-4">
        {usersList?.map((user) => {
          return (
            <UserListItem
              key={user._id}
              {...user}
              handleClick={() => [
                dispatch(createChat({ participantId: user._id })),
              ]}
            />
          );
        })}

      </div>
    </div>
  );
};

export default SearchUsers;
