import { describe, expect, it,  vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Addlist from "./Addlist";
import user, { userEvent } from "@testing-library/user-event";

describe("Addlist Component", () => {
  render(
    <BrowserRouter>
      <Addlist />
    </BrowserRouter>
  );
  vi.mock("./Logout", () => {
    return {
      default: () => <div>logout</div>,
    };
  });

  it("renders the input and button correctly", async () => {
    const input = screen.getByTestId("input-task");
    const button = screen.getByRole("button", { name: /add task/i });
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    user.setup();
    await userEvent.type(input, "Task");
    const input_value = input.value;
    await user.click(button);
    expect(input_value).toBe("Task");
  });
  it("edit the task", async () => {
    const input = screen.getByTestId("input-task");
    const edit_button = screen.getByRole("button", { name: /edit/i });
    user.setup();
    await user.click(edit_button);
    await user.clear(input);
    await userEvent.type(input, "updated");
    const button_ok = screen.getByRole("button", { name: "Ok" });
    await user.click(button_ok);
    expect(input.value).toBe("");
  });
  it("delete the task", async () => {
    const input = screen.getByTestId("input-task");
    const button = screen.getByRole("button", { name: /add task/i });
    user.setup();
    await userEvent.type(input, "delete");
    await user.click(button);
    const delete_button = screen.getAllByRole("button", { name: "Delete" });
    await user.click(delete_button[delete_button.length - 1]);
    expect(screen.queryByText("delete")).not.toBeInTheDocument();
  });
  it("complete the task", async () => {
 
    const input = screen.getByTestId("input-task");
    const button = screen.getByRole("button", { name: /add task/i });
    await userEvent.type(input, "complete");
    await user.click(button);
    const completeButtons = screen.getAllByRole("button", { name: "complete" });
    const completed_element = completeButtons[completeButtons.length -1];
    await user.click(completed_element);
    const firstTaskInput = screen.getByDisplayValue('updated');
    expect(firstTaskInput).toHaveClass('text-task');
    expect(firstTaskInput).not.toHaveClass('text-taskcompleted');
    const secondTaskInput = screen.getByDisplayValue('complete');
    expect(secondTaskInput).toHaveClass('text-taskcompleted');
  });
  it("render the logout component ", async () => {
    expect(screen.getByText("logout")).toBeInTheDocument();
  });
});
