import { images } from "../images/images";
import { shuffleArray } from "../shuffleArray/shuffleArray";

export const generateCards = (difficulty: "easy" | "medium" | "hard") => {
  let pairs: number;
  switch (difficulty) {
    case "easy":
      pairs = 6;
      break;
    case "medium":
      pairs = 12;
      break;
    case "hard":
      pairs = 18;
      break;
    default:
      pairs = 6;
  }
  const selectedImages = shuffleArray(images).slice(0, pairs);

  const cards = [...selectedImages, ...selectedImages];
  return shuffleArray(cards).map((image, index) => ({
    id: index,
    image,
    matched: false,
    flipped: false,
  }));
};
