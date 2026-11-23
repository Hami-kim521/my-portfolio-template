import Stack from '@mui/material/Stack';

import AboutMeSection from '../components/landing/about-me-section';
import ContactSection from '../components/landing/contact-section';
import HeroSection from '../components/landing/hero-section';
import ProjectsSection from '../components/landing/projects-section';
import SkillTreeSection from '../components/landing/skill-tree-section';

/**
 * HomePage - Hero / About Me / Skill Tree / Projects / Contact 5개 섹션
 */
export default function HomePage() {
  return (
    <Stack spacing={{ xs: 2, md: 3 }}>
      <HeroSection />
      <AboutMeSection />
      <SkillTreeSection />
      <ProjectsSection />
      <ContactSection />
    </Stack>
  );
}
