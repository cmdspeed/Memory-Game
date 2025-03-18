import { useGameStore } from "../../store/GameStore";
import "../styles/GameStats/GameStats.scss";

export const GameStats = () => {
  const { score, timer } = useGameStore();

  return (
    <div className="game-stats">
      <p>number of attempts: {score}</p>
      <p>time: {timer} second</p>
    </div>
  );
};
