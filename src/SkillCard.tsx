import { useEffect, useMemo, useRef } from "react";
import type { PlayerSkillCard } from "./types";
import { getSkillLevel, getCardsToNextLevel } from "./helperFns";
import "./SkillCard.css";

interface SkillCardProps {
    skillCard: PlayerSkillCard;
}

export default function SkillCard({ skillCard }: SkillCardProps) {
    const { name, description, rarity, modifier, quantity } = skillCard;
    const quantityRef = useRef<HTMLSpanElement>(null);
    const prevQuantityRef = useRef(quantity);

    const currentLevel = getSkillLevel(quantity);
    const cardsToNextLevel = getCardsToNextLevel(quantity);
    const cardsNeededForNextLevel = currentLevel + 1; // Cards needed to go from current level to next
    const cardsCollectedForNextLevel = cardsNeededForNextLevel - cardsToNextLevel;
    const progressPercentage = (cardsCollectedForNextLevel / cardsNeededForNextLevel) * 100;

    useEffect(() => {
        if (prevQuantityRef.current !== quantity && quantityRef.current) {
            quantityRef.current.classList.remove("skill-card__modifier-quantity--animate");
            setTimeout(() => {
                quantityRef.current?.classList.add("skill-card__modifier-quantity--animate");
            }, 10);
        }
        prevQuantityRef.current = quantity;
    }, [quantity]);

    const formatModifier = useMemo(() => {
        // Calculate total modifier with level bonus
        const totalAmount = modifier.isPercent
            ? modifier.amount + modifier.levelBonus * currentLevel
            : modifier.amount + modifier.levelBonus * currentLevel;

        const sign = totalAmount > 0 ? "+" : "";
        const value = modifier.isPercent ? `${sign}${totalAmount}%` : `${sign}${totalAmount}`;

        let statName: string = modifier.stat;
        if (modifier.type === "SPECIFIC_UNIT") {
            statName = `${modifier.target} ${modifier.stat}`;
        } else if (modifier.type === "ECONOMIC") {
            statName = modifier.stat;
        } else if (modifier.type === "DEFENSE") {
            statName = `castle ${modifier.stat}`;
        }

        return `${value} ${statName}`;
    }, [
        modifier.amount,
        modifier.isPercent,
        modifier.stat,
        modifier.target,
        modifier.type,
        modifier.levelBonus,
        currentLevel,
    ]);

    return (
        <div className={`skill-card skill-card--${rarity.toLowerCase()}`}>
            <div className="skill-card__header">
                <h3 className="skill-card__name">{name}</h3>
                <div className="skill-card__header-right">
                    <span className="skill-card__level">Lv {currentLevel}</span>
                    <span className="skill-card__rarity">{rarity}</span>
                </div>
            </div>
            <p className="skill-card__description">{description}</p>
            <div className="skill-card__modifier">
                <span className="skill-card__modifier-value">{formatModifier}</span>
                <span ref={quantityRef} className="skill-card__modifier-quantity">
                    {quantity}x
                </span>
            </div>
            <div className="skill-card__progress">
                <div className="skill-card__progress-bar">
                    <div className="skill-card__progress-fill" style={{ width: `${progressPercentage}%` }} />
                </div>
                <span className="skill-card__progress-text">
                    {cardsCollectedForNextLevel}/{cardsNeededForNextLevel}
                </span>
            </div>
        </div>
    );
}
