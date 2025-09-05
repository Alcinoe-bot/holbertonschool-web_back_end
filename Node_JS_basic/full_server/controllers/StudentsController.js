// eslint-disable-next-line
import readDatabase from "../utils.js";

export default class StudentsController {
  static async getAllStudents(req, res) {
    try {
      const students = await readDatabase('database.csv');
      const sortedFields = Object.keys(students).sort((a, b) => a.toLowerCase()
        .localeCompare(b.toLowerCase()));

      let response = 'This is the list of our students';
      for (const field of sortedFields) {
        const list = students[field].join(', ');
        response += `\nNumber of students in ${field}: ${students[field].length}. List: ${list}`;
      }
      return res.status(200).send(response);
    } catch (err) {
      return res.status(500).send('Cannot load the database');
    }
  }

  static async getAllStudentsByMajor(req, res) {
    const { major } = req.params;

    if (!major || (major !== 'CS' && major !== 'SWE')) {
      return res.status(500).send('Major parameter must be CS or SWE');
    }
    try {
      const students = await readDatabase('database.csv');

      if (!students[major]) {
        return res.status(200).send('List: ');
      }

      const list = students[major].join(', ');
      return res.status(200).send(`List: ${list}`);
    } catch (err) {
      return res.status(500).send('Cannot load the database');
    }
  }
}
