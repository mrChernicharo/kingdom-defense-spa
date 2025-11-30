export function getSkillLevel(cardCount: number): number {
  if (cardCount <= 0) return 0;

  // Find the level where cardCount falls
  // Total cards to reach level N = N * (N + 1) / 2
  // Solving: N^2 + N - 2*cardCount = 0
  // N = (-1 + sqrt(1 + 8*cardCount)) / 2
  const formulaResult = (-1 + Math.sqrt(1 + 8 * cardCount)) / 2;

  return Math.floor(formulaResult);
}

export function getCardsToNextLevel(cardCount: number): number {
  const currentLevel = getSkillLevel(cardCount);
  const nextLevel = currentLevel + 1;

  // Total cards needed to reach next level
  const cardsForNextLevel = (nextLevel * (nextLevel + 1)) / 2;

  // Cards still needed
  return cardsForNextLevel - cardCount;
}
