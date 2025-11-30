import { Link } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa";
import { useStore } from "../store";
import SkillCardList from "../components/SkillCardList";
import { ALL_SKILL_CARDS } from "../cards";
import "./SkillCards.css";

export default function SkillCards() {
    const addSkillCard = useStore((state) => state.addSkillCard);
    const resetSkillCards = useStore((state) => state.resetSkillCards);

    const pickCard = () => {
        const rarityWeights = {
            COMMON: 50,
            FINE: 25,
            RARE: 15,
            EPIC: 7,
            LEGENDARY: 3,
        };

        const weightedCards: typeof ALL_SKILL_CARDS = [];
        ALL_SKILL_CARDS.forEach((card) => {
            const weight = rarityWeights[card.rarity];
            for (let i = 0; i < weight; i++) {
                weightedCards.push(card);
            }
        });

        const randIdx = Math.floor(Math.random() * weightedCards.length);
        const pickedCard = weightedCards[randIdx];
        console.log("pickedCard ===", pickedCard);
        addSkillCard(pickedCard);
    };

    return (
        <div>
            <div className="skill-cards-header">
                <Link to="/">
                    <button>← Back to Home</button>
                </Link>
                <Link to="/skill-cards/stats-summary" className="stats-link">
                    <FaInfoCircle size={24} />
                </Link>
            </div>

            <h1>Skill Cards</h1>

            <div style={{ marginBottom: "1rem" }}>
                <button onClick={pickCard}>Pick Card</button>
                <button onClick={resetSkillCards}>Reset Cards</button>
            </div>

            <SkillCardList />
        </div>
    );
}
