import { useGameStore } from "../../store/GameStore";
import "../styles/GameStats/GameStats.scss";

export const GameStats = () => {
  const score = useGameStore((state) => state.score);

  return (
    <div className="game-stats">
      <p>Liczba prób: {score}</p>
    </div>
  );
};
