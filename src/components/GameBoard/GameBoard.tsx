import React, { useState } from "react";
import { useGameStore } from "../../store/GameStore";
import { Card } from "./Card";
import "../styles/GameBoard/GameBoard.scss";
import { GameStats } from "../GameStats/GameStats";
import { GameHistory } from "../GameHistory/GameHistory";

export const GameBoard: React.FC = () => {
  const { cards, resetGame, setDifficulty } = useGameStore();

  const [selectedLevel, setSelectedLevel] = useState<
    "easy" | "medium" | "hard"
  >("easy");

  const handleLevelClick = (level: "easy" | "medium" | "hard") => {
    setSelectedLevel(level);
    setDifficulty(level);
  };

  return (
    <div className="game-board">
      <button onClick={resetGame} className="reset-button">
        Restart Game
      </button>
      <GameStats />
      <div>
        <button
          onClick={() => handleLevelClick("easy")}
          className={`level ${selectedLevel === "easy" ? "active" : ""}`}
        >
          Easy
        </button>
        <button
          onClick={() => handleLevelClick("medium")}
          className={`level ${selectedLevel === "medium" ? "active" : ""}`}
        >
          Medium
        </button>
        <button
          onClick={() => handleLevelClick("hard")}
          className={`level ${selectedLevel === "hard" ? "active" : ""}`}
        >
          Hard
        </button>
      </div>
      <div className="board">
        {cards.map((card) => (
          <Card key={card.id} {...card} />
        ))}
      </div>
      <GameHistory />
    </div>
  );
};
