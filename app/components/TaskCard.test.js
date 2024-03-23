import React from "react";
import { render, screen } from "@testing-library/react";
import TaskCard from "./TaskCard"; // Import the component

// Mock the TrashIcon component
// jest.mock("@/app/Icons/TrashIcon", () => {
//   const TrashIconMock = () => <div data-testid="trash-icon-mock"></div>;
//   TrashIconMock.displayName = "TrashIconMock";
//   return TrashIconMock;
// });

describe("TaskCard", () => {
  test("renders task title and description", () => {
    // Define test data
    const task = {
      title: "Example Task",
      description: "This is an example task description.",
    };

    // Render the TaskCard component with test data
    render(<TaskCard title={task.title} description={task.description} />);

    // Assert that the task title and description are rendered
    expect(screen.getByText(task.title)).toBeInTheDocument();
    expect(screen.getByText(task.description)).toBeInTheDocument();
  });
});

// **In this test:**
// - We import the `render` and `screen` utilities from `@testing-library/react`.
// - We import the `TaskCard` component.
// - We describe a test suite using `describe` and specify a test case using `test`.
// - Inside the test case, we define some test data representing a task.
// - We render the `TaskCard` component with the test data.
// - We use assertions (`expect` statements) to verify that the task title and description are rendered in the component.
