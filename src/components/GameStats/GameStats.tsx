import { useGameStore } from "../../store/GameStore";
import "../styles/GameStats/GameStats.scss";

export const GameStats = () => {
  const { score, timer } = useGameStore();

  return (
    <div className="game-stats">
      <p>Liczba prób: {score}</p>
      <p>czas: {timer} sek</p>
    </div>
  );
};
