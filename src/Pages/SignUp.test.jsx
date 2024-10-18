import { describe, expect, it, } from "vitest";
import { render, screen } from "@testing-library/react";
import SignUp from "./SignUp";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import user, { userEvent } from "@testing-library/user-event";

describe("SignUp", () => {
  render(
    <BrowserRouter>
      <GoogleOAuthProvider clientId="287235108170-d1rjgc09hn96crj9l9he2uevkjpkvcu7.apps.googleusercontent.com">
        <SignUp />
      </GoogleOAuthProvider>
    </BrowserRouter>
  );
  
  it("sign up heading", () => {
    const signupHeading = screen.getByText("SignUp");
    expect(signupHeading).toBeInTheDocument;
  });
  it("rendering name and check if the name filed is empty or have valid input", async () => {
    const LoginHeader = screen.getByTestId("name");
    expect(LoginHeader).toBeInTheDocument();
    expect(LoginHeader).toHaveTextContent("Name");
    user.setup();
    const sighnupbutton = screen.getByRole("button");
    await user.click(sighnupbutton);
    expect(screen.getByText("name is required")).toBeInTheDocument();
    const input = screen.getByTestId("name-input");
    await userEvent.type(input, "John Doe");
    expect(input.value).toBe("John Doe");
  });

  it("does not show error message when name is entered", async () => {
    const input = screen.getByPlaceholderText("Enter Name...");
    const sighnupbutton = screen.getByRole("button");
    await user.clear(input);
    await userEvent.type(input, "John Doe");
    user.click(sighnupbutton);
    expect(screen.queryByText("name is required")).toBeNull();
  });

  it("rendering sighnup email and  check if the email filed is empty ", async () => {
    const LoginHeader = screen.getByTestId("email");
    const inputEmail = screen.getByPlaceholderText("Enter Email...");
    expect(LoginHeader).toBeInTheDocument();
    expect(LoginHeader).toHaveTextContent("Email");
    user.setup();
    const sighnupbutton = screen.getByRole("button");
    await user.click(sighnupbutton);
    expect(screen.getByText("email is required")).toBeInTheDocument();
    await userEvent.type(inputEmail, "hjjahaha");
    await user.click(sighnupbutton);
    expect(screen.queryByText("invalid email")).toBeInTheDocument();
  });
  it("checking for the valid email or not", async () => {
    const inputEmail = screen.getByPlaceholderText("Enter Email...");
    user.setup();
    const sighnupbutton = screen.getByRole("button");
    await user.clear(inputEmail);
    await userEvent.type(inputEmail, "jahana@gnail.com");
    expect(inputEmail).toHaveValue();
    await user.click(sighnupbutton);
    expect(screen.queryByText("invalid email")).toBeNull();
  });
  it("rendering password to check if it is empty or not 8 characters long", async () => {
    const LoginHeader = screen.getByTestId("password");
    expect(LoginHeader).toBeInTheDocument();
    expect(LoginHeader).toHaveTextContent("Password");
    user.setup();
    const sighnupbutton = screen.getByRole("button");
    await user.click(sighnupbutton);
    expect(screen.getByText("password is required")).toBeInTheDocument();
    const input_password = screen.getByPlaceholderText("Enter Password...");
    await user.type(input_password, "jah4");
    await user.click(sighnupbutton);
    expect(
      screen.queryByText("password must be atleast 8 character long")
    ).toBeInTheDocument();
  });
  it("rendering password to check if it is valid having 8 characters long", async () => {
    user.setup();
    const sighnupbutton = screen.getByRole("button");
    const input_password = screen.getByPlaceholderText("Enter Password...");
    await user.type(input_password, "jahana#2001");
    await user.click(sighnupbutton);
    expect(
      screen.queryByText("password must be atleast 8 character long")
    ).toBeNull();
  });
  it("rendering confirm password to check if it is valid or not matching to password", async () => {
    const LoginHeader = screen.getByTestId("confirm-password");
    expect(LoginHeader).toBeInTheDocument();
    expect(LoginHeader).toHaveTextContent("Confirm Password");
    user.setup();
    const sighnupbutton = screen.getByRole("button");
    await user.click(sighnupbutton);
    expect(screen.getByText("Re-enter the password")).toBeInTheDocument();
    const input_confirmpassword = screen.getByPlaceholderText(
      "Confirm Password..."
    );
    const input_password = screen.getByPlaceholderText("Enter Password...");
    await user.type(input_password, "jahana#2001");
    await user.type(input_confirmpassword, "jahana#2002");
    await user.click(sighnupbutton);
    expect(screen.queryByText("passwords do not match")).toBeInTheDocument();
  });
  it("rendering confirm password to check if it is maching password", async () => {
    user.setup();
    const sighnupbutton = screen.getByRole("button");
    const input_password = screen.getByPlaceholderText("Enter Password...");
    const input_confirmpassword = screen.getByPlaceholderText(
      "Confirm Password..."
    );
    await user.clear(input_password);
    await user.clear(input_confirmpassword);
    await user.type(input_password, "jahana#2001");
    await user.type(input_confirmpassword, "jahana#2001");
    await user.click(sighnupbutton);
    expect(
      screen.queryByText("passwords do not match")
    ).not.toBeInTheDocument();
  });
  it("render sighn up button", async () => {
    const sighnupbutton = screen.getByRole("button");
    expect(sighnupbutton).toBeInTheDocument();
    user.setup();
    await user.click(sighnupbutton);
  });
  it("navigate to login page", () => {
    expect(screen.getByText("Already have an account")).toBeInTheDocument();
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });
  
});
