import {
  ArrowLeft,
  LoaderCircle,
  Lock,
  Mail,
  MessageSquareMore,
  Pencil,
  User,
} from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import { updateUser } from "../features/auth.slice";

const AccountPage = (props) => {
  const [setOpen] = useOutletContext();
  const dispatch = useDispatch();
  const {
    loading,
    data: { user },
  } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
    about: user?.about || "",
    avatar: user?.avatar,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleAvatar = (e) => {
    const file = Array.from(e.target.files)[0];
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setFormData((prev) => {
          return { ...prev, avatar: reader.result };
        });
      }
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({ ...formData, userId: user?._id }));
  };

  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-gray-300 dark:border-gray-700 p-4 flex items-center">
        <ArrowLeft
          className="text-gray-700 dark:text-gray-300 mr-4 block lg:hidden cursor-pointer"
          onClick={() => setOpen(false)}
        />

        <h3 className="text-2xl text-black dark:text-white ellipses">
          Account
        </h3>
      </div>
      <form
        className="flex flex-col flex-1 items-center justify-center p-4"
        onSubmit={handleSubmit}
      >
        <div className="w-40 h-40 rounded-full overflow-hidden cursor-pointer relative group mb-8 border border-gray-800 dark:border-gray-200">
          <img
            src={formData?.avatar}
            alt={formData?.name}
            className="w-full h-full object-fit object-[50%_50%]"
          />
          <label
            htmlFor="avatar"
            className={`absolute bottom-0 left-0 w-full h-[40%] bg-black/50 flex items-center justify-center gap-2 invisible opacity-0 group-hover:visible group-hover:opacity-100 cursor-pointer transition-all duration-300 ease-in-out`}
          >
            <Pencil className="w-4 h-4 text-white" />
            <span className="text-sm text-white">Edit</span>
          </label>
          <input
            type="file"
            name="avatar"
            id="avatar"
            className="hidden"
            onChange={handleAvatar}
          />
        </div>
        <div className="form-input">
          <label htmlFor="name">name</label>
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              id="name"
            />
            <User />
          </div>
        </div>
        <div className="form-input">
          <label htmlFor="email">email</label>
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              id="email"
            />
            <Mail />
          </div>
        </div>
        <div className="form-input">
          <label htmlFor="password">password</label>
          <div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              id="password"
            />
            <Lock />
          </div>
        </div>
        <div className="form-input">
          <label htmlFor="about">about</label>
          <div>
            <input
              type="text"
              name="about"
              value={formData.about}
              onChange={handleChange}
              id="about"
            />
            <MessageSquareMore />
          </div>
        </div>
        <button type="submit" className="button-1" disabled={loading}>
          {!loading ? (
            "Save changes"
          ) : (
            <LoaderCircle className="mx-auto animate-spin" />
          )}
        </button>
      </form>
    </div>
  );
};

export default AccountPage;
