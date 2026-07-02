import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppShell from "./components/appShell/AppShell";
import AiAssistantPage from "./pages/AiAssistantPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import PastPapersPage from "./pages/PastPapersPage";

export default function App() {
  return (
    <Router>
      <AppShell>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/past-papers" element={<PastPapersPage />} />
          <Route path="/ai-assistant" element={<AiAssistantPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AppShell>
    </Router>
  );
}
