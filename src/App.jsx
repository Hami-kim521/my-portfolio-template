import { Navigate, Route, Routes } from 'react-router-dom';

import PageLayout from './components/common/page-layout';
import AboutPage from './pages/about-page';
import HomePage from './pages/home-page';
import ProjectsPage from './pages/projects-page';

export default function App() {
  return (
    <Routes>
      <Route element={<PageLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
