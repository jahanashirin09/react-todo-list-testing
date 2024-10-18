import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Login from "./Login";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import user from "@testing-library/user-event";

describe("Login Page", () => {
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
  it("rendering link to sighn up",()=>{
     expect(screen.getByText("Don't have an account?")).toBeInTheDocument()
     const link=screen.getByRole("link");
     expect(link).toBeInTheDocument()
     expect(link).toHaveAttribute("href", "/signUp")
  })
});
