import React, { useEffect, useState } from "react";
import { useGameStore } from "../../store/GameStore";
import { Card } from "./Card";
import "../styles/GameBoard/GameBoard.scss";
import { GameStats } from "../GameStats/GameStats";
import { GameHistory } from "../GameHistory/GameHistory";
import { MainButton } from "../MainButton/MainButton";

export const GameBoard: React.FC = () => {
  const { cards, resetGame, setDifficulty } = useGameStore();

  const [selectedLevel, setSelectedLevel] = useState<
    "easy" | "medium" | "hard"
  >("easy");

  const handleLevelClick = (level: "easy" | "medium" | "hard") => {
    setSelectedLevel(level);
    setDifficulty(level);
  };

  const [isAnimating, setIsAnimating] = useState(false);
  const [isOpacity, setIsOpacity] = useState(false);
  useEffect(() => {
    setIsOpacity(true);
    setIsAnimating(true);

    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 800); // time animation (800ms)

    // Czyszczenie timera
    return () => clearTimeout(timer);
  }, [selectedLevel]);

  return (
    <div
      className={`game-board ${isOpacity ? "" : "opacity"}  ${
        isAnimating ? "animating" : ""
      }`}
    >
      <MainButton onClick={resetGame} className="reset-button">
        Restart Game
      </MainButton>
      <GameStats />
      <div>
        <MainButton
          onClick={() => handleLevelClick("easy")}
          className={`level ${selectedLevel === "easy" ? "active" : ""}`}
        >
          Easy
        </MainButton>
        <MainButton
          onClick={() => handleLevelClick("medium")}
          className={`level ${selectedLevel === "medium" ? "active" : ""}`}
        >
          medium
        </MainButton>
        <MainButton
          onClick={() => handleLevelClick("hard")}
          className={`level ${selectedLevel === "hard" ? "active" : ""}`}
        >
          hard
        </MainButton>
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
