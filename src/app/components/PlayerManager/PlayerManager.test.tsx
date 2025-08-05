import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import PlayerManager from "./PlayerManager";

describe("PlayerManager", () => {
  it("renders without crashing", () => {
    render(
      <PlayerManager
        players={[]}
        newPlayerName=""
        setNewPlayerName={() => {}}
        handleAddPlayer={() => {}}
        handleRemovePlayer={() => {}}
        handleStartTournament={() => {}}
      />
    );
    expect(screen.getByText("Add Competitors")).toBeInTheDocument();
  });
});
