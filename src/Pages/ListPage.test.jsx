import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ListPage from "./ListPage";
describe("list page", () => {
  render(
    <BrowserRouter>
      <ListPage />
    </BrowserRouter>
  );
  vi.mock("../Components/Addlist", () => {
    return {
      default: () => <div>AddList</div>,
    };
  });
  it("heading check", () => {
    const ListPageHeading = screen.getByText("My To Do List");
    expect(ListPageHeading).toBeInTheDocument();
  });
  it("check the add list component render or not", () => {
    expect(screen.getByText("AddList")).toBeInTheDocument();
  });
});
