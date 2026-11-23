import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import Header from './header';

/**
 * PageLayout 컴포넌트 - 헤더 + 중앙정렬된 페이지 본문
 *
 * Example usage:
 * <Route element={<PageLayout />}>...</Route>
 */
export default function PageLayout() {
  return (
    <Box sx={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Box
        component="main"
        sx={{
          flex: 1,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          py: { xs: 2, md: 4 },
        }}
      >
        <Container maxWidth="md" sx={{ py: 4, px: { xs: 2, md: 3 } }}>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}
