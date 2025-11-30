import type { PlayerSkillCard } from "./types";
import "./SkillCard.css";

interface SkillCardProps {
    skillCard: PlayerSkillCard;
}

export default function SkillCard({ skillCard }: SkillCardProps) {
    const { name, description, rarity, modifier, quantity } = skillCard;

    const formatModifier = () => {
        const sign = modifier.amount > 0 ? "+" : "";
        const value = modifier.isPercent ? `${sign}${modifier.amount}%` : `${sign}${modifier.amount}`;

        let statName: string = modifier.stat;
        if (modifier.type === "SPECIFIC_UNIT") {
            statName = `${modifier.target} ${modifier.stat}`;
        } else if (modifier.type === "ECONOMIC") {
            statName = modifier.stat;
        } else if (modifier.type === "DEFENSE") {
            statName = `castle ${modifier.stat}`;
        }

        return `${value} ${statName}`;
    };

    return (
        <div className={`skill-card skill-card--${rarity.toLowerCase()}`}>
            <div className="skill-card__header">
                <h3 className="skill-card__name">{name}</h3>
                <span className="skill-card__rarity">{rarity}</span>
            </div>
            <p className="skill-card__description">{description}</p>
            <div className="skill-card__modifier">
                <span className="skill-card__modifier-value">{formatModifier()}</span>
                <span className="skill-card__modifier-quantity">{quantity}</span>
                <span className="skill-card__level-bonus">+{modifier.levelBonus}% per level</span>
            </div>
        </div>
    );
}
