import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { getSkillLevel, getCardsToNextLevel } from "./helperFns.ts";

let cardCount = 0;
while (cardCount < 100) {
  console.log({
    cardCount,
    level: getSkillLevel(cardCount),
    toNextLevel: getCardsToNextLevel(cardCount),
  });
  cardCount++;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
