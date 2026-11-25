/** 메모지 색상 (index.css 의 CSS 변수, 라이트/다크 모드 자동 대응) */
const NOTE_COLORS = [
  'var(--color-note-1)',
  'var(--color-note-2)',
  'var(--color-note-3)',
  'var(--color-note-4)',
  'var(--color-note-5)',
  'var(--color-note-6)',
  'var(--color-note-7)',
  'var(--color-note-8)',
];

/** 패턴 선 색 (라이트/다크 어디서나 보이는 중간 회색 + 투명도) */
const INK = (alpha) => `rgba(128, 128, 128, ${alpha})`;

/** 메모지 패턴 (단색 포함) */
const NOTE_PATTERNS = [
  { image: 'none', size: 'auto' },
  { image: `radial-gradient(${INK(0.28)} 1.5px, transparent 1.6px)`, size: '14px 14px' },
  { image: `repeating-linear-gradient(45deg, ${INK(0.14)} 0 6px, transparent 6px 12px)`, size: 'auto' },
  {
    image: `linear-gradient(${INK(0.2)} 1px, transparent 1px), linear-gradient(90deg, ${INK(0.2)} 1px, transparent 1px)`,
    size: '16px 16px',
  },
  { image: `repeating-linear-gradient(transparent 0 23px, ${INK(0.28)} 23px 24px)`, size: 'auto' },
  {
    image: `conic-gradient(${INK(0.14)} 25%, transparent 0 50%, ${INK(0.14)} 0 75%, transparent 0)`,
    size: '20px 20px',
  },
  { image: `repeating-linear-gradient(90deg, ${INK(0.12)} 0 10px, transparent 10px 20px)`, size: 'auto' },
];

const TAPE_COLORS = ['var(--color-accent-yellow)', 'var(--color-primary-light)', 'var(--color-note-6)'];

/**
 * id 와 salt 로 0 이상 1 미만의 값을 만든다. (같은 입력 → 항상 같은 값)
 * @param {number} id - 방명록 id
 * @param {number} salt - 항목별로 다른 값을 얻기 위한 값
 * @returns {number} 0 이상 1 미만의 숫자
 */
function seededRandom(id, salt) {
  let x = (Math.imul(id + 1, 2654435761) + Math.imul(salt + 1, 40503)) >>> 0;
  x = Math.imul(x ^ (x >>> 15), 2246822519) >>> 0;
  x = Math.imul(x ^ (x >>> 13), 3266489917) >>> 0;
  return ((x ^ (x >>> 16)) >>> 0) / 4294967296;
}

/**
 * 방명록 id 로 메모지 모양(색 / 패턴 / 각도 / 위치 / 테이프)을 정한다.
 * 무작위처럼 보이지만 새로고침해도 바뀌지 않는다.
 * @param {number} id - 방명록 id
 * @returns {{ color: string, pattern: { image: string, size: string }, tilt: number,
 *   offsetX: number, offsetY: number, gap: number, tapeColor: string, tapeTilt: number,
 *   tapeLeft: number }} 스타일 값
 */
export function getNoteStyle(id) {
  const pick = (list, salt) => list[Math.floor(seededRandom(id, salt) * list.length)];
  const range = (min, max, salt) => min + seededRandom(id, salt) * (max - min);

  return {
    color: pick(NOTE_COLORS, 1),
    pattern: pick(NOTE_PATTERNS, 2),
    tilt: range(-3.5, 3.5, 3),
    offsetX: range(-10, 10, 4),
    offsetY: range(-6, 8, 5),
    gap: range(16, 38, 6),
    tapeColor: pick(TAPE_COLORS, 7),
    tapeTilt: range(-8, 8, 8),
    tapeLeft: range(30, 70, 9),
  };
}
