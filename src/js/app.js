import react from "react";
import { render } from "react-dom";
import "../css/index.css";
import Search from "./components/search";
import LeaderBoard from "./components/leaderboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Search />} />
      <Route path="/leaderboard" element={<LeaderBoard />} />
    </Routes>
  </BrowserRouter>,

  document.getElementById("root")
);
