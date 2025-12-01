import { useStore } from "../store";
import SkillCard from "./SkillCard";
import "./SkillCardList.css";

export default function SkillCardList() {
    const skillCards = useStore((state) => state.skillCards);

    const rarityOrder = { COMMON: 0, FINE: 1, RARE: 2, EPIC: 3, LEGENDARY: 4 };
    const skillCardArr = Object.values(skillCards).sort((a, b) => rarityOrder[a.rarity] - rarityOrder[b.rarity]);

    return (
        <ul className="skill-card-list">
            {skillCardArr.map((skillCard) => (
                <SkillCard key={skillCard.name} skillCard={skillCard} />
            ))}
        </ul>
    );
}
