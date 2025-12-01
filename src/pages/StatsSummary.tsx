import { Link } from "react-router-dom";
import { useStore } from "../store";
import { getSkillLevel } from "../helperFns";
import "./StatsSummary.css";

export default function StatsSummary() {
    const skillCards = useStore((state) => state.skillCards);

    // Aggregate stats by category
    const stats = {
        allUnits: {} as Record<string, { value: number; isPercent: boolean }>,
        specificUnits: {} as Record<string, { value: number; isPercent: boolean }>,
        economic: {} as Record<string, { value: number; isPercent: boolean }>,
        defense: {} as Record<string, { value: number; isPercent: boolean }>,
    };

    Object.values(skillCards).forEach((card) => {
        const level = getSkillLevel(card.quantity);
        const totalAmount = card.modifier.amount + card.modifier.levelBonus * level;

        const key = card.modifier.stat;

        if (card.modifier.type === "ALL_UNITS") {
            if (!stats.allUnits[key]) {
                stats.allUnits[key] = { value: 0, isPercent: card.modifier.isPercent };
            }
            stats.allUnits[key].value += totalAmount;
        } else if (card.modifier.type === "SPECIFIC_UNIT") {
            const unitKey = `${card.modifier.target} ${key}`;
            if (!stats.specificUnits[unitKey]) {
                stats.specificUnits[unitKey] = { value: 0, isPercent: card.modifier.isPercent };
            }
            stats.specificUnits[unitKey].value += totalAmount;
        } else if (card.modifier.type === "ECONOMIC") {
            if (!stats.economic[key]) {
                stats.economic[key] = { value: 0, isPercent: card.modifier.isPercent };
            }
            stats.economic[key].value += totalAmount;
        } else if (card.modifier.type === "DEFENSE") {
            const defenseKey = `castle ${key}`;
            if (!stats.defense[defenseKey]) {
                stats.defense[defenseKey] = { value: 0, isPercent: card.modifier.isPercent };
            }
            stats.defense[defenseKey].value += totalAmount;
        }
    });

    return (
        <div className="stats-summary">
            <Link to="/skill-cards">
                <button>← Back to Skill Cards</button>
            </Link>
            <h1>Stats Summary</h1>

            <div className="stats-container">
                <StatSection title="All Units" statObj={stats.allUnits} />
                <StatSection title="Specific Units" statObj={stats.specificUnits} />
                <StatSection title="Economic" statObj={stats.economic} />
                <StatSection title="Defense" statObj={stats.defense} />
            </div>

            {Object.values(stats).every((s) => Object.keys(s).length === 0) && (
                <p className="no-stats">No skill cards collected yet!</p>
            )}
        </div>
    );
}

interface StatSectionProps {
    title: string;
    statObj: Record<string, { value: number; isPercent: boolean }>;
}

function StatSection({ title, statObj }: StatSectionProps) {
    const entries = Object.entries(statObj);
    if (entries.length === 0) return null;

    return (
        <div className="stat-section">
            <h3>{title}</h3>
            <ul className="stat-list">
                {entries.map(([stat, { value, isPercent }]) => (
                    <li key={stat} className="stat-item">
                        <span className="stat-name">{stat}</span>
                        <span className="stat-value">
                            {value > 0 ? "+" : ""}
                            {value}
                            {isPercent ? "%" : ""}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
