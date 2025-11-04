import React, { useState, useEffect, useCallback } from "react";
import { User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../features/auth.slice";
import UserListItem from "./UserListItem";
import { createChat } from "../features/chat.slice";
import Skeleton from "./Skeleton";

const CreateGroup = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    groupName: "",
    members: [],
    search: "",
  });

  const {
    loading,
    data: { usersList },
  } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { groupName, members } = formData;

    if (groupName && members.length) {
      dispatch(createChat({ groupName, isGroup: true, participants: members }));
      setFormData({
        groupName: "",
        members: [],
        search: "",
      });
    }
  };

  const searchUsers = useCallback(() => {
    dispatch(getUsers(formData.search));
  }, [formData.search]);

  useEffect(() => {
    const timeout = setTimeout(searchUsers, 1000);
    return () => clearTimeout(timeout);
  }, [searchUsers]);

  return (
    <div className="w-full h-full flex flex-col">
      <form
        className="px-2 h-full w-full flex flex-col"
        onSubmit={handleSubmit}
      >
        <div className="form-input">
          <label htmlFor="groupName">Group name</label>
          <div>
            <input
              type="text"
              name="groupName"
              value={formData.groupName}
              onChange={handleChange}
              id="groupName"
            />
          </div>
        </div>
        <div className="form-input">
          <label htmlFor="search">members</label>
          <div>
            <input
              name="search"
              type="text"
              value={formData?.search}
              onChange={handleChange}
              id="search"
            />
            <User />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {formData.members?.map((user) => {
            return (
              <UserListItem
                key={user._id}
                {...user}
                handleClick={() => {}}
                member={true}
              />
            );
          })}
          {!loading
            ? usersList
                ?.filter((user) => {
                  let flag = true;
                  formData?.members?.forEach((member) => {
                    if (member?._id === user?._id) flag = false;
                  });
                  return flag;
                })
                .map((user) => {
                  return (
                    <UserListItem
                      key={user._id}
                      {...user}
                      handleClick={() =>
                        setFormData((prev) => {
                          return {
                            ...prev,
                            members: [...formData.members, user],
                          };
                        })
                      }
                    />
                  );
                })
            : new Array(4).fill(0).map((_, i) => {
                return <Skeleton key={i} classname={`w-full h-15 my-2`} />;
              })}
        </div>
        <button className="button-1">Create</button>
      </form>
    </div>
  );
};

export default CreateGroup;
