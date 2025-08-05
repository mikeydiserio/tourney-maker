import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import SaveGameDialog from "./SaveGameDialog";

describe("SaveGameDialog", () => {
  it("renders without crashing", () => {
    render(
      <SaveGameDialog
        onSave={() => {}}
        onDontSave={() => {}}
        onCancel={() => {}}
      />
    );
    expect(screen.getByText("Save Tournament?")).toBeInTheDocument();
  });
});
