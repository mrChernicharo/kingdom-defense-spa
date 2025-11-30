import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SkillCards from "./pages/SkillCards";
import StatsSummary from "./pages/StatsSummary";
import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/skill-cards" element={<SkillCards />} />
                <Route path="/skill-cards/stats-summary" element={<StatsSummary />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
