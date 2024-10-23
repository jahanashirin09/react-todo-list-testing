import { describe, expect, it, vi, afterEach, } from "vitest";
import { screen, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PageNavigation from "./PageNavigation";
import { GoogleOAuthProvider } from "@react-oauth/google";

vi.mock("./PrivateRoutes", () => {
  return {
    default: ({ children }) => <>{children}</>,
  };
});

describe("PageNavigation", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  it("renders Login page at root path", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <GoogleOAuthProvider clientId="287235108170-d1rjgc09hn96crj9l9he2uevkjpkvcu7.apps.googleusercontent.com">
          <PageNavigation />
        </GoogleOAuthProvider>
      </MemoryRouter>
    );
    expect(screen.getByTestId("LoginHeader")).toBeInTheDocument();
  });

  it("renders SignUp page at /signUp path", () => {
    render(
      <MemoryRouter initialEntries={["/signUp"]}>
        <GoogleOAuthProvider clientId="287235108170-d1rjgc09hn96crj9l9he2uevkjpkvcu7.apps.googleusercontent.com">
          <PageNavigation />
        </GoogleOAuthProvider>
      </MemoryRouter>
    );
    expect(screen.getByText("Sign Up")).toBeInTheDocument();
  });
  it("does not render ListPage when not authenticated", () => {
    render(
      <MemoryRouter initialEntries={["/listpage"]}>
        <GoogleOAuthProvider clientId="287235108170-d1rjgc09hn96crj9l9he2uevkjpkvcu7.apps.googleusercontent.com">
          <PageNavigation />
        </GoogleOAuthProvider>
      </MemoryRouter>
    );
    expect(screen.queryByText("List Page")).not.toBeInTheDocument();
  });
});

