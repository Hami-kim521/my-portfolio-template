import SectionCard from '../ui/section-card';

/**
 * HeroSection 컴포넌트 - Home 페이지의 Hero 섹션
 *
 * Example usage:
 * <HeroSection />
 */
export default function HeroSection() {
  return (
    <SectionCard
      id="hero"
      title="Hero"
      description="여기는 Hero 섹션입니다. 메인 비주얼, 이름, 간단 소개가 들어갈 예정입니다."
      isHighlight
    />
  );
}
