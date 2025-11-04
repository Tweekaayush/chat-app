import React, { useEffect, useState } from "react";
import { User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../features/auth.slice";
import UserListItem from "./UserListItem";
import { createChat } from "../features/chat.slice";
import { useNavigate } from "react-router-dom";
import Skeleton from "./Skeleton";
import { useCallback } from "react";

const SearchUsers = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const {
    loading,
    data: { usersList },
  } = useSelector((state) => state.auth);

  const searchUsers = useCallback(() => {
    dispatch(getUsers(search));
  }, [search]);

  useEffect(() => {
    const timeout = setTimeout(searchUsers, 2000);
    return () => clearTimeout(timeout);
  }, [searchUsers]);

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
        {!loading
          ? usersList?.map((user) => {
              return (
                <UserListItem
                  key={user._id}
                  {...user}
                  handleClick={() => [
                    dispatch(createChat({ participantId: user._id })),
                  ]}
                />
              );
            })
          : new Array(4).fill(0).map((_, i) => {
              return <Skeleton key={i} classname={`w-full h-15 my-2`} />;
            })}
      </div>
    </div>
  );
};

export default SearchUsers;
