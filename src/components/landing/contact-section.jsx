import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';

import useGuestbook from '../../hooks/use-guestbook';
import ContactInfo from './contact-info';
import GuestbookForm from './guestbook-form';
import GuestbookList from './guestbook-list';

const headingSx = {
  m: 0,
  mb: 2,
  fontSize: { xs: '1.15rem', md: '1.3rem' },
  lineHeight: 1.3,
  color: 'var(--color-text-secondary)',
};

/**
 * ContactSection 컴포넌트 - Home 페이지의 Contact 섹션 (연락처 위, 방명록 아래)
 *
 * Example usage:
 * <ContactSection />
 */
export default function ContactSection() {
  const { entries, isLoading, hasMore, errorMessage, loadMore, addEntry } = useGuestbook();

  return (
    <Card
      component="section"
      id="contact"
      variant="outlined"
      sx={{
        width: '100%',
        bgcolor: 'var(--color-bg-secondary)',
        borderColor: 'var(--color-border)',
        borderTop: '2px solid var(--color-primary)',
        borderRadius: 2,
      }}
    >
      <CardContent sx={{ py: { xs: 4, md: 6 }, px: { xs: 2, md: 4 } }}>
        <Box sx={{ textAlign: 'center', mb: { xs: 3, md: 4 } }}>
          <Box component="h2" sx={{ ...headingSx, mb: 1, fontSize: { xs: '1.5rem', md: '2rem' } }}>
            Contact
          </Box>
          <Box component="p" sx={{ m: 0, color: 'var(--color-text-muted)' }}>
            좋은 이야기를 나눌 준비가 되어 있어요. 편하게 말을 걸어주세요.
          </Box>
        </Box>

        <ContactInfo />

        <Divider sx={{ my: { xs: 4, md: 5 }, borderColor: 'var(--color-border)' }} />

        <Box component="h3" sx={headingSx}>방명록</Box>
        <Box sx={{ mb: { xs: 4, md: 5 } }}>
          <GuestbookForm onSubmit={addEntry} />
        </Box>

        {errorMessage && <Alert severity="error" sx={{ mb: 2 }}>{errorMessage}</Alert>}
        <GuestbookList
          entries={entries}
          isLoading={isLoading}
          hasMore={hasMore}
          onLoadMore={loadMore}
        />
      </CardContent>
    </Card>
  );
}
