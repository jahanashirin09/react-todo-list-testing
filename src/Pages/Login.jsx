import { useState } from "react";
import "./Login.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { ReactComponent as Loader } from "../assets/images/Loader.svg";

export default function Login() {
  const [showLoader, setShowLoader] = useState(false);
  const { register, formState, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { errors } = formState;
  const LoginStatus = "LoginStatus";
  const ERROR_MESSAGES = {
    ACCOUNT_NOT_EXIST: "Account doesn't exist",
    INVALID_USER: "Invalid user",
    EMAIL_REQUIRED: "Email is required",
    PASSWORD_REQUIRED: "Password is required",
  };
  const onsubmitFtn = (data) => {
    setShowLoader(true);
    setTimeout(() => {
      setShowLoader(false);
    }, 1000);
    const loginEmail = data.email;
    const item = localStorage.getItem(loginEmail);
    if (!item) {
      console.log(showLoader);
      setError(ERROR_MESSAGES.ACCOUNT_NOT_EXIST);
      return;
    }
    const parsedItem = JSON.parse(item);
    const { email: signupEmail, password: signupPassword } = parsedItem;
    if (signupEmail === data.email && signupPassword === data.password) {
      localStorage.setItem(LoginStatus, "loged");
      setTimeout(() => {
        navigate("/listpage", {
          state: data,
        });
      }, 1000);
    } else {
      localStorage.setItem(LoginStatus, "");
      setError(ERROR_MESSAGES.INVALID_USER);
    }
  };
  const handleGoogleLogin = (response) => {
    const decodedUser = jwtDecode(response.credential);
    console.log(decodedUser.email);
    const googleloginEmail = decodedUser.email;
    const googleItems = JSON.parse(localStorage.getItem(googleloginEmail));
    const { given_name: googleName, email: googleEmail } = decodedUser;
    if (!googleItems) {
      setError(ERROR_MESSAGES.ACCOUNT_NOT_EXIST);
      return;
    }
    if (
      googleItems &&
      googleName === googleItems.given_name &&
      googleEmail === googleItems.email
    ) {
      localStorage.setItem(LoginStatus, "loged");
      navigate("/listpage", {
        state: googleItems,
      });
    } else {
      localStorage.setItem(LoginStatus, "");
      setError(ERROR_MESSAGES.INVALID_USER);
    }
  };
  const handleGoogleError = (error) => {
    console.error("Google login failed:", error);
    setError(ERROR_MESSAGES.INVALID_USER);
  };
  return (
    <div>
      <div className="login-header" data-testid="LoginHeader">
        Login
      </div>
      <form
        className="login-main-container"
        onSubmit={handleSubmit(onsubmitFtn)}
      >
        <div className="form-group">
          <div className="google-auth">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={handleGoogleError}
              text="signin_with"
              shape="pill"
              logo_alignment="left"
            />
          </div>
          {error && <p className="error-messages">{error}</p>}
          <label role="label">Email</label>
          <input
            placeholder="Enter Email..."
            {...register("email", {
              required: {
                value: true,
                message: "email is required",
              },
            })}
          />
          {errors.email?.message && (
            <p className="error-message">{errors.email.message}</p>
          )}
        </div>
        <div className="form-group">
          <label role="label">Password</label>
          <input
            placeholder="Enter Password..."
            type="password"
            {...register("password", {
              required: {
                value: true,
                message: "password is required",
              },
            })}
          />
          {errors.password?.message && (
            <p className="error-message">{errors.password.message}</p>
          )}
        </div>
        <button className="login-button" disabled={showLoader}>
          {!showLoader ? "Login" : <Loader className="spinner" />}
        </button>
        <div className="login-text-box">
          Don&apos;t have an account? <NavLink to="/signUp"> SignUp </NavLink>
        </div>
      </form>
    </div>
  );
}
