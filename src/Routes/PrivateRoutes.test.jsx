import { describe, it, expect, afterEach } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { vi } from "vitest";
import PrivateRoutes from "./PrivateRoutes";

const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
});

describe("PrivateRoutes", () => {
  afterEach(() => {
    mockLocalStorage.getItem.mockClear();
  });

  it("renders Outlet when authenticated", () => {
    mockLocalStorage.getItem.mockReturnValue("true");

    const { getByText } = render(
      <MemoryRouter initialEntries={["/private"]}>
        <Routes>
          <Route path="/private" element={<PrivateRoutes />}>
            <Route path="" element={<div>Private Content</div>} />
          </Route>
          <Route path="/" element={<div>Home</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(getByText("Private Content")).toBeInTheDocument();
  });

  it("navigates to home when not authenticated", () => {
    mockLocalStorage.getItem.mockReturnValue(null);

    const { getByText } = render(
      <MemoryRouter initialEntries={["/private"]}>
        <Routes>
          <Route path="/private" element={<PrivateRoutes />}>
            <Route path="" element={<div>Private Content</div>} />
          </Route>
          <Route path="/" element={<div>Home</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(getByText("Home")).toBeInTheDocument();
  });
});