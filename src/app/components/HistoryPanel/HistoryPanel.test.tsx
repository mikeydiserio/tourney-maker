import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import HistoryPanel from "./HistoryPanel";

describe("HistoryPanel", () => {
  it("renders without crashing", () => {
    render(
      <HistoryPanel
        isOpen={true}
        tournaments={[]}
        onSelectTournament={() => {}}
      />
    );
    expect(screen.getByText("Tournament History")).toBeInTheDocument();
  });
});
