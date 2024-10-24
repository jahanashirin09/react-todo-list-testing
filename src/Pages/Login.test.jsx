import { describe, expect, it, beforeEach ,vi} from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
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
  render(
    <BrowserRouter>
      <GoogleOAuthProvider clientId="287235108170-d1rjgc09hn96crj9l9he2uevkjpkvcu7.apps.googleusercontent.com">
        <Login />
      </GoogleOAuthProvider>
    </BrowserRouter>
  );
  beforeEach(() => {
    localStorage.clear(); // Clear local storage before each test
  });

  it("renders the login form", () => {
    expect(screen.getByTestId("LoginHeader")).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter Email.../i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Enter Password.../i)
    ).toBeInTheDocument();
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
  it("shows error for non-existent account", async () => {
    localStorage.setItem('test@example.com', JSON.stringify({ email: 'test@example.com', password: 'password123' }));
    user.setup();
    const login_email = screen.getByPlaceholderText(/Enter Email.../i);
    await userEvent.type(login_email, 'nonexistent@example.com');
    const login_password = screen.getByPlaceholderText(/Enter Password.../i);
    await userEvent.type(login_password, '1234567890');
    await userEvent.click(screen.getByTestId("login-btn"));
  
    expect(await screen.queryByText(ERROR_MESSAGES.ACCOUNT_NOT_EXIST)).not.toBeInTheDocument();
  });
  it('successful login redirects to list page', async () => {
    localStorage.setItem('test@example.com', JSON.stringify({ email: 'test@example.com', password: 'password123' }));
    const navigate = vi.fn();
    user.setup();
    const login_email = screen.getByPlaceholderText(/Enter Email.../i);
    await user.clear(login_email );
    await userEvent.type(login_email, 'test@example.com');
    const login_password = screen.getByPlaceholderText(/Enter Password.../i);
    await user.clear(login_password);
    await userEvent.type(login_password, 'password123');
    await userEvent.click(screen.getByTestId("login-btn"));

    await  expect(navigate).toHaveBeenCalledWith('/listpage', expect.any(Object));
  });
  

  // it("accound doesnt exisits message when not login",async()=>{
  //   user.setup()
  //   const login_email=screen.getByPlaceholderText("Enter Email...")
  //   await user.type(login_email,"jahana@gmail.com")
  //   const login_password=screen.getByPlaceholderText("Enter Password...")
  //   await user.type(login_password,"123456789")
  //   const login_button=screen.getByTestId("login-btn")
  //   await user.click(login_button)
  //   expect("Account doesn't exisist").toBeInTheDocument();

  // })
  // it("displays the login heading", () => {
  //   const LoginHeader = screen.getByTestId("LoginHeader");
  //   expect(LoginHeader).toBeInTheDocument();
  //   expect(LoginHeader).toHaveTextContent("Login");
  // });
  // it("rendering email and check if it is empty", async () => {
  //   const loginlabel = screen.getAllByRole("label");
  //   expect(loginlabel[0]).toBeInTheDocument();
  //   expect(loginlabel[0]).toHaveTextContent("Email");
  //   const login_button = screen.getByRole("button");
  //   user.setup();
  //   await user.click(login_button);
  //   expect(screen.queryByText("email is required")).toBeInTheDocument();
  // });
  // it("display the label password", async () => {
  //   const loginlabel = screen.getAllByRole("label");
  //   expect(loginlabel[1]).toHaveTextContent("Password");
  //   const login_button = screen.getByRole("button");
  //   user.setup();
  //   await user.click(login_button);
  //   expect(screen.queryByText("password is required")).toBeInTheDocument();
  // });
  // it("render the login button", async () => {
  //   const loginButton = screen.getByRole("button");
  //   expect(loginButton).toBeInTheDocument();
  //   user.setup();
  //   await user.click(loginButton);
  // });
  // it("rendering link to sighn up", () => {
  //   expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
  //   const link = screen.getByRole("link");
  //   expect(link).toBeInTheDocument();
  //   expect(link).toHaveAttribute("href", "/signUp");
  // });
});
