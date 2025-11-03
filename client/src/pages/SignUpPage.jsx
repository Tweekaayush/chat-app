import React, { useEffect, useState } from "react";
import { Mail, Lock, User, Pencil } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../features/auth.slice";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: "",
  });

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const {
    data: { user },
  } = useSelector((state) => state.auth);

  const validate = () => {
    const err = {
      name: "",
      password: "",
      confirmPassword: "",
      email: "",
      avatar: "",
    };

    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!formData.name) {
      err.password = "Please enter your name!";
    }

    if (!formData.avatar) {
      err.avatar = "Please upload your Avatar!";
    }
    if (!formData.password.length) {
      err.password = "Please enter your password!";
    }
    if (formData.password !== formData.confirmPassword) {
      err.confirmPassword = "Your Password does not match";
    }
    if (!pattern.test(formData.email)) {
      err.email = "Please enter a valid Email ID!";
    }

    setFormErrors({ ...err });

    return (
      !err.password &&
      !err.email &&
      !err.name &&
      !err.confirmPassword &&
      !err.avatar
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) dispatch(signup(formData));
  };
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

  useEffect(() => {
    if (user) navigate("/chat");
  }, [user]);

  return (
    <div className="auth-form-container">
      <h4 className="auth-sub-title">Start your journey with us!</h4>
      <h1 className="auth-title">Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-input">
          <label htmlFor="name">name</label>
          <div>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
            <User />
          </div>
          {formErrors.name && <p className="error-msg">{formErrors.name}</p>}
        </div>
        <div className="form-input">
          <label htmlFor="email">email</label>
          <div>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            <Mail />
          </div>
          {formErrors.email && <p className="error-msg">{formErrors.email}</p>}
        </div>
        <div className="form-input">
          <label htmlFor="password">password</label>
          <div>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
            <Lock />
          </div>
          {formErrors.password && (
            <p className="error-msg">{formErrors.password}</p>
          )}
        </div>
        <div className="form-input">
          <label htmlFor="confirmPassword">confirm Password</label>
          <div>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-Enter your Password"
            />
            <Lock />
          </div>
          {formErrors.confirmPassword && (
            <p className="error-msg">{formErrors.confirmPassword}</p>
          )}
        </div>
        <div>
          <h4 className="text-base text-black dark:text-white font-medium capitalize mb-2.5">
            Avatar
          </h4>
          <div className="w-30 h-30 rounded-full overflow-hidden cursor-pointer relative group mb-8 border border-gray-800 dark:border-gray-200">
            <img
              src={formData.avatar}
              alt="avatar"
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
          {formErrors.avatar && (
            <p className="error-msg">{formErrors.avatar}</p>
          )}
        </div>
        <button type="submit" className="button-1">
          Sign Up
        </button>
        <p className="auth-link">
          Already have an account ?<Link to="/">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpPage;
