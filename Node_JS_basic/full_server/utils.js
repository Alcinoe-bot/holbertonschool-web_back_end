import fs from 'fs';

export default async function readDatabase(filePath) {
  try {
    const data = await fs.promises.readFile(filePath, 'utf8');
    const lines = data.trim().split('\n');
    const students = {};

    for (let i = 1; i < lines.length; i += 1) {
      const value = lines[i].split(',');
      const firstname = value[0].trim();
      const field = value[3].trim();
      if (firstname && field) {
        if (!students[field]) {
          students[field] = [];
        }
        students[field].push(firstname);
      }
    }
    return students;
  } catch (err) {
    throw new Error('Cannot load the database');
  }
}
