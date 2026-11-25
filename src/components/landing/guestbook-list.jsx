import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { keyframes } from '@mui/material/styles';

import { formatDate } from '../../utils/format-date';

/** 메모지 색상 / 기울기 (id 기준으로 순환해서 항상 같은 모양 유지) */
const NOTE_COLORS = ['var(--color-note-1)', 'var(--color-note-2)', 'var(--color-note-3)', 'var(--color-note-4)'];
const NOTE_TILTS = [-1.2, 0.9, -0.6, 1.1];

const popIn = keyframes`
  from { opacity: 0; transform: translateY(12px) scale(0.96); }
  to { opacity: 1; }
`;

/**
 * GuestbookList 컴포넌트 - 롤링페이퍼 스타일 방명록 (메모지 보드, 최신순)
 *
 * Props:
 * @param {Array} entries - 방명록 목록 [Required]
 * @param {boolean} isLoading - 최초 로딩 중 여부 [Optional, 기본값: false]
 * @param {boolean} hasMore - 더 불러올 항목 존재 여부 [Optional, 기본값: false]
 * @param {function} onLoadMore - '더 보기' 클릭 시 실행 [Optional]
 *
 * Example usage:
 * <GuestbookList entries={entries} hasMore onLoadMore={loadMore} />
 */
export default function GuestbookList({ entries, isLoading = false, hasMore = false, onLoadMore }) {
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress size={28} sx={{ color: 'var(--color-primary)' }} />
      </Box>
    );
  }

  if (entries.length === 0) {
    return (
      <Box sx={{ py: 4, color: 'var(--color-text-muted)', textAlign: 'center' }}>
        아직 붙은 메모지가 없어요. 첫 번째 주인공이 되어주세요!
      </Box>
    );
  }

  return (
    <Box>
      <Box
        component="ul"
        sx={{
          listStyle: 'none',
          m: 0,
          p: 0,
          pt: 1,
          columnCount: { xs: 1, sm: 2, md: 3 },
          columnGap: 2.5,
        }}
      >
        {entries.map((entry) => {
          const tilt = NOTE_TILTS[entry.id % NOTE_TILTS.length];
          return (
            <Box
              key={entry.id}
              component="li"
              sx={{
                position: 'relative',
                breakInside: 'avoid',
                mb: 2.5,
                p: 2.5,
                pt: 3,
                textAlign: 'left',
                bgcolor: NOTE_COLORS[entry.id % NOTE_COLORS.length],
                border: '1px solid rgba(0, 0, 0, 0.06)',
                borderRadius: '4px',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
                transform: `rotate(${tilt}deg)`,
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                animation: `${popIn} 0.35s ease-out`,
                '@media (prefers-reduced-motion: reduce)': { animation: 'none', transition: 'none' },
                '&:hover': {
                  transform: 'rotate(0deg) translateY(-3px)',
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.12)',
                },
                /* 테이프 */
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: -9,
                  left: '50%',
                  width: 56,
                  height: 18,
                  transform: 'translateX(-50%) rotate(-2deg)',
                  bgcolor: 'var(--color-accent-yellow)',
                  opacity: 0.55,
                  borderRadius: '2px',
                },
              }}
            >
              <Box aria-hidden="true" sx={{ fontSize: '1.6rem', lineHeight: 1, mb: 1 }}>
                {entry.emoji}
              </Box>
              <Box component="p" sx={{ m: 0, lineHeight: 1.7, whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>
                {entry.message}
              </Box>
              {entry.photo_url && (
                <Box
                  component="img"
                  src={entry.photo_url}
                  alt={`${entry.masked_name}님이 남긴 사진`}
                  loading="lazy"
                  sx={{
                    mt: 1.5,
                    display: 'block',
                    width: '100%',
                    maxHeight: 260,
                    objectFit: 'cover',
                    border: '4px solid var(--color-bg-primary)',
                    borderRadius: '2px',
                  }}
                />
              )}
              <Box
                sx={{
                  mt: 2,
                  pt: 1.25,
                  display: 'flex',
                  alignItems: 'baseline',
                  flexWrap: 'wrap',
                  columnGap: 1,
                  borderTop: '1px dashed rgba(0, 0, 0, 0.18)',
                  fontSize: '0.875rem',
                }}
              >
                <Box component="strong" sx={{ color: 'var(--color-text-secondary)' }}>
                  {entry.masked_name}
                </Box>
                {entry.organization && (
                  <Box component="span" sx={{ color: 'var(--color-text-muted)' }}>
                    {entry.organization}
                  </Box>
                )}
                <Box
                  component="time"
                  dateTime={entry.created_at}
                  sx={{ ml: 'auto', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}
                >
                  {formatDate(entry.created_at)}
                </Box>
              </Box>
            </Box>
          );
        })}
      </Box>

      {hasMore && (
        <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center' }}>
          <Button
            onClick={onLoadMore}
            sx={{ color: 'var(--color-primary-dark)', '&:hover': { bgcolor: 'var(--color-warm-bg)' } }}
          >
            더 보기
          </Button>
        </Box>
      )}
    </Box>
  );
}
