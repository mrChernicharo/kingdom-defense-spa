import { useState } from "react";
import { Link } from "react-router-dom";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import { useStore } from "../store";

export default function Home() {
    const currentLevel = useStore((state) => state.currentLevel);
    const gold = useStore((state) => state.gold);
    const gems = useStore((state) => state.gems);
    const xp = useStore((state) => state.xp);
    const incrementCurrentLevel = useStore((state) => state.incrementCurrentLevel);
    const resetCurrentLevel = useStore((state) => state.resetCurrentLevel);
    const addGold = useStore((state) => state.addGold);
    const addGems = useStore((state) => state.addGems);
    const addXp = useStore((state) => state.addXp);
    const [goldInput, setGoldInput] = useState("100");
    const [gemsInput, setGemsInput] = useState("50");
    const [xpInput, setXpInput] = useState("200");

    return (
        <div>
            <img src={reactLogo} alt="React logo" />
            <img src={viteLogo} alt="Vite logo" />
            <br />

            <h1>Kingdom Defense</h1>

            <output>Current Level: {currentLevel}</output>
            <br />
            <button onClick={incrementCurrentLevel}>Increase Level</button>
            <button onClick={resetCurrentLevel}>Reset Level</button>
            <br />
            <br />

            <output>Gold: {gold}</output>
            <br />
            <input
                type="number"
                value={goldInput}
                onChange={(e) => setGoldInput(e.target.value)}
                placeholder="Enter gold amount"
            />
            <button
                onClick={() => {
                    const amount = parseInt(goldInput);
                    if (!isNaN(amount)) {
                        addGold(amount);
                    }
                }}
            >
                Add Gold
            </button>
            <br />
            <br />

            <output>Gems: {gems}</output>
            <br />
            <input
                type="number"
                value={gemsInput}
                onChange={(e) => setGemsInput(e.target.value)}
                placeholder="Enter gems amount"
            />
            <button
                onClick={() => {
                    const amount = parseInt(gemsInput);
                    if (!isNaN(amount)) {
                        addGems(amount);
                    }
                }}
            >
                Add Gems
            </button>
            <br />
            <br />

            <output>XP: {xp}</output>
            <br />
            <input
                type="number"
                value={xpInput}
                onChange={(e) => setXpInput(e.target.value)}
                placeholder="Enter XP amount"
            />
            <button
                onClick={() => {
                    const amount = parseInt(xpInput);
                    if (!isNaN(amount)) {
                        addXp(amount);
                    }
                }}
            >
                Add XP
            </button>
            <br />
            <br />

            <Link to="/skill-cards">
                <button>View Skill Cards</button>
            </Link>
        </div>
    );
}
