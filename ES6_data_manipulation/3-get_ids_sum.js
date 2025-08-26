export default function getStudentIdsSum(array) {
  return array.reduce((acc, i) => acc + i.id, 0);
}
