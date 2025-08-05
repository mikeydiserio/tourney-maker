import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Toast from "./Toast";

describe("Toast", () => {
  it("renders without crashing", () => {
    render(<Toast message="Test Toast" type="info" onClose={() => {}} />);
    expect(screen.getByText("Test Toast")).toBeInTheDocument();
  });
});
