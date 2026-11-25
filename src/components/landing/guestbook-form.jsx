import { useEffect, useState } from 'react';

import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const EMOJIS = ['😊', '🧡', '👍', '🎉', '🔥', '✨', '🙌', '☕'];
const MAX_PHOTO_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_MESSAGE = 500;
const EMAIL_PATTERN = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const INITIAL_VALUES = { name: '', organization: '', email: '', message: '' };

/**
 * GuestbookForm 컴포넌트 - 방명록 작성 폼 (이모지 선택 / 사진 업로드 포함)
 *
 * Props:
 * @param {function} onSubmit - 등록 시 호출, 입력값 객체를 받아 Promise 반환 [Required]
 *
 * Example usage:
 * <GuestbookForm onSubmit={addEntry} />
 */
export default function GuestbookForm({ onSubmit }) {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [emoji, setEmoji] = useState(EMOJIS[0]);
  const [photoFile, setPhotoFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  /** 사진을 교체하고 미리보기 URL 을 새로 만든다. (이전 URL 은 아래 effect 가 해제) */
  const changePhoto = (file) => {
    setPhotoFile(file);
    setPreviewUrl(file ? URL.createObjectURL(file) : '');
  };

  useEffect(() => () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  const handleChange = (field) => (event) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    event.target.value = '';
    if (!file) return;
    if (!ALLOWED_TYPES.includes(file.type)) {
      setFeedback({ severity: 'warning', text: 'JPG, PNG, WEBP, GIF 이미지만 올릴 수 있어요.' });
      return;
    }
    if (file.size > MAX_PHOTO_SIZE) {
      setFeedback({ severity: 'warning', text: '사진은 5MB 이하만 올릴 수 있어요.' });
      return;
    }
    setFeedback(null);
    changePhoto(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!EMAIL_PATTERN.test(values.email.trim())) {
      setFeedback({ severity: 'warning', text: '이메일 형식을 확인해주세요.' });
      return;
    }
    setIsSubmitting(true);
    setFeedback(null);
    try {
      await onSubmit({ ...values, emoji, photoFile });
      setValues(INITIAL_VALUES);
      setEmoji(EMOJIS[0]);
      changePhoto(null);
      setFeedback({ severity: 'success', text: '방명록이 등록되었어요. 감사합니다!' });
    } catch {
      setFeedback({ severity: 'error', text: '등록에 실패했어요. 잠시 후 다시 시도해주세요.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldSx = {
    '& .MuiOutlinedInput-root': {
      bgcolor: 'var(--color-bg-primary)',
      '&.Mui-focused fieldset': { borderColor: 'var(--color-primary)' },
    },
    '& .MuiInputLabel-root.Mui-focused': { color: 'var(--color-primary)' },
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ textAlign: 'left' }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            label="이름"
            value={values.name}
            onChange={handleChange('name')}
            required
            fullWidth
            size="small"
            slotProps={{ htmlInput: { maxLength: 20 } }}
            sx={fieldSx}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            label="소속 / 직업 (선택)"
            value={values.organization}
            onChange={handleChange('organization')}
            fullWidth
            size="small"
            slotProps={{ htmlInput: { maxLength: 40 } }}
            sx={fieldSx}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            label="이메일"
            type="email"
            placeholder="비공개"
            value={values.email}
            onChange={handleChange('email')}
            required
            fullWidth
            size="small"
            slotProps={{ htmlInput: { maxLength: 100 } }}
            sx={fieldSx}
          />
        </Grid>

        <Grid size={12}>
          <Box component="span" sx={{ display: 'block', mb: 1, fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
            오늘의 기분
          </Box>
          <ToggleButtonGroup
            exclusive
            value={emoji}
            onChange={(_, next) => next && setEmoji(next)}
            aria-label="이모지 선택"
            size="small"
            sx={{ flexWrap: 'wrap', gap: 0.5 }}
          >
            {EMOJIS.map((item) => (
              <ToggleButton
                key={item}
                value={item}
                aria-label={item}
                sx={{
                  border: '1px solid var(--color-border) !important',
                  borderRadius: '8px !important',
                  fontSize: '1.2rem',
                  px: 1.25,
                  '&.Mui-selected': {
                    bgcolor: 'var(--color-warm-bg)',
                    borderColor: 'var(--color-primary) !important',
                  },
                }}
              >
                {item}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Grid>

        <Grid size={12}>
          <TextField
            label="남기고 싶은 말"
            value={values.message}
            onChange={handleChange('message')}
            required
            fullWidth
            multiline
            minRows={3}
            slotProps={{ htmlInput: { maxLength: MAX_MESSAGE } }}
            helperText={`${values.message.length} / ${MAX_MESSAGE}`}
            sx={{ ...fieldSx, '& .MuiFormHelperText-root': { textAlign: 'right' } }}
          />
        </Grid>

        <Grid size={12}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Button
              component="label"
              variant="outlined"
              startIcon={<AddPhotoAlternateOutlinedIcon />}
              sx={{
                color: 'var(--color-primary-dark)',
                borderColor: 'var(--color-primary)',
                '&:hover': { borderColor: 'var(--color-primary-dark)', bgcolor: 'var(--color-warm-bg)' },
              }}
            >
              사진 추가
              <input type="file" hidden accept={ALLOWED_TYPES.join(',')} onChange={handlePhotoChange} />
            </Button>
            {previewUrl ? (
              <Box sx={{ position: 'relative' }}>
                <Box
                  component="img"
                  src={previewUrl}
                  alt="업로드할 사진 미리보기"
                  sx={{ display: 'block', height: 64, width: 64, objectFit: 'cover', borderRadius: 1 }}
                />
                <IconButton
                  aria-label="사진 삭제"
                  size="small"
                  onClick={() => changePhoto(null)}
                  sx={{
                    position: 'absolute',
                    top: -8,
                    right: -8,
                    bgcolor: 'var(--color-secondary)',
                    color: 'var(--color-bg-primary)',
                    p: 0.25,
                    '&:hover': { bgcolor: 'var(--color-primary)' },
                  }}
                >
                  <CloseIcon sx={{ fontSize: 14 }} />
                </IconButton>
              </Box>
            ) : (
              <Box component="span" sx={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                JPG · PNG · WEBP · GIF, 5MB 이하
              </Box>
            )}
          </Box>
        </Grid>

        {feedback && (
          <Grid size={12}>
            <Alert severity={feedback.severity} onClose={() => setFeedback(null)}>
              {feedback.text}
            </Alert>
          </Grid>
        )}

        <Grid size={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting || !values.name.trim() || !values.email.trim() || !values.message.trim()}
            sx={{
              px: 4,
              bgcolor: 'var(--color-primary)',
              color: '#FFFFFF',
              boxShadow: 'none',
              '&:hover': { bgcolor: 'var(--color-primary-dark)', boxShadow: 'none' },
            }}
          >
            {isSubmitting ? '등록 중...' : '남기기'}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
