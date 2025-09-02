const fs = require('fs');

function countStudents(path) {
  try {
    const data = fs.readFileSync(path, 'utf8');
    const lines = data.split('\n').filter((line) => line.trim() !== '');
    const header = lines.shift().split(',');

    const fieldIndex = header.indexOf('field');
    const firstnameIndex = header.indexOf('firstname');

    const studentsByField = {};
    let total = 0;

    for (const line of lines) {
      const record = line.split(',');
      if (record.length >= header.length) {
        total += 1;
        const field = record[fieldIndex];
        const firstname = record[firstnameIndex];
        if (!studentsByField[field]) {
          studentsByField[field] = [];
        }
        studentsByField[field].push(firstname);
      }
    }

    console.log(`Number of students: ${total}`);
    for (const [field, list] of Object.entries(studentsByField)) {
      console.log(
        `Number of students in ${field}: ${list.length}. List: ${list.join(', ')}`
      );
    }
  } catch (err) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
