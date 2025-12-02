import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SkillCards from "./pages/SkillCards";
import StatsSummary from "./pages/StatsSummary";
import "./App.css";
import Header from "./components/Header";

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/skill-cards" element={<SkillCards />} />
                <Route path="/skill-cards/stats-summary" element={<StatsSummary />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
