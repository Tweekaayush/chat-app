import React, { useEffect, useState } from "react";
import { Mail, Lock, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../features/auth.slice";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const {
    data: { user },
  } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup(formData));
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
              type="name"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
            <User />
          </div>
          {formErrors.name && <p>{formErrors.name}</p>}
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
          {formErrors.email && <p>{formErrors.email}</p>}
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
          {formErrors.password && <p>{formErrors.password}</p>}
        </div>
        <div className="form-input">
          <label htmlFor="confirmPassword">confirm Password</label>
          <div>
            <input
              type="confirmPassword"
              name="confirmPassword"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-Enter your Password"
            />
            <Lock />
          </div>
          {formErrors.confirmPassword && <p>{formErrors.confirmPassword}</p>}
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
