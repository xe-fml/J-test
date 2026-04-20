import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import Quiz from './pages/Quiz';
import ExpertInsights from './pages/ExpertInsights';

const App: React.FC = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="/quiz/:id" element={<Quiz />} />
        <Route path="/expert-insights" element={<ExpertInsights />} />
      </Routes>
    </Router>
  );
};

export default App;