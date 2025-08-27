export default function cleanSet(set, startString) {
  if (startString === '' || typeof startString !== 'string') {
    return '';
  }
  return [...set].filter((n) => n.startsWith(startString))
    .map((n) => n.slice(startString.length)).join('-');
}
