import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

/** TODO: 실제 연락처 / SNS 주소로 교체하세요. */
const CONTACTS = [
  { id: 'email', Icon: EmailOutlinedIcon, text: 'hello@example.com', href: 'mailto:hello@example.com' },
  { id: 'phone', Icon: PhoneOutlinedIcon, text: '010-0000-0000', href: 'tel:01000000000' },
  { id: 'location', Icon: LocationOnOutlinedIcon, text: 'Seoul, Korea', href: null },
];

const SOCIALS = [
  { id: 'github', label: 'GitHub', Icon: GitHubIcon, href: 'https://github.com/Hami-kim521' },
  { id: 'instagram', label: 'Instagram', Icon: InstagramIcon, href: 'https://www.instagram.com/' },
  { id: 'linkedin', label: 'LinkedIn', Icon: LinkedInIcon, href: 'https://www.linkedin.com/' },
];

/**
 * ContactInfo 컴포넌트 - 아이콘 + 텍스트 연락처, 한 줄 SNS 아이콘
 *
 * Example usage:
 * <ContactInfo />
 */
export default function ContactInfo() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
      <Box
        component="ul"
        sx={{
          listStyle: 'none',
          m: 0,
          p: 0,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'flex-start', sm: 'center' },
          gap: { xs: 1.5, sm: 4 },
        }}
      >
        {CONTACTS.map(({ id, Icon, text, href }) => (
          <Box
            key={id}
            component="li"
            sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'var(--color-text-primary)' }}
          >
            <Icon sx={{ color: 'var(--color-primary)', fontSize: 22 }} />
            {href ? (
              <Box
                component="a"
                href={href}
                sx={{
                  color: 'inherit',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  '&:hover': { color: 'var(--color-primary)' },
                }}
              >
                {text}
              </Box>
            ) : (
              <Box component="span" sx={{ fontSize: '1rem' }}>{text}</Box>
            )}
          </Box>
        ))}
      </Box>

      <Box sx={{ display: 'flex', gap: 1 }}>
        {SOCIALS.map(({ id, label, Icon, href }) => (
          <IconButton
            key={id}
            component="a"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            size="small"
            sx={{
              color: 'var(--color-text-muted)',
              '&:hover': { color: 'var(--color-primary)', bgcolor: 'var(--color-warm-bg)' },
            }}
          >
            <Icon fontSize="small" />
          </IconButton>
        ))}
      </Box>
    </Box>
  );
}
