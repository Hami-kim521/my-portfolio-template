/**
 * ISO 날짜 문자열을 'YYYY.MM.DD' 형태로 변환한다.
 * @param {string} isoString - ISO 8601 날짜 문자열
 * @returns {string} 변환된 날짜 문자열
 */
export function formatDate(isoString) {
  const date = new Date(isoString);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}.${mm}.${dd}`;
}
