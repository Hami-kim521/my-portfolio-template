import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

import { formatDate } from '../../utils/format-date';

/**
 * GuestbookList 컴포넌트 - 방명록 목록 (최신순, 더 보기)
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
        아직 남겨진 방명록이 없어요. 첫 번째 주인공이 되어주세요!
      </Box>
    );
  }

  return (
    <Box>
      <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {entries.map((entry) => (
          <Box
            key={entry.id}
            component="li"
            sx={{
              display: 'flex',
              gap: 2,
              p: 2,
              textAlign: 'left',
              bgcolor: 'var(--color-bg-primary)',
              border: '1px solid var(--color-border)',
              borderLeft: '3px solid var(--color-accent-yellow)',
              borderRadius: 1.5,
            }}
          >
            <Box
              aria-hidden="true"
              sx={{
                flexShrink: 0,
                width: 44,
                height: 44,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.4rem',
                borderRadius: '50%',
                bgcolor: 'var(--color-warm-bg)',
              }}
            >
              {entry.emoji}
            </Box>
            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', columnGap: 1 }}>
                <Box component="strong" sx={{ color: 'var(--color-text-secondary)' }}>
                  {entry.masked_name}
                </Box>
                {entry.organization && (
                  <Box component="span" sx={{ fontSize: '0.875rem', color: 'var(--color-primary-dark)' }}>
                    {entry.organization}
                  </Box>
                )}
                <Box component="time" dateTime={entry.created_at} sx={{ ml: 'auto', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                  {formatDate(entry.created_at)}
                </Box>
              </Box>
              <Box component="p" sx={{ m: 0, mt: 0.75, lineHeight: 1.6, whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>
                {entry.message}
              </Box>
              {entry.photo_url && (
                <Box
                  component="img"
                  src={entry.photo_url}
                  alt={`${entry.masked_name}님이 남긴 사진`}
                  loading="lazy"
                  sx={{ mt: 1.5, display: 'block', maxWidth: '100%', maxHeight: 280, borderRadius: 1 }}
                />
              )}
            </Box>
          </Box>
        ))}
      </Box>

      {hasMore && (
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
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
