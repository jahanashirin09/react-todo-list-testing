import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ListComponent from "./ListComponent";

describe("ListComponent", () => {
  const tasks = [
    { id: 1, title: "Task 1", completed: false },
    { id: 2, title: "Task 2", completed: true },
  ];

  const mockHandleDelete = vi.fn();
  const mockHandleEdit = vi.fn();
  const mockHandleComplete = vi.fn();

  it("renders tasks with correct class names based on completion status", () => {
    render(
      <ListComponent
        tasks={tasks}
        handledelete={mockHandleDelete}
        handleEdit={mockHandleEdit}
        handleComplete={mockHandleComplete}
      />
    );
    const firstTaskInput = screen.getByDisplayValue("Task 1");
    expect(firstTaskInput).toHaveClass("text-task");
    expect(firstTaskInput).not.toHaveClass("completed");
    const secondTaskInput = screen.getByDisplayValue("Task 2");
    expect(secondTaskInput).toHaveClass("text-taskcompleted");
  });
});
