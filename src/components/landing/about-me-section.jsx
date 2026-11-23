import SectionCard from '../ui/section-card';

/**
 * AboutMeSection 컴포넌트 - Home 페이지의 About Me 섹션
 *
 * Example usage:
 * <AboutMeSection />
 */
export default function AboutMeSection() {
  return (
    <SectionCard
      id="about-me"
      title="About Me"
      description="여기는 About Me 섹션입니다. 간단한 자기소개와 '더 알아보기' 버튼이 들어갈 예정입니다."
    />
  );
}
