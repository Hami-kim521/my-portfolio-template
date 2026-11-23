import SectionCard from '../ui/section-card';

/**
 * SkillTreeSection 컴포넌트 - Home 페이지의 Skill Tree 섹션
 *
 * Example usage:
 * <SkillTreeSection />
 */
export default function SkillTreeSection() {
  return (
    <SectionCard
      id="skill-tree"
      title="Skill Tree"
      description="여기는 Skill Tree 섹션입니다. 기술 스택을 트리나 프로그레스바로 시각화할 예정입니다."
      isAlt
    />
  );
}
