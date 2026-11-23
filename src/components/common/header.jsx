import { Link as RouterLink, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

const TABS = [
  { label: 'Home', to: '/' },
  { label: 'About Me', to: '/about' },
  { label: 'Projects', to: '/projects' },
];

/**
 * Header 컴포넌트 - 로고와 Home / About Me / Projects 탭 네비게이션
 *
 * Example usage:
 * <Header />
 */
export default function Header() {
  const { pathname } = useLocation();
  const current = TABS.some((tab) => tab.to === pathname) ? pathname : false;

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: 'var(--color-bg-primary)',
        color: 'var(--color-text-primary)',
        borderBottom: '1px solid var(--color-border)',
        borderTop: '2px solid var(--color-primary)',
      }}
    >
      <Container maxWidth="md" sx={{ px: { xs: 2, md: 3 } }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              py: 1.5,
              fontSize: 20,
              fontWeight: 700,
              color: 'var(--color-text-secondary)',
            }}
          >
            My<Box component="span" sx={{ color: 'var(--color-primary)' }}>Portfolio</Box>
          </Box>

          <Tabs
            value={current}
            aria-label="메인 메뉴"
            slotProps={{ indicator: { sx: { bgcolor: 'var(--color-primary)', height: 3 } } }}
          >
            {TABS.map(({ label, to }) => (
              <Tab
                key={to}
                label={label}
                value={to}
                component={RouterLink}
                to={to}
                sx={{
                  color: 'var(--color-text-primary)',
                  fontWeight: 600,
                  '&:hover': { color: 'var(--color-link-hover)' },
                  '&.Mui-selected': { color: 'var(--color-text-secondary)' },
                }}
              />
            ))}
          </Tabs>
        </Box>
      </Container>
    </AppBar>
  );
}
