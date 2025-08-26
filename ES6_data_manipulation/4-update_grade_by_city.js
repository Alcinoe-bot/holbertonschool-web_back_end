export default function updateStudentGradeByCity(array, city, newGrades) {
  const student = array.filter((student) => student.location === city);
  const students = student.map((s) => {
    let grade = 'N/A';
    for (const object of newGrades) {
      if (s.id === object.studentId) {
        grade = object.grade;
        break;
      }
    }
    return { ...s, grade };
  });
  return students;
}
