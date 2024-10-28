import { describe, it, expect } from "vitest";
import { screen, render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import PageNavigation from "./Routes/PageNavigation";
import { GoogleOAuthProvider } from "@react-oauth/google";

describe("App Component", () => {
  it("renders PageNavigation component within BrowserRouter", () => {
    render(
      <BrowserRouter>
        <GoogleOAuthProvider clientId="287235108170-d1rjgc09hn96crj9l9he2uevkjpkvcu7.apps.googleusercontent.com">
          <PageNavigation />
        </GoogleOAuthProvider>
      </BrowserRouter>
    );
    expect(screen.getByTestId("LoginHeader")).toBeInTheDocument();
  });
});
