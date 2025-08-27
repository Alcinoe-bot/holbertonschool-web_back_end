export default function cleanSet(set, startString) {
    return [...set].filter((n) => n.startsWith(startString))
    .map((n) => n.slice(startString.length)).join('-');
}
