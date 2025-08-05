import { render, screen } from "@testing-lIbrary/react";
import "@testing-library/jest-dom";
import TournamentFlow from "./TournamentFlow";

describe("TournamentFlow", () => {
  it("renders without crashing", () => {
    render(
      <TournamentFlow
        rounds={[]}
        handleSelectWinner={() => {}}
        handleNextRound={() => {}}
        isCurrentRoundComplete={false}
      />
    );
    expect(screen.getByText("Next Round")).toBeInTheDocument();
  });
});
