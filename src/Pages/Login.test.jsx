import { describe, expect, it, beforeEach, afterEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Login from "./Login";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import user from "@testing-library/user-event";

describe("Login Page", () => {
  let setShowLoader;
  let setError;
  let navigate;
  let originalLocalStorage;

  const ERROR_MESSAGES = {
    ACCOUNT_NOT_EXIST: "Account does not exist.",
    INVALID_USER: "Invalid username or password.",
  };

  const LoginStatus = "loginStatus";
  beforeEach(() => {
    setShowLoader = vi.fn();
    setError = vi.fn();
    navigate = vi.fn();
    originalLocalStorage = window.localStorage;
    delete window.localStorage;
    window.localStorage = {
      getItem: vi.fn(),
      setItem: vi.fn(),
    };
  });
  afterEach(() => {
    window.localStorage = originalLocalStorage;
    vi.useRealTimers();
  });
  render(
    <BrowserRouter>
      <GoogleOAuthProvider clientId="287235108170-d1rjgc09hn96crj9l9he2uevkjpkvcu7.apps.googleusercontent.com">
        <Login />
      </GoogleOAuthProvider>
    </BrowserRouter>
  );
  it("displays the login heading", () => {
    const LoginHeader = screen.getByTestId("LoginHeader");
    expect(LoginHeader).toBeInTheDocument();
    expect(LoginHeader).toHaveTextContent("Login");
  });
  it("rendering email and check if it is empty", async () => {
    const loginlabel = screen.getAllByRole("label");
    expect(loginlabel[0]).toBeInTheDocument();
    expect(loginlabel[0]).toHaveTextContent("Email");
    const login_button = screen.getByRole("button");
    user.setup();
    await user.click(login_button);
    expect(screen.queryByText("email is required")).toBeInTheDocument();
  });
  it("display the label password", async () => {
    const loginlabel = screen.getAllByRole("label");
    expect(loginlabel[1]).toHaveTextContent("Password");
    const login_button = screen.getByRole("button");
    user.setup();
    await user.click(login_button);
    expect(screen.queryByText("password is required")).toBeInTheDocument();
  });
  it("render the login button", async () => {
    const loginButton = screen.getByRole("button");
    expect(loginButton).toBeInTheDocument();
    user.setup();
    await user.click(loginButton);
  });
  it("rendering link to sighn up", () => {
    expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/signUp");
  });
  it("on submitting the data", async () => {
    const data = { email: "test@example.com", password: "password123" };
    const mockUser = { email: "test@example.com", password: "password123" };
    window.localStorage.getItem.mockReturnValue(JSON.stringify(mockUser));

    const onsubmitFtn = async (data) => {
      setShowLoader(true);
      setTimeout(() => {
        setShowLoader(false);
      }, 1000);
      const loginEmail = data.email;
      const item = localStorage.getItem(loginEmail);
      if (!item) {
        setError(ERROR_MESSAGES.ACCOUNT_NOT_EXIST);
        return;
      }
      const parsedItem = JSON.parse(item);
      const { email: signupEmail, password: signupPassword } = parsedItem;
      if (signupEmail === data.email && signupPassword === data.password) {
        localStorage.setItem(LoginStatus, "loged");
        setTimeout(() => {
          navigate("/listpage", { state: data });
        }, 1000);
      } else {
        localStorage.setItem(LoginStatus, "");
        setError(ERROR_MESSAGES.INVALID_USER);
      }
    };

    await onsubmitFtn(data);

    expect(setShowLoader).toHaveBeenCalledWith(true);
    expect(window.localStorage.getItem).toHaveBeenCalledWith(data.email);
    expect(setError).not.toHaveBeenCalled();
    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      LoginStatus,
      "loged"
    );
  });

  it("should set error if account does not exist", async () => {
    const data = { email: "nonexistent@example.com", password: "password123" };
    const onsubmitFtn = async (data) => {
      setShowLoader(true);
      setTimeout(() => {
        setShowLoader(false);
      }, 1000);
      const loginEmail = data.email;
      const item = localStorage.getItem(loginEmail);
      if (!item) {
        setError(ERROR_MESSAGES.ACCOUNT_NOT_EXIST);
        return;
      }
      const parsedItem = JSON.parse(item);
      const { email: signupEmail, password: signupPassword } = parsedItem;
      if (signupEmail === data.email && signupPassword === data.password) {
        localStorage.setItem(LoginStatus, "loged");
        setTimeout(() => {
          navigate("/listpage", { state: data });
        }, 1000);
      } else {
        localStorage.setItem(LoginStatus, "");
        setError(ERROR_MESSAGES.INVALID_USER);
      }
    };

    await onsubmitFtn(data);

    expect(setShowLoader).toHaveBeenCalledWith(true);
    expect(window.localStorage.getItem).toHaveBeenCalledWith(data.email);
    expect(setError).toHaveBeenCalledWith(ERROR_MESSAGES.ACCOUNT_NOT_EXIST);
  });

  it("should set error for invalid user", async () => {
    const data = { email: "test@example.com", password: "wrongpassword" };
    const mockUser = { email: "test@example.com", password: "password123" };
    window.localStorage.getItem.mockReturnValue(JSON.stringify(mockUser));
    const onsubmitFtn = async (data) => {
      setShowLoader(true);
      setTimeout(() => {
        setShowLoader(false);
      }, 1000);
      const loginEmail = data.email;
      const item = localStorage.getItem(loginEmail);
      if (!item) {
        setError(ERROR_MESSAGES.ACCOUNT_NOT_EXIST);
        return;}
      const parsedItem = JSON.parse(item);
      const { email: signupEmail, password: signupPassword } = parsedItem;
      if (signupEmail === data.email && signupPassword === data.password) {
        localStorage.setItem(LoginStatus, "loged");
        setTimeout(() => {
          navigate("/listpage", { state: data });
        }, 1000);
      } else {
        localStorage.setItem(LoginStatus, "");
        setError(ERROR_MESSAGES.INVALID_USER);
      }};
    await onsubmitFtn(data);
    expect(setShowLoader).toHaveBeenCalledWith(true);
    expect(window.localStorage.getItem).toHaveBeenCalledWith(data.email);
    expect(setError).toHaveBeenCalledWith(ERROR_MESSAGES.INVALID_USER);
    expect(window.localStorage.setItem).toHaveBeenCalledWith(LoginStatus, "");
  });
});
