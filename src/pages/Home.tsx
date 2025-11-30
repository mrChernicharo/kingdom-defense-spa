import { Link } from "react-router-dom";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import { useStore } from "../store";

export default function Home() {
    const currentLevel = useStore((state) => state.currentLevel);
    const incrementCurrentLevel = useStore((state) => state.incrementCurrentLevel);
    const resetCurrentLevel = useStore((state) => state.resetCurrentLevel);

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

            <Link to="/skill-cards">
                <button>View Skill Cards</button>
            </Link>
        </div>
    );
}
