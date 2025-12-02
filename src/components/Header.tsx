import { useStore } from "../store";
import goldIcon from "../assets/resources/gold.png";
import gemIcon from "../assets/resources/gem.png";
import "./Header.css";

function Header() {
    const gold = useStore((state) => state.gold);
    const gems = useStore((state) => state.gems);

    return (
        <>
            <header className="header">
                <div className="header-resource">
                    <img src={goldIcon} alt="Gold" />
                    <span key={gold} className="header-resource-value">
                        {gold.toLocaleString()}
                    </span>
                </div>
                <div className="header-resource">
                    <img src={gemIcon} alt="Gems" />
                    <span key={gems} className="header-resource-value">
                        {gems.toLocaleString()}
                    </span>
                </div>
            </header>
            {/* filler */}
            <div style={{ height: "34px", width: "100%" }}></div>
        </>
    );
}

export default Header;
