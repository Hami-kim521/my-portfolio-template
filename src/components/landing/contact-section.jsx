import SectionCard from '../ui/section-card';

/**
 * ContactSection 컴포넌트 - Home 페이지의 Contact 섹션
 *
 * Example usage:
 * <ContactSection />
 */
export default function ContactSection() {
  return (
    <SectionCard
      id="contact"
      title="Contact"
      description="여기는 Contact 섹션입니다. 연락처, SNS, 간단한 메시지 폼이 들어갈 예정입니다."
      isAlt
    />
  );
}
