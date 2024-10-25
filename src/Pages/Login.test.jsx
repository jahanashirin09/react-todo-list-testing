import { describe, expect, it, beforeEach,} from "vitest";
import { render, screen,} from "@testing-library/react";
import  Login  from "./Login";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import user, { userEvent } from "@testing-library/user-event";
describe("Login Page", () => {
 
  const ERROR_MESSAGES = {
    ACCOUNT_NOT_EXIST: "Account doesn't exist",
    INVALID_USER: "Invalid user",
    EMAIL_REQUIRED: "Email is required",
    PASSWORD_REQUIRED: "Password is required",
  };
  beforeEach(() => {
    localStorage.clear(); 
  });
  render(
    <BrowserRouter>
      <GoogleOAuthProvider clientId="287235108170-d1rjgc09hn96crj9l9he2uevkjpkvcu7.apps.googleusercontent.com">
        <Login />
      </GoogleOAuthProvider>
    </BrowserRouter>
  );
  it("renders the login form", () => {
    expect(screen.getByTestId("LoginHeader")).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter Email.../i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter Password.../i)).toBeInTheDocument();
  });
  it("shows error when email is not provided", async () => {
    user.setup();
    await userEvent.click(screen.getByTestId("login-btn"));
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
  });
  it("shows error when password is not provided", async () => {
    user.setup();
    const login_email = screen.getByPlaceholderText(/Enter Email.../i);
    await userEvent.type(login_email, "test@example.com");
    await user.click(screen.getByTestId("login-btn"));
    expect(
      await screen.findByText(/password is required/i)
    ).toBeInTheDocument();
  });
  it("render login button", async () => {
    const login_button = screen.getByTestId("login-btn");
    expect(login_button).toBeInTheDocument();
    user.setup();
    await user.click(login_button);
  });
  it("navigate to sighnup page", () => {
    expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/signUp");
  });
  it("shows error for non-existent account", async () => {
    localStorage.setItem('test@example.com', JSON.stringify({ email: 'test@example.com', password: 'password123' }));
    user.setup();
    const login_email = screen.getByPlaceholderText(/Enter Email.../i);
    await userEvent.type(login_email, 'nonexistent@example.com');
    const login_password = screen.getByPlaceholderText(/Enter Password.../i);
    await userEvent.type(login_password, '1234567890');
    await userEvent.click(screen.getByTestId("login-btn"));
    expect(await screen.getByText(ERROR_MESSAGES.ACCOUNT_NOT_EXIST)).toBeInTheDocument();
  }); 
 

  it("shows error for invalid  account details", async () => {
    localStorage.setItem('test@example.com', JSON.stringify({ email: 'test@example.com', password: 'password123' }));
    user.setup();
    const login_email = screen.getByPlaceholderText(/Enter Email.../i);
    await user.clear( login_email);
    await userEvent.type(login_email, 'test@example.com');
    const login_password = screen.getByPlaceholderText(/Enter Password.../i);
    await user.clear( login_email);
    await userEvent.type(login_password, '1234567890');
    await userEvent.click(screen.getByTestId("login-btn"));
    const storedData = JSON.parse(localStorage.getItem('test@example.com'));
    expect(storedData.email).toBe('test@example.com');
    expect(storedData.password).not.toBe('1234567890'); 
    expect(localStorage.getItem("LoginStatus")).toBe(null)
  }); 
  it("successful validation for existent account", async () => {
    localStorage.setItem('test@example.com', JSON.stringify({ email: 'test@example.com', password: 'password123' }));
    user.setup();
    const login_email = screen.getByPlaceholderText(/Enter Email.../i);
    await user.clear(login_email );
    await userEvent.type(login_email,'test@example.com');
    const login_password = screen.getByPlaceholderText(/Enter Password.../i);
    await user.clear( login_password);
    await userEvent.type(login_password,'password123');
    await userEvent.click(screen.getByTestId("login-btn"));
    const storedData = JSON.parse(localStorage.getItem('test@example.com'));
    expect(storedData.email).toBe('test@example.com');
    expect(storedData.password).toBe('password123'); 
  });
});