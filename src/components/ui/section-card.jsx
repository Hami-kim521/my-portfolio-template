import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

/**
 * SectionCard 컴포넌트 - 섹션 공통 카드 (상단 2px 포인트 라인 + 제목 + 본문)
 *
 * Props:
 * @param {string} id - 섹션 id [Optional]
 * @param {string} title - 섹션 제목 [Required]
 * @param {string} description - 섹션 설명 텍스트 [Required]
 * @param {boolean} isHighlight - 오렌지 배경 강조 여부 [Optional, 기본값: false]
 * @param {boolean} isAlt - 보조 배경색 사용 여부 [Optional, 기본값: false]
 *
 * Example usage:
 * <SectionCard title="Hero" description="설명" isHighlight />
 */
export default function SectionCard({
  id,
  title,
  description,
  isHighlight = false,
  isAlt = false,
}) {
  let bgcolor = 'var(--color-bg-primary)';
  if (isAlt) bgcolor = 'var(--color-bg-secondary)';
  if (isHighlight) bgcolor = 'var(--color-primary)';

  return (
    <Card
      component="section"
      id={id}
      variant="outlined"
      sx={{
        width: '100%',
        bgcolor,
        borderColor: 'var(--color-border)',
        borderTop: '2px solid var(--color-primary)',
        borderRadius: 2,
      }}
    >
      <CardContent
        sx={{
          textAlign: 'center',
          py: { xs: isHighlight ? 6 : 4, md: isHighlight ? 10 : 6 },
          px: { xs: 2, md: 4 },
        }}
      >
        <Box
          component="h2"
          sx={{
            m: 0,
            mb: 2,
            fontSize: { xs: '1.5rem', md: isHighlight ? '2.5rem' : '2rem' },
            lineHeight: 1.3,
            color: isHighlight ? '#FFFFFF' : 'var(--color-text-secondary)',
          }}
        >
          {title}
        </Box>
        <Box
          component="p"
          sx={{
            m: 0,
            fontSize: { xs: '1rem', md: '1.1rem' },
            lineHeight: 1.6,
            color: isHighlight ? '#FFFFFF' : 'var(--color-text-primary)',
          }}
        >
          {description}
        </Box>
      </CardContent>
    </Card>
  );
}
