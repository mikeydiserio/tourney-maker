import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { useToast } from "../hooks/useToast";
import { ToastProvider } from "./ToastProvider";

const TestComponent = () => {
  const { addToast } = useToast();
  return <button onClick={() => addToast("Test Toast")}>Add Toast</button>;
};

describe("ToastProvider", () => {
  it("renders children and provides toast context", () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );
    expect(screen.getByText("Add Toast")).toBeInTheDocument();
  });
});
