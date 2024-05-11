import { BrowserRouter, Route, Routes } from "react-router-dom";
import Level1 from "../pages/level1/Level1";
import Login from "../pages/login/Login";
import Level2 from "../pages/level2/Level2";
import Profile from "../pages/profile/Profile";
import Level3 from "../pages/level3/Level3";
import Level4 from "../pages/level4/Level4";
import { LivesProvider } from "../context/LivesContext";
import { RewardsProvider } from "../context/RewardsContext";
import { UserProvider } from "../context/UserContext";

export default function RoutesDeadGame() {
    return (
        <UserProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/level1" element={<LivesProvider><RewardsProvider><Level1 /></RewardsProvider></LivesProvider>} />
                    <Route path="/level2" element={<Level2 />} />
                    <Route path="/level3" element={<Level3 />} />
                    <Route path="/level4" element={<Level4 />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </BrowserRouter>
        </UserProvider>
    )
}