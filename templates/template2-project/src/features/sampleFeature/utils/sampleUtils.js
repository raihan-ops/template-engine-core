// Example feature-specific utility
export function getExcerpt(text, length = 100) {
  if (!text) return '';
  return text.length > length ? text.slice(0, length) + '...' : text;
} 