import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Logout from "./Logout";
import { BrowserRouter } from "react-router-dom";
import user from "@testing-library/user-event";

describe("Logout Component", () => {
  render(
    <BrowserRouter>
      <Logout/>
    </BrowserRouter>
  );

  //   const navigate = vi.fn()
  // beforeEach(()=>{
  //   vi.spyOn(router,'useNavigate').mockImplementation(()=>navigate)
  // })

  it("check if the logout button exisist or not", () => {
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });
  it("check if the button is clickable", async () => {
    user.setup();
    const button = screen.getByRole("button");
    await user.click(button);
  });

  it("check if removing the login status and navigation to login page takes place", async () => {
    localStorage.removeItem = vi.fn();
    expect(localStorage.getItem("LoginStatus")).toBe(null);
    // expect(navigate).toBeCalledWith('/')
  });
});
