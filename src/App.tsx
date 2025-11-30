import "./App.css";
import reactLogo from "./assets/react.svg";
import { useStore } from "./store";
import viteLogo from "/vite.svg";
import SkillCard from "./SkillCard";
import { ALL_SKILL_CARDS } from "./cards";

// Assign weights based on rarity (higher weight = more common)
const rarityWeights = {
    COMMON: 50,
    FINE: 25,
    RARE: 15,
    EPIC: 7,
    LEGENDARY: 3,
};

// Create weighted array
const weightedCards: typeof ALL_SKILL_CARDS = [];
ALL_SKILL_CARDS.forEach((card) => {
    const weight = rarityWeights[card.rarity];
    for (let i = 0; i < weight; i++) {
        weightedCards.push(card);
    }
});

function App() {
    const currentLevel = useStore((state) => state.currentLevel);
    const skillCards = useStore((state) => state.player.skillCards);
    const incrementCurrentLevel = useStore((state) => state.incrementCurrentLevel);
    const resetCurrentLevel = useStore((state) => state.resetCurrentLevel);
    const addSkillCard = useStore((state) => state.addSkillCard);
    const resetSkillCards = useStore((state) => state.resetSkillCards);

    const rarityOrder = { COMMON: 0, FINE: 1, RARE: 2, EPIC: 3, LEGENDARY: 4 };
    const skillCardArr = Object.values(skillCards).sort((a, b) => rarityOrder[a.rarity] - rarityOrder[b.rarity]);

    const pickCard = () => {
        // Pick random card from weighted array
        const randIdx = Math.floor(Math.random() * weightedCards.length);
        const pickedCard = weightedCards[randIdx];
        // console.log("pickedCard ===", { weightedCards, randIdx, pickedCard });
        addSkillCard(pickedCard);
    };

    return (
        <div>
            <img src={reactLogo} />
            <img src={viteLogo} />
            <br />

            <output>currentLevel {currentLevel}</output>
            <br />
            <button onClick={incrementCurrentLevel}>increase</button>
            <button onClick={resetCurrentLevel}>reset</button>

            <ul style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
                {skillCardArr.map((skillCard) => (
                    <SkillCard key={skillCard.name} skillCard={skillCard} />
                ))}
            </ul>

            <button onClick={pickCard}>Pick Card</button>
            <button onClick={resetSkillCards}>Reset Cards</button>
        </div>
    );
}

export default App;
